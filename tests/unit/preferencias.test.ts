import { describe, expect, it } from 'vitest'
import { ServicoPreferencias } from '../../src/application/casos-de-uso/ServicoPreferencias'
import type { RepositorioPreferencias } from '../../src/application/portas/RepositorioPreferencias'
import { PREFERENCIAS_PADRAO, type Preferencias, type TamanhoTexto } from '../../src/domain/entidades/preferencias'
import { ErroDeValidacao } from '../../src/domain/entidades/erros'
import { normalizarPreferencias } from '../../src/infrastructure/RepositorioPreferenciasCapacitor'

function repositorioEmMemoria(): RepositorioPreferencias {
  let atual: Preferencias = { ...PREFERENCIAS_PADRAO }
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
    expect(normalizarPreferencias(null)).toEqual({ tamanhoTexto: 'normal' })
    expect(normalizarPreferencias('{x')).toEqual({ tamanhoTexto: 'normal' })
    expect(normalizarPreferencias('{"tamanhoTexto":"gigante"}')).toEqual({ tamanhoTexto: 'normal' })
    expect(normalizarPreferencias('{"tamanhoTexto":"grande"}')).toEqual({ tamanhoTexto: 'grande' })
  })
})
