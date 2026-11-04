import { computed, ref } from 'vue'
import {
  ESCALA_TEXTO,
  PREFERENCIAS_PADRAO,
  type ContatoFamilia,
  type Preferencias,
  type TamanhoTexto,
} from '../../domain/entidades/preferencias'
import { servicoPreferencias } from '../../infrastructure/container'

const tamanhoTexto = ref<TamanhoTexto>(PREFERENCIAS_PADRAO.tamanhoTexto)
const mochila = ref<string[]>([])
const contatoFamilia = ref<ContatoFamilia | null>(null)
const licoesConcluidas = ref<string[]>([])

function aplicar(preferencias: Preferencias) {
  tamanhoTexto.value = preferencias.tamanhoTexto
  mochila.value = preferencias.mochila
  contatoFamilia.value = preferencias.contatoFamilia
  licoesConcluidas.value = preferencias.licoesConcluidas
  document.documentElement.style.setProperty('zoom', String(ESCALA_TEXTO[preferencias.tamanhoTexto]))
}

export async function iniciarPreferencias(): Promise<void> {
  aplicar(await servicoPreferencias.obter())
}

export function usePreferencias() {
  return {
    tamanhoTexto: computed(() => tamanhoTexto.value),
    mochila: computed(() => mochila.value),
    contatoFamilia: computed(() => contatoFamilia.value),
    licoesConcluidas: computed(() => licoesConcluidas.value),
    definirTamanhoTexto: async (tamanho: TamanhoTexto) => aplicar(await servicoPreferencias.definirTamanhoTexto(tamanho)),
    alternarItemMochila: async (id: string) => aplicar(await servicoPreferencias.alternarItemMochila(id)),
    esvaziarMochila: async () => aplicar(await servicoPreferencias.esvaziarMochila()),
    definirContatoFamilia: async (nome: string, telefone: string) =>
      aplicar(await servicoPreferencias.definirContatoFamilia(nome, telefone)),
    removerContatoFamilia: async () => aplicar(await servicoPreferencias.removerContatoFamilia()),
    concluirLicao: async (id: string) => aplicar(await servicoPreferencias.concluirLicao(id)),
  }
}
