<script setup lang="ts">
import { computed } from 'vue'

const valor = defineModel<string>({ required: true })
const props = defineProps<{ rotulo: string; anoInicial: number }>()

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const anos = computed(() => Array.from({ length: 8 }, (_, indice) => props.anoInicial - 1 + indice))

const mes = computed({
  get: () => Number(valor.value.split('-')[1]),
  set: (novo: number) => {
    valor.value = `${ano.value}-${String(novo).padStart(2, '0')}`
  },
})

const ano = computed({
  get: () => Number(valor.value.split('-')[0]),
  set: (novo: number) => {
    valor.value = `${novo}-${String(mes.value).padStart(2, '0')}`
  },
})
</script>

<template>
  <fieldset>
    <legend class="rotulo mb-2">{{ rotulo }}</legend>
    <div class="grid grid-cols-[3fr_2fr] gap-3">
      <label class="block">
        <span class="nota mb-1 block">Mês</span>
        <select v-model.number="mes" class="campo font-bold" :aria-label="`${rotulo}: mês`">
          <option v-for="(nome, indice) in MESES" :key="nome" :value="indice + 1">{{ nome }}</option>
        </select>
      </label>
      <label class="block">
        <span class="nota mb-1 block">Ano</span>
        <select v-model.number="ano" class="campo font-bold tabular-nums" :aria-label="`${rotulo}: ano`">
          <option v-for="opcao in anos" :key="opcao" :value="opcao">{{ opcao }}</option>
        </select>
      </label>
    </div>
  </fieldset>
</template>
