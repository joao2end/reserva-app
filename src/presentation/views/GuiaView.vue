<script setup lang="ts">
import { PhCaretRight, PhFilmStrip, PhMapPin } from '@phosphor-icons/vue'
import { GUIA } from '../../domain/conteudo/guia'
import { videoDaSecao } from '../../domain/conteudo/videos'
import { ICONE_SECAO_GUIA } from '../icones'
</script>

<template>
  <section class="space-y-8">
    <header>
      <p class="rotulo">Guia</p>
      <h1 class="titulo-1">Como se preparar</h1>
    </header>

    <ul class="border-4 border-tinta">
      <li v-for="secao in GUIA" :key="secao.id" class="border-b-2 border-tinta">
        <RouterLink :to="{ name: 'secao', params: { secaoId: secao.id } }" class="flex min-h-20 items-center gap-4 p-4">
          <component :is="ICONE_SECAO_GUIA[secao.id]" :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
          <span class="flex-1">
            <span class="block text-[24px] font-bold">{{ secao.titulo }}</span>
            <span class="nota">{{ secao.resumo }}</span>
            <span v-if="videoDaSecao(secao.id)" class="rotulo mt-2 flex items-center gap-2">
              <PhFilmStrip :size="22" weight="bold" aria-hidden="true" />Tem vídeo
            </span>
          </span>
          <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'locais' }" class="flex min-h-20 items-center gap-4 p-4">
          <PhMapPin :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
          <span class="flex-1">
            <span class="block text-[24px] font-bold">Meus locais de compra</span>
            <span class="nota">Anote onde você compra mais barato.</span>
          </span>
          <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
