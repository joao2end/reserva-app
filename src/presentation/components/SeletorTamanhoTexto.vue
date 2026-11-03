<script setup lang="ts">
import type { TamanhoTexto } from '../../domain/entidades/preferencias'
import { usePreferencias } from '../estado/usePreferencias'

const { tamanhoTexto, definirTamanhoTexto } = usePreferencias()

const opcoes: { valor: TamanhoTexto; rotulo: string; amostra: string }[] = [
  { valor: 'normal', rotulo: 'Normal', amostra: 'text-[22px]' },
  { valor: 'grande', rotulo: 'Grande', amostra: 'text-[28px]' },
  { valor: 'muito-grande', rotulo: 'Muito grande', amostra: 'text-[34px]' },
]
</script>

<template>
  <fieldset>
    <legend class="rotulo mb-2">Tamanho da letra</legend>
    <div class="grid grid-cols-3 border-4 border-tinta">
      <label
        v-for="(opcao, indice) in opcoes"
        :key="opcao.valor"
        class="flex min-h-20 cursor-pointer flex-col items-center justify-center has-[:focus-visible]:outline-4"
        :class="{ bloco: tamanhoTexto === opcao.valor, 'border-l-2 border-tinta': indice > 0 }"
      >
        <input
          type="radio"
          name="tamanho-texto"
          class="sr-only"
          :value="opcao.valor"
          :checked="tamanhoTexto === opcao.valor"
          @change="definirTamanhoTexto(opcao.valor)"
        />
        <span class="font-bold leading-none" :class="opcao.amostra" aria-hidden="true">A</span>
        <span class="text-[16px] font-bold">{{ opcao.rotulo }}</span>
      </label>
    </div>
  </fieldset>
</template>
