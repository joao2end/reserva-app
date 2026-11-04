<script setup lang="ts">
import { PhPhoneCall } from '@phosphor-icons/vue'
import { TELEFONES_EMERGENCIA } from '../../domain/conteudo/telefones'
</script>

<template>
  <section class="space-y-4" aria-labelledby="titulo-emergencia" data-teste="emergencia">
    <h2 id="titulo-emergencia" class="titulo-2">Ligar para emergência</h2>
    <p class="nota">Toque para abrir o telefone com o número pronto.</p>
    <ul class="grid gap-3">
      <li v-for="telefone in TELEFONES_EMERGENCIA" :key="telefone.numero">
        <a
          :href="`tel:${telefone.numero}`"
          class="flex min-h-20 items-center gap-4 rounded-md border-4 border-tinta p-4 active:bg-relevo"
          :aria-label="`Ligar para ${telefone.nome}, ${telefone.numero.split('').join(' ')}. ${telefone.quando}.`"
        >
          <PhPhoneCall :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
          <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <span class="block text-[24px] leading-8 font-bold">{{ telefone.nome }}</span>
            <span class="nota">{{ telefone.quando }}</span>
          </span>
          <span class="bloco shrink-0 rounded-md px-3 py-1 text-[30px] font-bold tabular-nums">{{ telefone.numero }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>
