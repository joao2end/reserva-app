import { readonly, ref } from 'vue'

export interface PedidoConfirmacao {
  titulo: string
  texto: string
  confirmar: string
  cancelar: string
}

const pedido = ref<PedidoConfirmacao | null>(null)
let responder: ((resposta: boolean) => void) | undefined

export function useConfirmacao() {
  function perguntar(novoPedido: PedidoConfirmacao): Promise<boolean> {
    responder?.(false)
    pedido.value = novoPedido
    return new Promise((resolver) => {
      responder = resolver
    })
  }

  function responderCom(resposta: boolean) {
    pedido.value = null
    responder?.(resposta)
    responder = undefined
  }

  return { pedido: readonly(pedido), perguntar, responder: responderCom }
}
