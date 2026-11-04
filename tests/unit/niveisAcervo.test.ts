import { describe, expect, it } from 'vitest'
import { CURSO, LICOES, NIVEIS, cursoPorId, licaoPorId, licoesPorNivel, proximaLicao } from '../../src/domain/conteudo/curso'
import { ACERVO, CATEGORIAS_ACERVO, buscarNoAcervo, guiaDoAcervo } from '../../src/domain/conteudo/acervo'
import { GUIA } from '../../src/domain/conteudo/guia'
import { roteiroDaLicao } from '../../src/domain/conteudo/narracao'

const ORDEM = NIVEIS.map((nivel) => nivel.id)

describe('níveis das lições', () => {
  it('toda lição tem um nível conhecido', () => {
    for (const licao of LICOES) expect(ORDEM, licao.id).toContain(licao.nivel)
  })

  it('dentro de cada curso as lições vão do fácil ao avançado', () => {
    for (const curso of CURSO) {
      const posicoes = curso.licoes.map((licao) => ORDEM.indexOf(licao.nivel))
      expect(posicoes, curso.id).toEqual([...posicoes].sort((a, b) => a - b))
    }
  })

  it('todo curso começa com uma lição fácil', () => {
    for (const curso of CURSO) expect(curso.licoes[0].nivel, curso.id).toBe('facil')
  })

  it('agrupa as lições por nível sem perder nenhuma', () => {
    for (const curso of CURSO) {
      const grupos = licoesPorNivel(curso)
      expect(grupos.flatMap((grupo) => grupo.licoes).map((licao) => licao.id)).toEqual(curso.licoes.map((licao) => licao.id))
    }
  })

  it('a próxima lição segue a ordem dos níveis', () => {
    const eletricista = cursoPorId('eletricista')!
    expect(proximaLicao(eletricista.licoes[1].id)?.nivel).not.toBe('facil')
  })

  it('a narração diz o nível da lição', () => {
    const licao = licaoPorId('rcp')!
    expect(roteiroDaLicao(licao, cursoPorId('socorros')!)[0].fala).toContain('Nível avançado')
  })
})

describe('acervo de sobrevivência', () => {
  it('cada guia tem id único, categoria, conteúdo e fontes', () => {
    const ids = ACERVO.map((guia) => guia.id)
    expect(new Set(ids).size).toBe(ids.length)
    const categorias = CATEGORIAS_ACERVO.map((categoria) => categoria.id)
    for (const guia of ACERVO) {
      expect(categorias, guia.id).toContain(guia.categoria)
      expect(ORDEM, guia.id).toContain(guia.nivel)
      expect(guia.blocos.length, guia.id).toBeGreaterThanOrEqual(2)
      expect(guia.blocos.every((bloco) => bloco.itens.length > 0), guia.id).toBe(true)
      expect(guia.fontes.length, guia.id).toBeGreaterThanOrEqual(1)
    }
  })

  it('não repete o id de uma seção do guia', () => {
    const doGuia = new Set(GUIA.map((secao) => secao.id))
    for (const guia of ACERVO) expect(doGuia.has(guia.id), guia.id).toBe(false)
  })

  it('toda categoria tem pelo menos um guia', () => {
    for (const categoria of CATEGORIAS_ACERVO) expect(ACERVO.some((guia) => guia.categoria === categoria.id), categoria.id).toBe(true)
  })

  it('as ligações apontam para lições, cursos e seções que existem', () => {
    for (const ligacao of ACERVO.flatMap((guia) => guia.ligacoes ?? [])) {
      if (ligacao.tipo === 'licao') expect(licaoPorId(ligacao.id), ligacao.id).toBeDefined()
      if (ligacao.tipo === 'curso') expect(cursoPorId(ligacao.id), ligacao.id).toBeDefined()
      if (ligacao.tipo === 'secao') expect(GUIA.some((secao) => secao.id === ligacao.id), ligacao.id).toBe(true)
    }
  })

  it('busca sem acento, por várias palavras e por categoria', () => {
    expect(buscarNoAcervo('').length).toBe(ACERVO.length)
    expect(buscarNoAcervo('ENCHENTE').map((guia) => guia.id)).toContain('enchente')
    expect(buscarNoAcervo('escorpiao').map((guia) => guia.id)).toContain('escorpiao-cobra')
    expect(buscarNoAcervo('soro caseiro').map((guia) => guia.id)).toEqual(['desidratacao'])
    expect(buscarNoAcervo('', 'saude').every((guia) => guia.categoria === 'saude')).toBe(true)
    expect(buscarNoAcervo('umidade do ar').map((guia) => guia.id)).toContain('ar-seco')
    expect(buscarNoAcervo('palavra-que-nao-existe')).toEqual([])
    expect(guiaDoAcervo('enchente')?.titulo).toContain('Enchente')
  })
})
