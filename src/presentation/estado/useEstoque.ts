import { computed, readonly, ref, shallowRef } from 'vue'
import { ESTADO_VAZIO, type EstadoEstoque } from '../../domain/entidades/tipos'
import { ErroDeValidacao, ErroNaoEncontrado } from '../../domain/entidades/erros'
import type { DadosCompra, DadosEstoque, DadosLocal } from '../../application/casos-de-uso/ServicoEstoque'
import { relogio, servicoEstoque } from '../../infrastructure/container'

const estado = shallowRef<EstadoEstoque>(ESTADO_VAZIO)
const erro = ref<string | null>(null)

export async function iniciarEstoque(): Promise<void> {
  estado.value = await servicoEstoque.obterEstado()
}

async function executar(acao: () => Promise<EstadoEstoque>): Promise<boolean> {
  erro.value = null
  try {
    estado.value = await acao()
    return true
  } catch (falha) {
    if (falha instanceof ErroDeValidacao || falha instanceof ErroNaoEncontrado) {
      erro.value = falha.message
      return false
    }
    throw falha
  }
}

export function useEstoque() {
  return {
    estado: computed(() => estado.value),
    configuracao: computed(() => estado.value.configuracao),
    erro: readonly(erro),
    hoje: () => relogio.agora(),
    limparErro: () => {
      erro.value = null
    },
    definirEstoque: (dados: DadosEstoque) => executar(() => servicoEstoque.definirEstoque(dados)),
    registrarCompra: (dados: DadosCompra) => executar(() => servicoEstoque.registrarCompra(dados)),
    consumir: (loteId: string, quantidade: number) => executar(() => servicoEstoque.consumir(loteId, quantidade)),
    descartar: (loteId: string) => executar(() => servicoEstoque.descartar(loteId)),
    adicionarLocal: (dados: DadosLocal) => executar(() => servicoEstoque.adicionarLocal(dados)),
    removerLocal: (localId: string) => executar(() => servicoEstoque.removerLocal(localId)),
    apagarTudo: () => executar(() => servicoEstoque.apagarTudo()),
  }
}
