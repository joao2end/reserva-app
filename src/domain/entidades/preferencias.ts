export const TAMANHOS_TEXTO = ['normal', 'grande', 'muito-grande'] as const

export type TamanhoTexto = (typeof TAMANHOS_TEXTO)[number]

export interface ContatoFamilia {
  nome: string
  telefone: string
}

export interface Preferencias {
  tamanhoTexto: TamanhoTexto
  mochila: string[]
  contatoFamilia: ContatoFamilia | null
}

export const PREFERENCIAS_PADRAO: Preferencias = { tamanhoTexto: 'normal', mochila: [], contatoFamilia: null }

export const ESCALA_TEXTO: Record<TamanhoTexto, number> = {
  normal: 1,
  grande: 1.15,
  'muito-grande': 1.3,
}

export function ehTamanhoTexto(valor: unknown): valor is TamanhoTexto {
  return typeof valor === 'string' && (TAMANHOS_TEXTO as readonly string[]).includes(valor)
}
