import { Capacitor, CapacitorHttp } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { FileTransfer } from '@capacitor/file-transfer'
import { Share } from '@capacitor/share'
import type { ArmazemDeVideos } from '../application/portas/ArmazemDeVideos'
import { ENDERECO_VIDEOS_NARRADOS, enderecoRemoto, lerManifesto, type VideoNarrado } from '../domain/conteudo/videosNarrados'

const PASTA = 'videos-narrados'

function caminho(video: VideoNarrado): string {
  return `${PASTA}/${video.arquivo}`
}

export class ArmazemDeVideosCapacitor implements ArmazemDeVideos {
  private readonly nativo = Capacitor.isNativePlatform()

  async listar(): Promise<VideoNarrado[]> {
    const [embutida, atual] = await Promise.all([this.listaEmbutida(), this.listaAtual()])
    return atual.length > 0 ? atual : embutida
  }

  private async listaEmbutida(): Promise<VideoNarrado[]> {
    try {
      const resposta = await fetch('videos-narrados.json', { cache: 'no-store' })
      return resposta.ok ? lerManifesto(await resposta.json()) : []
    } catch {
      return []
    }
  }

  private async listaAtual(): Promise<VideoNarrado[]> {
    if (!this.nativo) return []
    try {
      const resposta = await CapacitorHttp.get({
        url: `${ENDERECO_VIDEOS_NARRADOS}manifesto.json`,
        connectTimeout: 4000,
        readTimeout: 4000,
        responseType: 'json',
      })
      return resposta.status === 200 ? lerManifesto(typeof resposta.data === 'string' ? JSON.parse(resposta.data) : resposta.data) : []
    } catch {
      return []
    }
  }

  async enderecoLocal(video: VideoNarrado): Promise<string | undefined> {
    if (!this.nativo) return undefined
    try {
      const info = await Filesystem.stat({ path: caminho(video), directory: Directory.Data })
      return info.size === video.bytes ? Capacitor.convertFileSrc(info.uri) : undefined
    } catch {
      return undefined
    }
  }

  async baixar(video: VideoNarrado, aoProgredir: (fracao: number) => void): Promise<string> {
    if (!this.nativo) {
      aoProgredir(1)
      return enderecoRemoto(video)
    }
    await Filesystem.mkdir({ path: PASTA, directory: Directory.Data, recursive: true }).catch(() => undefined)
    const { uri } = await Filesystem.getUri({ path: caminho(video), directory: Directory.Data })
    const ouvinte = await FileTransfer.addListener('progress', (evento) => {
      if (evento.url !== enderecoRemoto(video)) return
      const total = evento.lengthComputable && evento.contentLength > 0 ? evento.contentLength : video.bytes
      aoProgredir(Math.min(1, evento.bytes / total))
    })
    try {
      await FileTransfer.downloadFile({ url: enderecoRemoto(video), path: uri, progress: true })
    } finally {
      await ouvinte.remove()
    }
    const local = await this.enderecoLocal(video)
    if (!local) {
      await this.apagar(video)
      throw new Error('O vídeo não chegou inteiro. Tente de novo.')
    }
    aoProgredir(1)
    return local
  }

  async salvarNoCelular(video: VideoNarrado, titulo: string): Promise<void> {
    if (!this.nativo) {
      window.open(enderecoRemoto(video), '_blank', 'noopener')
      return
    }
    const { uri } = await Filesystem.getUri({ path: caminho(video), directory: Directory.Data })
    await Share.share({ title: titulo, text: `${titulo} — vídeo do app SBV`, files: [uri], dialogTitle: 'Salvar ou enviar o vídeo' })
  }

  async apagar(video: VideoNarrado): Promise<void> {
    if (!this.nativo) return
    await Filesystem.deleteFile({ path: caminho(video), directory: Directory.Data }).catch(() => undefined)
  }
}
