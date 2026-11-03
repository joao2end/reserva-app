<script setup lang="ts">
import { PhWarningOctagon } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'

const { erro } = useEstoque()
</script>

<template>
  <div v-if="erro" class="caixa bloco flex items-start gap-4" role="alert">
    <PhWarningOctagon :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
    <p class="font-bold">{{ erro }}</p>
  </div>
</template>
