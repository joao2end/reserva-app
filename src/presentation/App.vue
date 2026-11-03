<script setup lang="ts">
import BarraNavegacao from './components/BarraNavegacao.vue'
import AvisoSucesso from './components/AvisoSucesso.vue'
import DialogoConfirmacao from './components/DialogoConfirmacao.vue'
</script>

<template>
  <div class="min-h-screen pb-28">
    <main class="mx-auto max-w-xl px-4 pt-6">
      <RouterView />
    </main>
    <AvisoSucesso />
    <BarraNavegacao />
    <DialogoConfirmacao />
  </div>
</template>
