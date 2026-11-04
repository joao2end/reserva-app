import type { VideoNarrado } from '../../domain/conteudo/videosNarrados'

export interface ArmazemDeVideos {
  listar(): Promise<VideoNarrado[]>
  enderecoLocal(video: VideoNarrado): Promise<string | undefined>
  baixar(video: VideoNarrado, aoProgredir: (fracao: number) => void): Promise<string>
  salvarNoCelular(video: VideoNarrado, titulo: string): Promise<void>
  apagar(video: VideoNarrado): Promise<void>
}
