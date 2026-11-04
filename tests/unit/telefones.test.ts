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

  it('aparecem nas seções de deslocamento, fumaça, calor e primeiros socorros', () => {
    const comTelefones = GUIA.filter((secao) => secao.telefones).map((secao) => secao.id)
    expect(comTelefones).toEqual(['deslocamento', 'fumaca', 'calor', 'socorros'])
  })

  it('a seção de fumaça manda ligar para os Bombeiros', () => {
    const fumaca = GUIA.find((secao) => secao.id === 'fumaca')
    expect(fumaca?.grupo).toBe('sobrevivencia')
    expect(fumaca?.aviso?.texto).toContain('193')
  })

  it('a seção de calor manda ligar para o SAMU e oferecer água a quem não sente sede', () => {
    const calor = GUIA.find((secao) => secao.id === 'calor')
    expect(calor?.grupo).toBe('sobrevivencia')
    expect(calor?.aviso?.texto).toContain('192')
    expect(calor?.blocos.flatMap((bloco) => bloco.itens).some((item) => item.includes('podem não sentir sede'))).toBe(true)
  })
})
