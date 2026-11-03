<script setup lang="ts">
import { computed } from 'vue'
import { PhInfo, PhWarning, PhWarningOctagon } from '@phosphor-icons/vue'

const props = defineProps<{ titulo: string; tipo?: 'info' | 'atencao' | 'critico' }>()

const icone = computed(() => {
  if (props.tipo === 'critico') return PhWarningOctagon
  if (props.tipo === 'atencao') return PhWarning
  return PhInfo
})
</script>

<template>
  <div class="caixa flex gap-4" :class="{ bloco: tipo === 'critico' }" :role="tipo === 'critico' ? 'alert' : 'note'">
    <component :is="icone" :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
    <div>
      <p class="rotulo mb-2">{{ titulo }}</p>
      <div class="text-[22px] leading-[34px]"><slot /></div>
    </div>
  </div>
</template>
