import type { CenaVideo } from '../videos'

export interface ParteLicao {
  titulo: string
  paragrafos?: string[]
  passos?: string[]
}

export interface PerguntaLicao {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

export interface VideoReal {
  arquivo: string
  titulo: string
  legenda: string
  autor: string
  licenca: string
  origem: string
}

export interface LicaoCurso {
  id: string
  titulo: string
  objetivo: string
  minutos: number
  cenas: CenaVideo[]
  videosReais?: VideoReal[]
  partes: ParteLicao[]
  erros: string[]
  teste: PerguntaLicao[]
  fontes: string[]
}

export type AreaCurso = 'oficios' | 'emergencias'

export interface ModuloCurso {
  id: string
  area: AreaCurso
  titulo: string
  resumo: string
  aviso?: string
  licoes: LicaoCurso[]
}
