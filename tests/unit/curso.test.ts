import { describe, expect, it } from 'vitest'
import { AREAS_CURSO, CURSO, LICOES, cursoPorId, cursosDaArea, licaoPorId, moduloDaLicao, proximaLicao } from '../../src/domain/conteudo/curso'
import { DESENHOS } from '../../src/domain/conteudo/desenho'
import { DESENHO } from '../../src/presentation/desenhos'
import { ICONE_CURSO } from '../../src/presentation/icones'


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

  it('navega entre as lições de um mesmo curso', () => {
    expect(licaoPorId('rcp')?.titulo).toContain('massagem')
    expect(moduloDaLicao('engasgo')?.id).toBe('socorros')
    expect(proximaLicao(CURSO[0].licoes[0].id)?.id).toBe(CURSO[0].licoes[1].id)
    for (const curso of CURSO) expect(proximaLicao(curso.licoes[curso.licoes.length - 1].id)).toBeUndefined()
  })

  it('tem cursos de ofícios além das emergências', () => {
    expect(cursosDaArea('oficios').map((curso) => curso.id)).toEqual(['eletricista', 'encanador', 'mecanica', 'horta'])
    expect(cursosDaArea('emergencias').length).toBeGreaterThanOrEqual(2)
    expect(cursoPorId('eletricista')?.licoes.some((licao) => licao.id === 'eletrica-planejar')).toBe(true)
    expect(AREAS_CURSO.every((area) => cursosDaArea(area.id).length > 0)).toBe(true)
  })

  it('todo curso tem ícone e id único', () => {
    const ids = CURSO.map((curso) => curso.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.every((id) => ICONE_CURSO[id])).toBe(true)
  })

  it('cada cena tem animação: ilustração antiga ou cena desenhada', () => {
    for (const cena of LICOES.flatMap((licao) => licao.cenas)) {
      expect(Boolean(cena.ilustracao) !== Boolean(cena.desenho), cena.titulo).toBe(true)
    }
  })

  it('as cenas desenhadas só usam desenhos que existem e cabem no palco', () => {
    for (const cena of LICOES.flatMap((licao) => licao.cenas)) {
      for (const peca of cena.desenho?.pecas ?? []) {
        expect(DESENHOS, cena.titulo).toContain(peca.desenho)
        expect(peca.x, cena.titulo).toBeGreaterThanOrEqual(0)
        expect(peca.x, cena.titulo).toBeLessThanOrEqual(100)
        expect(peca.largura, cena.titulo).toBeLessThanOrEqual(100)
      }
    }
    expect(Object.keys(DESENHO).sort()).toEqual([...DESENHOS].sort())
  })

})
