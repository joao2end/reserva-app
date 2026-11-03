<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { PhQuestion } from '@phosphor-icons/vue'
import { useConfirmacao } from '../estado/useConfirmacao'

const { pedido, responder } = useConfirmacao()
const dialogo = ref<HTMLDialogElement | null>(null)

watch(pedido, async (atual) => {
  await nextTick()
  if (atual && !dialogo.value?.open) dialogo.value?.showModal()
  if (!atual && dialogo.value?.open) dialogo.value.close()
})
</script>

<template>
  <dialog
    ref="dialogo"
    class="m-auto w-[calc(100%-32px)] max-w-lg border-4 border-tinta bg-papel p-0 text-tinta backdrop:bg-black/70"
    aria-labelledby="titulo-confirmacao"
    @cancel.prevent="responder(false)"
  >
    <div v-if="pedido" class="space-y-6 p-6">
      <PhQuestion :size="48" weight="bold" aria-hidden="true" />
      <h2 id="titulo-confirmacao" class="titulo-2">{{ pedido.titulo }}</h2>
      <p>{{ pedido.texto }}</p>
      <div class="space-y-3">
        <button type="button" class="botao" @click="responder(true)">{{ pedido.confirmar }}</button>
        <button type="button" class="botao-secundario" @click="responder(false)">{{ pedido.cancelar }}</button>
      </div>
    </div>
  </dialog>
</template>
