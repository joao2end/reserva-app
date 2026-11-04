import { describe, expect, it } from 'vitest'
import { buscarItem } from '../../src/domain/conteudo/catalogo'
import {
  arredondarParaCompra,
  diasDeAguaGuardada,
  faltaComprar,
  litrosDeAguaPorDia,
  metaDoItem,
  pessoasEquivalentes,
  progressoGeral,
  totalEmEstoque,
  validadeSugerida,
  venceEmBreve,
  estaVencido,
  lotesNoPrazo,
} from '../../src/domain/regras/calculo'
import { diasAteVencer, ehDataIso, ehMesIso, somarMeses } from '../../src/domain/regras/datas'
import type { ConfiguracaoEstoque, Lote } from '../../src/domain/entidades/tipos'

const casal: ConfiguracaoEstoque = { nome: 'Casa', adultos: 2, criancas: 0, dias: 30, itensSelecionados: ['arroz', 'agua'], criadoEm: '' }
const lote = (itemId: string, quantidade: number, validade = '2027-12'): Lote => ({ id: `${itemId}-${quantidade}`, itemId, quantidade, compradoEm: '2026-11-02', validade })

describe('pessoas e água', () => {
  it('conta criança como 0,6 de adulto', () => {
    expect(pessoasEquivalentes({ adultos: 2, criancas: 1 })).toBeCloseTo(2.6)
  })

  it('calcula 4 litros por pessoa por dia, arredondando para cima', () => {
    expect(litrosDeAguaPorDia({ adultos: 2, criancas: 0 })).toBe(8)
    expect(litrosDeAguaPorDia({ adultos: 1, criancas: 1 })).toBe(7)
  })

  it('diz para quantos dias inteiros a água guardada dá', () => {
    expect(diasDeAguaGuardada({ adultos: 2, criancas: 0 }, [lote('agua', 100), lote('agua', 20), lote('arroz', 50)])).toBe(15)
    expect(diasDeAguaGuardada({ adultos: 2, criancas: 0 }, [lote('agua', 7)])).toBe(0)
    expect(diasDeAguaGuardada({ adultos: 2, criancas: 0 }, [])).toBe(0)
    expect(diasDeAguaGuardada({ adultos: 0, criancas: 0 }, [lote('agua', 20)])).toBe(0)
  })
})

describe('meta do item', () => {
  it('escala pela quantidade de pessoas e dias', () => {
    expect(metaDoItem(buscarItem('arroz'), casal)).toBe(10)
    expect(metaDoItem(buscarItem('agua'), casal)).toBe(240)
    expect(metaDoItem(buscarItem('arroz'), { ...casal, dias: 14 })).toBe(5)
  })

  it('arredonda kg em meio quilo e unidades para cima', () => {
    expect(arredondarParaCompra(1.1, 'kg')).toBe(1.5)
    expect(arredondarParaCompra(2.0000001, 'kg')).toBe(2)
    expect(arredondarParaCompra(3.2, 'un')).toBe(4)
  })
})

describe('estoque e falta', () => {
  it('soma lotes do mesmo item', () => {
    expect(totalEmEstoque('arroz', [lote('arroz', 2.5), lote('arroz', 5), lote('feijao', 3)])).toBe(7.5)
  })

  it('calcula quanto falta e zera quando a meta é atingida', () => {
    const arroz = buscarItem('arroz')
    expect(faltaComprar(arroz, casal, [lote('arroz', 4)])).toBe(6)
    expect(faltaComprar(arroz, casal, [lote('arroz', 12)])).toBe(0)
  })

  it('mede o progresso médio limitado a 100% por item', () => {
    const itens = [buscarItem('arroz'), buscarItem('agua')]
    expect(progressoGeral(itens, casal, [])).toBe(0)
    expect(progressoGeral(itens, casal, [lote('arroz', 20)])).toBe(50)
    expect(progressoGeral(itens, casal, [lote('arroz', 10), lote('agua', 240)])).toBe(100)
    expect(progressoGeral([], casal, [])).toBe(0)
  })
})

describe('validade', () => {
  const hoje = new Date(2026, 10, 2, 12)

  it('conta os dias até o fim do mês de validade', () => {
    expect(diasAteVencer('2026-11', hoje)).toBe(28)
    expect(diasAteVencer('2026-10', hoje)).toBeLessThan(0)
  })

  it('considera vencido só depois do fim do mês da validade', () => {
    expect(estaVencido(lote('arroz', 1, '2026-10'), hoje)).toBe(true)
    expect(estaVencido(lote('arroz', 1, '2026-11'), hoje)).toBe(false)
    expect(lotesNoPrazo([lote('arroz', 1, '2026-10'), lote('arroz', 2, '2027-01')], hoje).map((l) => l.quantidade)).toEqual([2])
  })

  it('alerta quando vence em até 60 dias', () => {
    expect(venceEmBreve(lote('arroz', 1, '2026-12'), hoje)).toBe(true)
    expect(venceEmBreve(lote('arroz', 1, '2027-03'), hoje)).toBe(false)
  })

  it('sugere validade somando os meses típicos do item', () => {
    expect(validadeSugerida(buscarItem('arroz'), '2026-11-02')).toBe('2027-11')
    expect(somarMeses('2026-01-31', 1)).toBe('2026-02')
  })

  it('valida formatos de data e mês', () => {
    expect(ehDataIso('2026-11-02')).toBe(true)
    expect(ehDataIso('02/11/2026')).toBe(false)
    expect(ehMesIso('2027-12')).toBe(true)
    expect(ehMesIso('2027-13')).toBe(false)
  })
})
