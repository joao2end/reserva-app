<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { PhCheckCircle, PhX } from '@phosphor-icons/vue'
import { useAviso } from '../estado/useAviso'

const { mensagem, fechar } = useAviso()
const caixa = ref<HTMLElement | null>(null)

function fecharAoTocarFora(evento: PointerEvent) {
  if (mensagem.value && !caixa.value?.contains(evento.target as Node)) fechar()
}

onMounted(() => document.addEventListener('pointerdown', fecharAoTocarFora, true))
onBeforeUnmount(() => document.removeEventListener('pointerdown', fecharAoTocarFora, true))
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 z-20 mx-auto max-w-xl px-4"
    style="bottom: calc(6rem + env(safe-area-inset-bottom))"
    role="status"
    aria-live="polite"
  >
    <div v-if="mensagem" ref="caixa" class="bloco pointer-events-auto flex items-center gap-4 border-4 border-tinta p-4 shadow-[0_0_0_4px_var(--papel)]">
      <PhCheckCircle :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
      <p class="flex-1 font-bold">{{ mensagem }}</p>
      <button type="button" class="flex size-12 shrink-0 items-center justify-center" aria-label="Fechar aviso" @click="fechar">
        <PhX :size="28" weight="bold" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
