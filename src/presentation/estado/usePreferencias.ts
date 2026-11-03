import { computed, ref } from 'vue'
import { ESCALA_TEXTO, PREFERENCIAS_PADRAO, type TamanhoTexto } from '../../domain/entidades/preferencias'
import { servicoPreferencias } from '../../infrastructure/container'

const tamanhoTexto = ref<TamanhoTexto>(PREFERENCIAS_PADRAO.tamanhoTexto)

function aplicar(tamanho: TamanhoTexto) {
  tamanhoTexto.value = tamanho
  document.documentElement.style.setProperty('zoom', String(ESCALA_TEXTO[tamanho]))
}

export async function iniciarPreferencias(): Promise<void> {
  aplicar((await servicoPreferencias.obter()).tamanhoTexto)
}

export function usePreferencias() {
  return {
    tamanhoTexto: computed(() => tamanhoTexto.value),
    definirTamanhoTexto: async (tamanho: TamanhoTexto) => aplicar((await servicoPreferencias.definirTamanhoTexto(tamanho)).tamanhoTexto),
  }
}
