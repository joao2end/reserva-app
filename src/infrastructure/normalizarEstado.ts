import { ESTADO_VAZIO, type EstadoEstoque } from '../domain/entidades/tipos'

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null
}

export function normalizarEstado(bruto: string | null): EstadoEstoque {
  if (!bruto) return structuredClone(ESTADO_VAZIO)
  try {
    const dados: unknown = JSON.parse(bruto)
    if (!ehObjeto(dados)) return structuredClone(ESTADO_VAZIO)
    return {
      configuracao: ehObjeto(dados.configuracao) ? (dados.configuracao as unknown as EstadoEstoque['configuracao']) : null,
      lotes: Array.isArray(dados.lotes) ? (dados.lotes as EstadoEstoque['lotes']) : [],
      locais: Array.isArray(dados.locais) ? (dados.locais as EstadoEstoque['locais']) : [],
    }
  } catch {
    return structuredClone(ESTADO_VAZIO)
  }
}
