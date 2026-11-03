import { describe, expect, it } from 'vitest'
import { detalheDoItem, listaDeCompras, resumo, situacaoDoEstoque } from '../../src/application/consultas/consultas'
import { normalizarEstado } from '../../src/infrastructure/normalizarEstado'
import type { EstadoEstoque } from '../../src/domain/entidades/tipos'

const HOJE = new Date(2026, 10, 2, 12)

const estado: EstadoEstoque = {
  configuracao: { nome: 'Casa', adultos: 2, criancas: 0, dias: 30, itensSelecionados: ['arroz', 'feijao', 'agua'], criadoEm: '' },
  lotes: [
    { id: 'a', itemId: 'arroz', quantidade: 10, compradoEm: '2026-10-01', validade: '2026-12' },
    { id: 'b', itemId: 'feijao', quantidade: 2, compradoEm: '2026-10-01', validade: '2027-10' },
    { id: 'c', itemId: 'removido-do-catalogo', quantidade: 1, compradoEm: '2026-10-01', validade: '2026-11' },
  ],
  locais: [],
}

describe('consultas', () => {
  it('resume progresso, faltas, água e o que consumir primeiro', () => {
    const dados = resumo(estado, HOJE)
    expect(dados?.itensFaltando).toBe(2)
    expect(dados?.litrosAguaDia).toBe(8)
    expect(dados?.progresso).toBe(44)
    expect(dados?.consumirPrimeiro.map((linha) => linha.lote.id)).toEqual(['a'])
  })

  it('retorna nulo sem estoque criado', () => {
    expect(resumo({ configuracao: null, lotes: [], locais: [] }, HOJE)).toBeNull()
  })

  it('agrupa a situação por categoria na ordem do catálogo', () => {
    const grupos = situacaoDoEstoque(estado.configuracao!, estado.lotes, HOJE)
    expect(grupos.map((grupo) => grupo.categoria.id)).toEqual(['agua', 'graos'])
    expect(grupos[1].linhas.find((linha) => linha.item.id === 'arroz')?.venceLogo).toBe(true)
  })

  it('lista de compras só traz o que falta', () => {
    const itens = listaDeCompras(estado.configuracao!, estado.lotes, HOJE).flatMap((grupo) => grupo.linhas.map((linha) => [linha.item.id, linha.falta]))
    expect(itens).toEqual([['agua', 240], ['feijao', 4]])
  })

  it('detalha um item e trata item desconhecido', () => {
    const detalhe = detalheDoItem(estado, 'feijao', HOJE)
    expect(detalhe).toMatchObject({ meta: 6, atual: 2, falta: 4, noPlano: true })
    expect(detalheDoItem(estado, 'charque', HOJE)?.noPlano).toBe(false)
    expect(detalheDoItem(estado, 'nada', HOJE)).toBeNull()
  })
})

describe('normalizar estado salvo', () => {
  it('recupera de dados ausentes ou corrompidos', () => {
    expect(normalizarEstado(null)).toEqual({ configuracao: null, lotes: [], locais: [] })
    expect(normalizarEstado('{quebrado')).toEqual({ configuracao: null, lotes: [], locais: [] })
    expect(normalizarEstado('{"lotes":"x"}')).toEqual({ configuracao: null, lotes: [], locais: [] })
  })
})
