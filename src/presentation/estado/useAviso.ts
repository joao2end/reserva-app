import { readonly, ref } from 'vue'

const DURACAO_MS = 5000

const mensagem = ref<string | null>(null)
let temporizador: ReturnType<typeof setTimeout> | undefined

export function useAviso() {
  function mostrar(texto: string) {
    mensagem.value = texto
    clearTimeout(temporizador)
    temporizador = setTimeout(fechar, DURACAO_MS)
  }

  function fechar() {
    mensagem.value = null
  }

  return { mensagem: readonly(mensagem), mostrar, fechar }
}
