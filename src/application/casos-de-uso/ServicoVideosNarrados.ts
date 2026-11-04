import type { VideoNarrado } from '../../domain/conteudo/videosNarrados'
import type { ArmazemDeVideos } from '../portas/ArmazemDeVideos'

export interface ProgressoEmLote {
  atual: number
  total: number
  fracao: number
}

export interface ResultadoEmLote {
  baixados: number
  falhas: number
}

export class ServicoVideosNarrados {
  private lista: Promise<VideoNarrado[]> | null = null

  constructor(private readonly armazem: ArmazemDeVideos) {}

  todos(): Promise<VideoNarrado[]> {
    this.lista ??= this.armazem.listar().catch(() => [])
    return this.lista
  }

  async dasLicoes(licaoIds: string[]): Promise<VideoNarrado[]> {
    const todos = await this.todos()
    return licaoIds.flatMap((licaoId) => todos.filter((video) => video.licaoId === licaoId))
  }

  async quaisEstaoNoCelular(videos: VideoNarrado[]): Promise<string[]> {
    const locais = await Promise.all(videos.map((video) => this.armazem.enderecoLocal(video)))
    return videos.filter((_, indice) => locais[indice]).map((video) => video.licaoId)
  }

  async baixarTodos(videos: VideoNarrado[], aoProgredir: (progresso: ProgressoEmLote) => void): Promise<ResultadoEmLote> {
    const noCelular = new Set(await this.quaisEstaoNoCelular(videos))
    const faltando = videos.filter((video) => !noCelular.has(video.licaoId))
    const totalBytes = faltando.reduce((soma, video) => soma + video.bytes, 0) || 1
    let bytesProntos = 0
    let falhas = 0
    for (const [indice, video] of faltando.entries()) {
      const informar = (fracao: number) =>
        aoProgredir({ atual: indice + 1, total: faltando.length, fracao: (bytesProntos + video.bytes * fracao) / totalBytes })
      informar(0)
      try {
        await this.armazem.baixar(video, informar)
      } catch {
        falhas += 1
      }
      informar(1)
      bytesProntos += video.bytes
    }
    return { baixados: faltando.length - falhas, falhas }
  }

  async apagarTodos(videos: VideoNarrado[]): Promise<void> {
    for (const video of videos) await this.armazem.apagar(video)
  }

  async daLicao(licaoId: string): Promise<VideoNarrado | undefined> {
    return (await this.todos()).find((video) => video.licaoId === licaoId)
  }

  enderecoLocal(video: VideoNarrado): Promise<string | undefined> {
    return this.armazem.enderecoLocal(video)
  }

  baixar(video: VideoNarrado, aoProgredir: (fracao: number) => void): Promise<string> {
    return this.armazem.baixar(video, aoProgredir)
  }

  salvarNoCelular(video: VideoNarrado, titulo: string): Promise<void> {
    return this.armazem.salvarNoCelular(video, titulo)
  }

  apagar(video: VideoNarrado): Promise<void> {
    return this.armazem.apagar(video)
  }
}
