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
    expect(normalizarPreferencias(null)).toEqual({ tamanhoTexto: 'normal', mochila: [] })
    expect(normalizarPreferencias('{x')).toEqual({ tamanhoTexto: 'normal', mochila: [] })
    expect(normalizarPreferencias('{"tamanhoTexto":"gigante"}')).toEqual({ tamanhoTexto: 'normal', mochila: [] })
    expect(normalizarPreferencias('{"tamanhoTexto":"grande"}')).toEqual({ tamanhoTexto: 'grande', mochila: [] })
  })

  it('mantém a mochila salva e descarta itens desconhecidos', () => {
    expect(normalizarPreferencias('{"tamanhoTexto":"grande","mochila":["agua","foguete",3,"agua","radio"]}')).toEqual({
      tamanhoTexto: 'grande',
      mochila: ['agua', 'radio'],
    })
    expect(normalizarPreferencias('{"mochila":"agua"}')).toEqual({ tamanhoTexto: 'normal', mochila: [] })
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
    expect(await servico.obter()).toEqual({ tamanhoTexto: 'grande', mochila: [] })
  })

  it('recusa item da mochila que não existe', async () => {
    const servico = new ServicoPreferencias(repositorioEmMemoria())
    await expect(servico.alternarItemMochila('foguete')).rejects.toBeInstanceOf(ErroDeValidacao)
  })

  it('itens da mochila têm id único', () => {
    const ids = ITENS_MOCHILA.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
