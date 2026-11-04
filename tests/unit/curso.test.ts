import { describe, expect, it } from 'vitest'
import { CURSO, LICOES, licaoPorId, moduloDaLicao, proximaLicao } from '../../src/domain/conteudo/curso'

describe('curso de sobrevivência', () => {
  it('cada lição tem id único', () => {
    const ids = LICOES.map((licao) => licao.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada lição é completa: animação, conteúdo, erros comuns, teste e fontes', () => {
    for (const licao of LICOES) {
      expect(licao.cenas.length, licao.id).toBeGreaterThanOrEqual(3)
      expect(licao.partes.length, licao.id).toBeGreaterThanOrEqual(2)
      expect(licao.erros.length, licao.id).toBeGreaterThanOrEqual(2)
      expect(licao.teste.length, licao.id).toBeGreaterThanOrEqual(3)
      expect(licao.fontes.length, licao.id).toBeGreaterThanOrEqual(1)
    }
  })

  it('a animação de cada lição é curta: até 60 segundos', () => {
    for (const licao of LICOES) {
      expect(licao.cenas.reduce((total, cena) => total + cena.segundos, 0), licao.id).toBeLessThanOrEqual(60)
    }
  })

  it('toda pergunta tem a resposta certa entre as opções', () => {
    for (const { pergunta, opcoes, correta } of LICOES.flatMap((licao) => licao.teste)) {
      expect(opcoes.length, pergunta).toBeGreaterThanOrEqual(2)
      expect(correta, pergunta).toBeGreaterThanOrEqual(0)
      expect(correta, pergunta).toBeLessThan(opcoes.length)
    }
  })

  it('navega entre lições e módulos', () => {
    expect(licaoPorId('rcp')?.titulo).toContain('massagem')
    expect(moduloDaLicao('engasgo')?.id).toBe('socorros')
    expect(proximaLicao(CURSO[0].licoes[2].id)?.id).toBe(CURSO[1].licoes[0].id)
    expect(proximaLicao(LICOES[LICOES.length - 1].id)).toBeUndefined()
  })
})
