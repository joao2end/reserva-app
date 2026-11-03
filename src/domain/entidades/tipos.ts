export type Unidade = 'kg' | 'L' | 'un'

export type CategoriaId = 'agua' | 'graos' | 'proteinas' | 'gorduras' | 'vegetais' | 'basicos'

export interface Categoria {
  id: CategoriaId
  nome: string
}

export interface ItemCatalogo {
  id: string
  nome: string
  categoria: CategoriaId
  unidade: Unidade
  porAdultoMes: number
  validadeMeses: number
  armazenamento: string
  ondeComprar: string
}

export interface ConfiguracaoEstoque {
  nome: string
  adultos: number
  criancas: number
  dias: number
  itensSelecionados: string[]
  criadoEm: string
}

export interface Lote {
  id: string
  itemId: string
  quantidade: number
  compradoEm: string
  validade: string
}

export interface LocalCompra {
  id: string
  nome: string
  observacao: string
}

export interface EstadoEstoque {
  configuracao: ConfiguracaoEstoque | null
  lotes: Lote[]
  locais: LocalCompra[]
}

export const ESTADO_VAZIO: EstadoEstoque = { configuracao: null, lotes: [], locais: [] }
