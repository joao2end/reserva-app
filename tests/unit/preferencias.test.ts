import { describe, expect, it } from 'vitest'
import { ServicoPreferencias } from '../../src/application/casos-de-uso/ServicoPreferencias'
import type { RepositorioPreferencias } from '../../src/application/portas/RepositorioPreferencias'
import { PREFERENCIAS_PADRAO, type Preferencias, type TamanhoTexto } from '../../src/domain/entidades/preferencias'
import { ErroDeValidacao } from '../../src/domain/entidades/erros'
import { ITENS_MOCHILA } from '../../src/domain/conteudo/mochila'
import { normalizarPreferencias } from '../../src/infrastructure/RepositorioPreferenciasCapacitor'

function repositorioEmMemoria(): RepositorioPreferencias {
  let atual: Preferencias = { ...PREFERENCIAS_PADRAO, mochila: [] }
  return {
    carregar: async () => ({ ...atual }),
    salvar: async (novas) => {
      atual = { ...novas }
    },
  }
}

describe('preferências', () => {
  it('começa no tamanho normal e salva o tamanho escolhido', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    expect((await servico.obter()).tamanhoTexto).toBe('normal')
    await servico.definirTamanhoTexto('muito-grande')
    expect((await servico.obter()).tamanhoTexto).toBe('muito-grande')
  })

  it('recusa tamanho inválido', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    await expect(servico.definirTamanhoTexto('gigante' as TamanhoTexto)).rejects.toBeInstanceOf(ErroDeValidacao)
  })

  it('recupera preferências corrompidas', () => {
    expect(normalizarPreferencias(null)).toEqual({ tamanhoTexto: 'normal', mochila: [], contatoFamilia: null })
    expect(normalizarPreferencias('{x')).toEqual({ tamanhoTexto: 'normal', mochila: [], contatoFamilia: null })
    expect(normalizarPreferencias('{"tamanhoTexto":"gigante"}')).toEqual({ tamanhoTexto: 'normal', mochila: [], contatoFamilia: null })
    expect(normalizarPreferencias('{"tamanhoTexto":"grande"}')).toEqual({ tamanhoTexto: 'grande', mochila: [], contatoFamilia: null })
  })

  it('mantém a mochila salva e descarta itens desconhecidos', () => {
    expect(normalizarPreferencias('{"tamanhoTexto":"grande","mochila":["agua","foguete",3,"agua","radio"]}')).toEqual({
      tamanhoTexto: 'grande',
      mochila: ['agua', 'radio'],
      contatoFamilia: null,
    })
    expect(normalizarPreferencias('{"mochila":"agua"}')).toEqual({ tamanhoTexto: 'normal', mochila: [], contatoFamilia: null })
  })

  it('marca, desmarca e esvazia a mochila sem mudar a letra', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    await servico.definirTamanhoTexto('grande')
    await servico.alternarItemMochila('agua')
    await servico.alternarItemMochila('lanterna')
    expect((await servico.obter()).mochila).toEqual(['agua', 'lanterna'])
    await servico.alternarItemMochila('agua')
    expect((await servico.obter()).mochila).toEqual(['lanterna'])
    await servico.esvaziarMochila()
    expect(await servico.obter()).toEqual({ tamanhoTexto: 'grande', mochila: [], contatoFamilia: null })
  })

  it('recusa item da mochila que não existe', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    await expect(servico.alternarItemMochila('foguete')).rejects.toBeInstanceOf(ErroDeValidacao)
  })

  it('itens da mochila têm id único', () => {
    const ids = ITENS_MOCHILA.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('salva o telefone da família só com os números', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    await servico.alternarItemMochila('agua')
    await servico.definirContatoFamilia('  Maria filha ', '(82) 99876-5432')
    expect(await servico.obter()).toEqual({
      tamanhoTexto: 'normal',
      mochila: ['agua'],
      contatoFamilia: { nome: 'Maria filha', telefone: '82998765432' },
    })
    await servico.removerContatoFamilia()
    expect((await servico.obter()).contatoFamilia).toBeNull()
  })

  it('recusa telefone da família sem nome, curto demais ou longo demais', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    await expect(servico.definirContatoFamilia('', '82998765432')).rejects.toBeInstanceOf(ErroDeValidacao)
    await expect(servico.definirContatoFamilia('Maria', '1234')).rejects.toBeInstanceOf(ErroDeValidacao)
    await expect(servico.definirContatoFamilia('Maria', '12345678901234')).rejects.toBeInstanceOf(ErroDeValidacao)
    await expect(servico.definirContatoFamilia('Maria', 'sem número')).rejects.toBeInstanceOf(ErroDeValidacao)
  })

  it('mantém o telefone da família salvo e descarta um contato estragado', () => {
    expect(normalizarPreferencias('{"contatoFamilia":{"nome":"Zé","telefone":"8233334444"}}').contatoFamilia).toEqual({
      nome: 'Zé',
      telefone: '8233334444',
    })
    expect(normalizarPreferencias('{"contatoFamilia":{"nome":"Zé","telefone":"82 3333"}}').contatoFamilia).toBeNull()
    expect(normalizarPreferencias('{"contatoFamilia":{"nome":"","telefone":"8233334444"}}').contatoFamilia).toBeNull()
    expect(normalizarPreferencias('{"contatoFamilia":"Zé"}').contatoFamilia).toBeNull()
  })
})
