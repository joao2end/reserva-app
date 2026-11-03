<script setup lang="ts">
defineProps<{ percentual: number; rotulo: string }>()
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between">
      <span class="rotulo">{{ rotulo }}</span>
      <span class="text-[22px] font-bold tabular-nums">{{ percentual }}%</span>
    </div>
    <div
      class="mt-2 h-6 border-4 border-tinta"
      role="progressbar"
      :aria-valuenow="percentual"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="rotulo"
    >
      <div class="h-full bg-tinta" :style="{ width: `${Math.min(percentual, 100)}%` }" />
    </div>
  </div>
</template>
