import type { ConfiguracaoEstoque, ItemCatalogo, Lote, Unidade } from '../entidades/tipos'
import { diasAteVencer, somarMeses } from './datas'

export const PESO_CRIANCA = 0.6
export const LITROS_AGUA_POR_PESSOA_DIA = 4
export const DIAS_ALERTA_VALIDADE = 60
const DIAS_NO_MES = 30

export function arredondar(valor: number): number {
  return Math.round(valor * 100) / 100
}

export function pessoasEquivalentes(configuracao: Pick<ConfiguracaoEstoque, 'adultos' | 'criancas'>): number {
  return configuracao.adultos + configuracao.criancas * PESO_CRIANCA
}

export function litrosDeAguaPorDia(configuracao: Pick<ConfiguracaoEstoque, 'adultos' | 'criancas'>): number {
  return Math.ceil(pessoasEquivalentes(configuracao) * LITROS_AGUA_POR_PESSOA_DIA)
}

export function arredondarParaCompra(valor: number, unidade: Unidade): number {
  if (unidade === 'kg') return Math.ceil(arredondar(valor) * 2) / 2
  return Math.ceil(arredondar(valor))
}

export function metaDoItem(item: ItemCatalogo, configuracao: ConfiguracaoEstoque): number {
  const bruto = (item.porAdultoMes / DIAS_NO_MES) * configuracao.dias * pessoasEquivalentes(configuracao)
  return arredondarParaCompra(bruto, item.unidade)
}

export function totalEmEstoque(itemId: string, lotes: Lote[]): number {
  return arredondar(lotes.filter((lote) => lote.itemId === itemId).reduce((total, lote) => total + lote.quantidade, 0))
}

export function faltaComprar(item: ItemCatalogo, configuracao: ConfiguracaoEstoque, lotes: Lote[]): number {
  const falta = metaDoItem(item, configuracao) - totalEmEstoque(item.id, lotes)
  return falta > 0 ? arredondarParaCompra(falta, item.unidade) : 0
}

export function venceEmBreve(lote: Lote, hoje: Date): boolean {
  return diasAteVencer(lote.validade, hoje) <= DIAS_ALERTA_VALIDADE
}

export function validadeSugerida(item: ItemCatalogo, compradoEm: string): string {
  return somarMeses(compradoEm, item.validadeMeses)
}

export function progressoGeral(itens: ItemCatalogo[], configuracao: ConfiguracaoEstoque, lotes: Lote[]): number {
  if (itens.length === 0) return 0
  const soma = itens.reduce((acumulado, item) => {
    const meta = metaDoItem(item, configuracao)
    if (meta === 0) return acumulado + 1
    return acumulado + Math.min(totalEmEstoque(item.id, lotes) / meta, 1)
  }, 0)
  return Math.round((soma / itens.length) * 100)
}
