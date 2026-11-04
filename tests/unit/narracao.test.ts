import { describe, expect, it } from 'vitest'
import { CURSO, LICOES, moduloDaLicao } from '../../src/domain/conteudo/curso'
import { paraFala, roteiroDaLicao } from '../../src/domain/conteudo/narracao'
import { enderecoYoutube, licoesComYoutube, videosYoutubeDaLicao } from '../../src/domain/conteudo/cursos/youtube'
import { duracaoLegivel, enderecoRemoto, lerManifesto, tamanhoLegivel } from '../../src/domain/conteudo/videosNarrados'

describe('narração dos vídeos', () => {
  it('lê unidades, símbolos e siglas por extenso', () => {
    expect(paraFala('Luz: no mínimo 1,5 mm². 3 × 14 dias × 4 L')).toBe('Luz: no mínimo 1,5 milímetros quadrados. 3 vezes 14 dias vezes 4 litros')
    expect(paraFala('DR de 30 mA e 127 V')).toBe('D R de 30 miliampères e 127 volts')
    expect(paraFala('1º ÁGUA, 2º ENERGIA, ~48 h')).toBe('primeiro ÁGUA, segundo ENERGIA, cerca de 48 horas')
    expect(paraFala('Ligue 193 ou 192')).toBe('Ligue 1 9 3 ou 1 9 2')
    expect(paraFala('1 L para 1.000 L')).toBe('1 litro para 1000 litros')
  })

  it('cada lição tem abertura, uma fala por cena e encerramento', () => {
    for (const licao of LICOES) {
      const curso = moduloDaLicao(licao.id)
      expect(curso, licao.id).toBeDefined()
      const roteiro = roteiroDaLicao(licao, curso!)
      expect(roteiro).toHaveLength(licao.cenas.length + 2)
      expect(roteiro[0].tipo).toBe('abertura')
      expect(roteiro.at(-1)?.tipo).toBe('encerramento')
      for (const trecho of roteiro) {
        expect(trecho.fala.length, licao.id).toBeGreaterThan(10)
        expect(trecho.fala, licao.id).not.toMatch(/[×→~²]/)
      }
    }
  })
})

describe('vídeos narrados para baixar', () => {
  it('aceita só entradas válidas do manifesto', () => {
    const lista = lerManifesto({
      videos: [
        { licaoId: 'rcp', arquivo: 'rcp.mp4', bytes: 2200000, segundos: 48.5, sha256: 'x' },
        { licaoId: 'ruim', arquivo: '../fora.mp4', bytes: 10, segundos: 1 },
        { licaoId: 'vazio', arquivo: 'vazio.mp4', bytes: 0, segundos: 1 },
      ],
    })
    expect(lista).toEqual([{ licaoId: 'rcp', arquivo: 'rcp.mp4', bytes: 2200000, segundos: 48.5 }])
    expect(lerManifesto(null)).toEqual([])
    expect(lerManifesto({ videos: 'x' })).toEqual([])
  })

  it('mostra tamanho e duração de um jeito simples', () => {
    expect(tamanhoLegivel(2_202_009)).toBe('2,1 MB')
    expect(duracaoLegivel(48.5)).toBe('49 segundos')
    expect(duracaoLegivel(75)).toBe('1 min 15 s')
    expect(duracaoLegivel(120)).toBe('2 min')
    expect(enderecoRemoto({ licaoId: 'rcp', arquivo: 'rcp.mp4', bytes: 1, segundos: 1 })).toBe(
      'https://github.com/joao2end/reserva-app/releases/download/videos-cursos/rcp.mp4',
    )
  })
})

describe('vídeos do YouTube', () => {
  it('só aparecem em lições que existem, com id válido', () => {
    const ids = LICOES.map((licao) => licao.id)
    for (const licaoId of licoesComYoutube()) {
      expect(ids, licaoId).toContain(licaoId)
      for (const video of videosYoutubeDaLicao(licaoId)) {
        expect(video.id).toMatch(/^[A-Za-z0-9_-]{11}$/)
        expect(enderecoYoutube(video)).toBe(`https://www.youtube.com/watch?v=${video.id}`)
      }
    }
    expect(CURSO.filter((curso) => curso.licoes.some((licao) => videosYoutubeDaLicao(licao.id).length > 0)).length).toBeGreaterThanOrEqual(6)
  })
})
