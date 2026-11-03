import { beforeEach, describe, expect, it } from 'vitest'
import { ServicoEstoque, type DadosEstoque } from '../../src/application/casos-de-uso/ServicoEstoque'
import { RepositorioMemoria } from '../../src/infrastructure/RepositorioMemoria'
import { ErroDeValidacao, ErroNaoEncontrado } from '../../src/domain/entidades/erros'

const HOJE = new Date(2026, 10, 2, 12)
const DADOS: DadosEstoque = { nome: '  Minha casa  ', adultos: 2, criancas: 1, dias: 30, itensSelecionados: ['arroz', 'feijao', 'agua'] }

function criarServico() {
  let contador = 0
  const repositorio = new RepositorioMemoria()
  const servico = new ServicoEstoque(repositorio, { agora: () => HOJE }, { novo: () => `id-${++contador}` })
  return { servico, repositorio }
}

describe('definir estoque', () => {
  it('cria com nome limpo, data de criação e itens válidos sem repetição', async () => {
    const { servico } = criarServico()
    const estado = await servico.definirEstoque({ ...DADOS, itensSelecionados: ['arroz', 'arroz', 'inexistente', 'agua'] })
    expect(estado.configuracao).toMatchObject({ nome: 'Minha casa', adultos: 2, criancas: 1, dias: 30, itensSelecionados: ['arroz', 'agua'] })
    expect(estado.configuracao?.criadoEm).toBe(HOJE.toISOString())
  })

  it('mantém a data de criação e os lotes ao editar', async () => {
    const { servico } = criarServico()
    await servico.definirEstoque(DADOS)
    await servico.registrarCompra({ itemId: 'arroz', quantidade: 5, compradoEm: '2026-11-01', validade: '2027-11' })
    const editado = await servico.definirEstoque({ ...DADOS, dias: 90 })
    expect(editado.configuracao?.dias).toBe(90)
    expect(editado.configuracao?.criadoEm).toBe(HOJE.toISOString())
    expect(editado.lotes).toHaveLength(1)
  })

  it.each([
    [{ adultos: 0, criancas: 0 }, 'pelo menos uma pessoa'],
    [{ adultos: -1 }, 'Adultos'],
    [{ adultos: 2.5 }, 'Adultos'],
    [{ criancas: 31 }, 'Crianças'],
    [{ dias: 45 }, 'período'],
    [{ itensSelecionados: [] }, 'alimento'],
    [{ itensSelecionados: ['nada'] }, 'alimento'],
    [{ nome: '   ' }, 'nome'],
    [{ nome: 'x'.repeat(31) }, 'no máximo'],
  ])('rejeita dados inválidos %o', async (alteracao, trecho) => {
    const { servico } = criarServico()
    await expect(servico.definirEstoque({ ...DADOS, ...alteracao })).rejects.toThrow(trecho)
  })
})

describe('compras e consumo', () => {
  let servico: ServicoEstoque

  beforeEach(async () => {
    servico = criarServico().servico
    await servico.definirEstoque(DADOS)
  })

  it('registra compra como lote', async () => {
    const estado = await servico.registrarCompra({ itemId: 'feijao', quantidade: 2.333, compradoEm: '2026-11-02', validade: '2027-11' })
    expect(estado.lotes).toEqual([{ id: 'id-1', itemId: 'feijao', quantidade: 2.33, compradoEm: '2026-11-02', validade: '2027-11' }])
  })

  it.each([
    [{ itemId: 'nada' }, 'Item desconhecido'],
    [{ quantidade: 0 }, 'maior que zero'],
    [{ quantidade: Number.NaN }, 'maior que zero'],
    [{ compradoEm: '' }, 'Data de compra'],
    [{ compradoEm: '2026-12-01' }, 'futuro'],
    [{ validade: '' }, 'Validade'],
  ])('rejeita compra inválida %o', async (alteracao, trecho) => {
    await expect(
      servico.registrarCompra({ itemId: 'arroz', quantidade: 1, compradoEm: '2026-11-02', validade: '2027-11', ...alteracao }),
    ).rejects.toThrow(trecho)
  })

  it('exige estoque criado antes da compra', async () => {
    const vazio = criarServico().servico
    await expect(vazio.registrarCompra({ itemId: 'arroz', quantidade: 1, compradoEm: '2026-11-02', validade: '2027-11' })).rejects.toBeInstanceOf(ErroDeValidacao)
  })

  it('consome parcialmente e remove o lote quando acaba', async () => {
    await servico.registrarCompra({ itemId: 'arroz', quantidade: 5, compradoEm: '2026-11-02', validade: '2027-11' })
    const parcial = await servico.consumir('id-1', 1.5)
    expect(parcial.lotes[0].quantidade).toBe(3.5)
    const total = await servico.consumir('id-1', 10)
    expect(total.lotes).toHaveLength(0)
  })

  it('rejeita consumo inválido e lote inexistente', async () => {
    await servico.registrarCompra({ itemId: 'arroz', quantidade: 5, compradoEm: '2026-11-02', validade: '2027-11' })
    await expect(servico.consumir('id-1', 0)).rejects.toBeInstanceOf(ErroDeValidacao)
    await expect(servico.consumir('outro', 1)).rejects.toBeInstanceOf(ErroNaoEncontrado)
  })

  it('descarta lote', async () => {
    await servico.registrarCompra({ itemId: 'arroz', quantidade: 5, compradoEm: '2026-11-02', validade: '2027-11' })
    expect((await servico.descartar('id-1')).lotes).toHaveLength(0)
    await expect(servico.descartar('id-1')).rejects.toBeInstanceOf(ErroNaoEncontrado)
  })
})

describe('locais e reinício', () => {
  it('adiciona, valida e remove locais', async () => {
    const { servico } = criarServico()
    const estado = await servico.adicionarLocal({ nome: ' Atacarejo ', observacao: ' fardos ' })
    expect(estado.locais).toEqual([{ id: 'id-1', nome: 'Atacarejo', observacao: 'fardos' }])
    await expect(servico.adicionarLocal({ nome: '', observacao: '' })).rejects.toThrow('nome do local')
    await expect(servico.adicionarLocal({ nome: 'A', observacao: 'x'.repeat(201) })).rejects.toThrow('observação')
    expect((await servico.removerLocal('id-1')).locais).toHaveLength(0)
    await expect(servico.removerLocal('id-1')).rejects.toBeInstanceOf(ErroDeValidacao)
  })

  it('apaga tudo e persiste no repositório', async () => {
    const { servico, repositorio } = criarServico()
    await servico.definirEstoque(DADOS)
    await servico.adicionarLocal({ nome: 'Feira', observacao: '' })
    await servico.apagarTudo()
    expect(await repositorio.carregar()).toEqual({ configuracao: null, lotes: [], locais: [] })
  })
})
