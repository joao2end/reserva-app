import type { Categoria, ConfiguracaoEstoque, EstadoEstoque, ItemCatalogo, Lote } from '../../domain/entidades/tipos'
import { CATALOGO, CATEGORIAS, encontrarItem } from '../../domain/conteudo/catalogo'
import {
  faltaComprar,
  litrosDeAguaPorDia,
  metaDoItem,
  progressoGeral,
  totalEmEstoque,
  venceEmBreve,
} from '../../domain/regras/calculo'
import { diasAteVencer } from '../../domain/regras/datas'

export interface LoteComPrazo {
  lote: Lote
  item: ItemCatalogo
  dias: number
}

export interface Resumo {
  configuracao: ConfiguracaoEstoque
  progresso: number
  itensFaltando: number
  litrosAguaDia: number
  consumirPrimeiro: LoteComPrazo[]
}

export interface LinhaSituacao {
  item: ItemCatalogo
  meta: number
  atual: number
  falta: number
  venceLogo: boolean
}

export interface GrupoSituacao {
  categoria: Categoria
  linhas: LinhaSituacao[]
}

export interface DetalheItem {
  item: ItemCatalogo
  noPlano: boolean
  meta: number
  atual: number
  falta: number
  lotes: LoteComPrazo[]
}

export function itensDoPlano(configuracao: ConfiguracaoEstoque): ItemCatalogo[] {
  return CATALOGO.filter((item) => configuracao.itensSelecionados.includes(item.id))
}

function comPrazo(lote: Lote, hoje: Date): LoteComPrazo | null {
  const item = encontrarItem(lote.itemId)
  return item ? { lote, item, dias: diasAteVencer(lote.validade, hoje) } : null
}

function porValidade(a: LoteComPrazo, b: LoteComPrazo): number {
  return a.lote.validade.localeCompare(b.lote.validade)
}

export function situacaoDoEstoque(configuracao: ConfiguracaoEstoque, lotes: Lote[], hoje: Date): GrupoSituacao[] {
  const itens = itensDoPlano(configuracao)
  return CATEGORIAS.map((categoria) => ({
    categoria,
    linhas: itens
      .filter((item) => item.categoria === categoria.id)
      .map((item) => ({
        item,
        meta: metaDoItem(item, configuracao),
        atual: totalEmEstoque(item.id, lotes),
        falta: faltaComprar(item, configuracao, lotes),
        venceLogo: lotes.some((lote) => lote.itemId === item.id && venceEmBreve(lote, hoje)),
      })),
  })).filter((grupo) => grupo.linhas.length > 0)
}

export function listaDeCompras(configuracao: ConfiguracaoEstoque, lotes: Lote[], hoje: Date): GrupoSituacao[] {
  return situacaoDoEstoque(configuracao, lotes, hoje)
    .map((grupo) => ({ ...grupo, linhas: grupo.linhas.filter((linha) => linha.falta > 0) }))
    .filter((grupo) => grupo.linhas.length > 0)
}

export function resumo(estado: EstadoEstoque, hoje: Date): Resumo | null {
  const { configuracao, lotes } = estado
  if (!configuracao) return null
  const itens = itensDoPlano(configuracao)
  return {
    configuracao,
    progresso: progressoGeral(itens, configuracao, lotes),
    itensFaltando: itens.filter((item) => faltaComprar(item, configuracao, lotes) > 0).length,
    litrosAguaDia: litrosDeAguaPorDia(configuracao),
    consumirPrimeiro: lotes
      .filter((lote) => venceEmBreve(lote, hoje))
      .map((lote) => comPrazo(lote, hoje))
      .filter((linha): linha is LoteComPrazo => linha !== null)
      .sort(porValidade),
  }
}

export function detalheDoItem(estado: EstadoEstoque, itemId: string, hoje: Date): DetalheItem | null {
  const item = encontrarItem(itemId)
  const { configuracao, lotes } = estado
  if (!item || !configuracao) return null
  return {
    item,
    noPlano: configuracao.itensSelecionados.includes(item.id),
    meta: metaDoItem(item, configuracao),
    atual: totalEmEstoque(item.id, lotes),
    falta: faltaComprar(item, configuracao, lotes),
    lotes: lotes
      .filter((lote) => lote.itemId === item.id)
      .map((lote) => comPrazo(lote, hoje))
      .filter((linha): linha is LoteComPrazo => linha !== null)
      .sort(porValidade),
  }
}
