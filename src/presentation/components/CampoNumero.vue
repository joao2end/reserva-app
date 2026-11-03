<script setup lang="ts">
import { PhMinus, PhPlus } from '@phosphor-icons/vue'

const valor = defineModel<number>({ required: true })
const props = withDefaults(defineProps<{ rotulo: string; minimo?: number; maximo?: number; passo?: number }>(), {
  minimo: 0,
  maximo: 99,
  passo: 1,
})

function limitar(numero: number): number {
  if (!Number.isFinite(numero)) return props.minimo
  return Math.min(props.maximo, Math.max(props.minimo, Math.round(numero * 100) / 100))
}

function ajustar(delta: number) {
  valor.value = limitar(valor.value + delta)
}

function corrigir() {
  valor.value = limitar(Number(valor.value))
}
</script>

<template>
  <fieldset>
    <legend class="rotulo mb-2">{{ rotulo }}</legend>
    <div class="flex items-stretch">
      <button
        type="button"
        class="flex w-16 shrink-0 items-center justify-center border-4 border-tinta active:bg-relevo disabled:opacity-40"
        :aria-label="`Diminuir ${rotulo}`"
        :disabled="valor <= minimo"
        @click="ajustar(-passo)"
      >
        <PhMinus :size="28" weight="bold" aria-hidden="true" />
      </button>
      <input
        v-model.number="valor"
        class="campo min-w-0 border-x-0 text-center text-[28px] font-bold tabular-nums"
        type="number"
        inputmode="decimal"
        :min="minimo"
        :max="maximo"
        :step="passo"
        :aria-label="rotulo"
        @blur="corrigir"
      />
      <button
        type="button"
        class="flex w-16 shrink-0 items-center justify-center border-4 border-tinta active:bg-relevo disabled:opacity-40"
        :aria-label="`Aumentar ${rotulo}`"
        :disabled="valor >= maximo"
        @click="ajustar(passo)"
      >
        <PhPlus :size="28" weight="bold" aria-hidden="true" />
      </button>
    </div>
  </fieldset>
</template>
