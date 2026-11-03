<script setup lang="ts">
import type { Categoria } from '../../domain/entidades/tipos'
import { ICONE_CATEGORIA } from '../icones'

defineProps<{ categoria: Categoria }>()
</script>

<template>
  <h2 class="rotulo bloco flex items-center gap-3 px-4 py-2">
    <component :is="ICONE_CATEGORIA[categoria.id]" :size="26" weight="bold" aria-hidden="true" />
    {{ categoria.nome }}
  </h2>
</template>
