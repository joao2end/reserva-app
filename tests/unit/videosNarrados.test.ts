import { describe, expect, it } from 'vitest'
import type { ArmazemDeVideos } from '../../src/application/portas/ArmazemDeVideos'
import { ServicoVideosNarrados, type ProgressoEmLote } from '../../src/application/casos-de-uso/ServicoVideosNarrados'
import type { VideoNarrado } from '../../src/domain/conteudo/videosNarrados'

const videos: VideoNarrado[] = [
  { licaoId: 'a', arquivo: 'a.mp4', bytes: 100, segundos: 30 },
  { licaoId: 'b', arquivo: 'b.mp4', bytes: 300, segundos: 40 },
  { licaoId: 'c', arquivo: 'c.mp4', bytes: 100, segundos: 30 },
]

function armazemFalso(jaBaixados: string[], quebrados: string[] = []) {
  const noCelular = new Set(jaBaixados)
  const pedidos: string[] = []
  const armazem: ArmazemDeVideos = {
    listar: async () => videos,
    enderecoLocal: async (video) => (noCelular.has(video.licaoId) ? `local/${video.arquivo}` : undefined),
    baixar: async (video, aoProgredir) => {
      pedidos.push(video.licaoId)
      if (quebrados.includes(video.licaoId)) throw new Error('sem internet')
      aoProgredir(0.5)
      noCelular.add(video.licaoId)
      return `local/${video.arquivo}`
    },
    salvarNoCelular: async () => undefined,
    apagar: async (video) => {
      noCelular.delete(video.licaoId)
    },
  }
  return { armazem, pedidos, noCelular }
}

describe('baixar todos os vídeos de um curso', () => {
  it('baixa só os que faltam, em ordem, e o progresso chega a 100%', async () => {
    const { armazem, pedidos } = armazemFalso(['a'])
    const servico = new ServicoVideosNarrados(armazem)
    const progressos: ProgressoEmLote[] = []
    const resultado = await servico.baixarTodos(videos, (progresso) => progressos.push(progresso))
    expect(pedidos).toEqual(['b', 'c'])
    expect(resultado).toEqual({ baixados: 2, falhas: 0 })
    expect(progressos.at(-1)).toEqual({ atual: 2, total: 2, fracao: 1 })
    expect(progressos.every((p, i) => i === 0 || p.fracao >= progressos[i - 1].fracao)).toBe(true)
  })

  it('continua depois de uma falha e conta quantas falharam', async () => {
    const { armazem, noCelular } = armazemFalso([], ['b'])
    const resultado = await new ServicoVideosNarrados(armazem).baixarTodos(videos, () => undefined)
    expect(resultado).toEqual({ baixados: 2, falhas: 1 })
    expect([...noCelular].sort()).toEqual(['a', 'c'])
  })

  it('sabe quais já estão no celular e apaga todos', async () => {
    const { armazem } = armazemFalso(['a', 'c'])
    const servico = new ServicoVideosNarrados(armazem)
    expect(await servico.quaisEstaoNoCelular(videos)).toEqual(['a', 'c'])
    expect((await servico.dasLicoes(['c', 'x', 'a'])).map((v) => v.licaoId)).toEqual(['c', 'a'])
    await servico.apagarTodos(videos)
    expect(await servico.quaisEstaoNoCelular(videos)).toEqual([])
  })
})
