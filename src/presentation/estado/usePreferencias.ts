import { computed, ref } from 'vue'
import { ESCALA_TEXTO, PREFERENCIAS_PADRAO, type Preferencias, type TamanhoTexto } from '../../domain/entidades/preferencias'
import { servicoPreferencias } from '../../infrastructure/container'

const tamanhoTexto = ref<TamanhoTexto>(PREFERENCIAS_PADRAO.tamanhoTexto)
const mochila = ref<string[]>([])

function aplicar(preferencias: Preferencias) {
  tamanhoTexto.value = preferencias.tamanhoTexto
  mochila.value = preferencias.mochila
  document.documentElement.style.setProperty('zoom', String(ESCALA_TEXTO[preferencias.tamanhoTexto]))
}

export async function iniciarPreferencias(): Promise<void> {
  aplicar(await servicoPreferencias.obter())
}

export function usePreferencias() {
  return {
    tamanhoTexto: computed(() => tamanhoTexto.value),
    mochila: computed(() => mochila.value),
    definirTamanhoTexto: async (tamanho: TamanhoTexto) => aplicar(await servicoPreferencias.definirTamanhoTexto(tamanho)),
    alternarItemMochila: async (id: string) => aplicar(await servicoPreferencias.alternarItemMochila(id)),
    esvaziarMochila: async () => aplicar(await servicoPreferencias.esvaziarMochila()),
  }
}
