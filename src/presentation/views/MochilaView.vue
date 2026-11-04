<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowCounterClockwise, PhArrowLeft, PhBackpack } from '@phosphor-icons/vue'
import { ITENS_MOCHILA } from '../../domain/conteudo/mochila'
import { usePreferencias } from '../estado/usePreferencias'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'
import CaixaAviso from '../components/CaixaAviso.vue'

const { mochila, alternarItemMochila, esvaziarMochila } = usePreferencias()
const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()

const prontos = computed(() => ITENS_MOCHILA.filter((item) => mochila.value.includes(item.id)).length)
const completa = computed(() => prontos.value === ITENS_MOCHILA.length)

async function alternar(id: string) {
  await alternarItemMochila(id)
  if (completa.value) mostrar('Mochila pronta. Deixe perto da porta.')
}

async function recomecar() {
  const confirmado = await perguntar({
    titulo: 'Desmarcar tudo?',
    texto: 'Use quando for conferir a mochila de novo.',
    confirmar: 'Sim, desmarcar',
    cancelar: 'Não, manter',
  })
  if (confirmado) {
    await esvaziarMochila()
    mostrar('Tudo desmarcado.')
  }
}
</script>

<template>
  <section class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'guia' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao guia
      </RouterLink>
      <PhBackpack :size="56" weight="bold" class="mt-6" aria-hidden="true" />
      <h1 class="titulo-1 mt-2">Mochila de saída</h1>
      <p class="nota">Marque o que já está na mochila. Fica salvo no celular.</p>
    </header>

    <p class="bloco p-4 text-[24px] font-bold" role="status" data-teste="progresso-mochila">
      {{ prontos }} de {{ ITENS_MOCHILA.length }} prontos
    </p>

    <ul class="border-4 border-tinta">
      <li v-for="item in ITENS_MOCHILA" :key="item.id" class="border-b-2 border-tinta last:border-b-0">
        <label class="flex min-h-18 cursor-pointer items-center gap-4 px-4 py-2">
          <input
            type="checkbox"
            class="size-8 shrink-0 accent-current"
            :checked="mochila.includes(item.id)"
            @change="alternar(item.id)"
          />
          <span class="flex-1 font-bold">{{ item.texto }}</span>
        </label>
      </li>
    </ul>

    <CaixaAviso titulo="Confira a cada 3 meses">
      Troque a água, a comida e os remédios antes de vencer. Troque as pilhas também.
    </CaixaAviso>

    <button v-if="prontos" type="button" class="botao-secundario flex items-center justify-center gap-3" @click="recomecar">
      <PhArrowCounterClockwise :size="28" weight="bold" aria-hidden="true" />Desmarcar tudo
    </button>
  </section>
</template>
