import type { VideoNarrado } from '../../domain/conteudo/videosNarrados'
import type { ArmazemDeVideos } from '../portas/ArmazemDeVideos'

export class ServicoVideosNarrados {
  private lista: Promise<VideoNarrado[]> | null = null

  constructor(private readonly armazem: ArmazemDeVideos) {}

  todos(): Promise<VideoNarrado[]> {
    this.lista ??= this.armazem.listar().catch(() => [])
    return this.lista
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
