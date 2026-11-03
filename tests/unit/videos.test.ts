import { describe, expect, it } from 'vitest'
import { GUIA } from '../../src/domain/conteudo/guia'
import { VIDEOS, duracaoTotal, videoDaSecao } from '../../src/domain/conteudo/videos'
import { avancarTempo, type Posicao } from '../../src/presentation/estado/useReprodutor'

describe('vídeos do guia', () => {
  it('cada vídeo pertence a uma seção que existe no guia', () => {
    const secoes = GUIA.map((secao) => secao.id)
    expect(VIDEOS.every((video) => secoes.includes(video.secaoId))).toBe(true)
  })

  it('os vídeos são curtos: até 60 segundos', () => {
    expect(VIDEOS.every((video) => duracaoTotal(video) <= 60)).toBe(true)
  })

  it('o guia tem a seção de racionamento com vídeo', () => {
    expect(GUIA.some((secao) => secao.id === 'racionamento')).toBe(true)
    expect(videoDaSecao('racionamento')?.cenas.length).toBeGreaterThan(0)
  })

  it('armazenamento e água têm vídeo', () => {
    expect(videoDaSecao('armazenamento')).toBeDefined()
    expect(videoDaSecao('agua')).toBeDefined()
  })
})

describe('tempo do reprodutor', () => {
  const segundos = [2, 3]
  const tocando: Posicao = { indice: 0, decorridoMs: 0, estado: 'tocando' }

  it('não anda quando está pausado', () => {
    const pausado: Posicao = { ...tocando, estado: 'pausado' }
    expect(avancarTempo(pausado, 50, segundos)).toEqual(pausado)
  })

  it('soma o tempo da cena atual', () => {
    expect(avancarTempo(tocando, 50, segundos)).toEqual({ indice: 0, decorridoMs: 50, estado: 'tocando' })
  })

  it('passa para a próxima cena quando o tempo acaba', () => {
    const quaseNoFim: Posicao = { ...tocando, decorridoMs: 1990 }
    expect(avancarTempo(quaseNoFim, 20, segundos)).toEqual({ indice: 1, decorridoMs: 0, estado: 'tocando' })
  })

  it('termina na última cena', () => {
    const ultima: Posicao = { indice: 1, decorridoMs: 2990, estado: 'tocando' }
    expect(avancarTempo(ultima, 20, segundos)).toEqual({ indice: 1, decorridoMs: 3000, estado: 'fim' })
  })

  it('não pula cenas quando o celular volta do segundo plano', () => {
    expect(avancarTempo(tocando, 60000, segundos).decorridoMs).toBe(100)
  })
})
