import { describe, expect, it } from 'vitest'
import { GUIA } from '../../src/domain/conteudo/guia'
import { TELEFONES_EMERGENCIA } from '../../src/domain/conteudo/telefones'

describe('telefones de emergência', () => {
  it('tem SAMU, Bombeiros, Defesa Civil e Polícia com os números oficiais', () => {
    expect(TELEFONES_EMERGENCIA.map(({ nome, numero }) => `${nome} ${numero}`)).toEqual([
      'SAMU 192',
      'Bombeiros 193',
      'Defesa Civil 199',
      'Polícia 190',
    ])
  })

  it('aparecem nas seções de primeiros socorros e de deslocamento', () => {
    const comTelefones = GUIA.filter((secao) => secao.telefones).map((secao) => secao.id)
    expect(comTelefones).toEqual(['deslocamento', 'socorros'])
  })
})
