import { computed, onUnmounted, ref } from 'vue'
import type { VideoGuia } from '../../domain/conteudo/videos'

export type EstadoReprodutor = 'parado' | 'tocando' | 'pausado' | 'fim'

export interface Posicao {
  indice: number
  decorridoMs: number
  estado: EstadoReprodutor
}

const MAIOR_PASSO_MS = 100

export function avancarTempo(posicao: Posicao, passoMs: number, segundosPorCena: number[]): Posicao {
  if (posicao.estado !== 'tocando') return posicao
  const decorridoMs = posicao.decorridoMs + Math.min(passoMs, MAIOR_PASSO_MS)
  if (decorridoMs < segundosPorCena[posicao.indice] * 1000) return { ...posicao, decorridoMs }
  const ultima = posicao.indice === segundosPorCena.length - 1
  if (ultima) return { ...posicao, decorridoMs: segundosPorCena[posicao.indice] * 1000, estado: 'fim' }
  return { indice: posicao.indice + 1, decorridoMs: 0, estado: 'tocando' }
}

export function useReprodutor(video: VideoGuia) {
  const segundosPorCena = video.cenas.map((cena) => cena.segundos)
  const posicao = ref<Posicao>({ indice: 0, decorridoMs: 0, estado: 'parado' })
  const rodada = ref(0)
  let quadro = 0
  let ultimoInstante = 0

  function passo(instante: number) {
    const anterior = posicao.value.indice
    posicao.value = avancarTempo(posicao.value, instante - ultimoInstante, segundosPorCena)
    ultimoInstante = instante
    if (posicao.value.indice !== anterior) rodada.value += 1
    if (posicao.value.estado === 'tocando') quadro = requestAnimationFrame(passo)
  }

  function tocar() {
    posicao.value = { ...posicao.value, estado: 'tocando' }
    cancelAnimationFrame(quadro)
    ultimoInstante = performance.now()
    quadro = requestAnimationFrame(passo)
  }

  function irPara(indice: number) {
    posicao.value = { indice, decorridoMs: 0, estado: posicao.value.estado }
    rodada.value += 1
    tocar()
  }

  function alternar() {
    const { estado } = posicao.value
    if (estado === 'tocando') {
      cancelAnimationFrame(quadro)
      posicao.value = { ...posicao.value, estado: 'pausado' }
      return
    }
    if (estado === 'fim') {
      irPara(0)
      return
    }
    if (estado === 'parado') rodada.value += 1
    tocar()
  }

  const ultimoIndice = video.cenas.length - 1

  function proxima() {
    if (posicao.value.indice < ultimoIndice) irPara(posicao.value.indice + 1)
  }

  function anterior() {
    if (posicao.value.indice > 0) irPara(posicao.value.indice - 1)
  }

  function progressoDaCena(indice: number): number {
    const { indice: atual, decorridoMs, estado } = posicao.value
    if (indice < atual || estado === 'fim') return 1
    if (indice > atual) return 0
    return decorridoMs / (segundosPorCena[indice] * 1000)
  }

  onUnmounted(() => cancelAnimationFrame(quadro))

  return {
    indice: computed(() => posicao.value.indice),
    estado: computed(() => posicao.value.estado),
    cena: computed(() => video.cenas[posicao.value.indice]),
    ehPrimeira: computed(() => posicao.value.indice === 0),
    ehUltima: computed(() => posicao.value.indice === ultimoIndice),
    rodada,
    alternar,
    proxima,
    anterior,
    progressoDaCena,
  }
}
