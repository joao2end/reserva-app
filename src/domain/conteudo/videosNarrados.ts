export interface VideoNarrado {
  licaoId: string
  arquivo: string
  bytes: number
  segundos: number
}

export const ENDERECO_VIDEOS_NARRADOS = 'https://github.com/joao2end/reserva-app/releases/download/videos-cursos/'

function ehVideo(valor: unknown): valor is VideoNarrado {
  if (typeof valor !== 'object' || valor === null) return false
  const { licaoId, arquivo, bytes, segundos } = valor as Record<string, unknown>
  return (
    typeof licaoId === 'string' &&
    typeof arquivo === 'string' &&
    /^[a-z0-9-]+\.mp4$/.test(arquivo) &&
    typeof bytes === 'number' &&
    bytes > 0 &&
    typeof segundos === 'number'
  )
}

export function lerManifesto(bruto: unknown): VideoNarrado[] {
  const videos = typeof bruto === 'object' && bruto !== null ? (bruto as { videos?: unknown }).videos : undefined
  if (!Array.isArray(videos)) return []
  return videos.filter(ehVideo).map(({ licaoId, arquivo, bytes, segundos }) => ({ licaoId, arquivo, bytes, segundos }))
}

export function enderecoRemoto(video: VideoNarrado): string {
  return ENDERECO_VIDEOS_NARRADOS + video.arquivo
}

export function tamanhoLegivel(bytes: number): string {
  const megas = bytes / (1024 * 1024)
  return `${megas.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MB`
}

export function duracaoLegivel(segundos: number): string {
  const total = Math.round(segundos)
  if (total < 60) return `${total} segundos`
  const minutos = Math.floor(total / 60)
  const resto = total % 60
  return resto === 0 ? `${minutos} min` : `${minutos} min ${resto} s`
}
