<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import { GUIA } from '../../domain/conteudo/guia'
import { videoDaSecao } from '../../domain/conteudo/videos'
import { ICONE_SECAO_GUIA } from '../icones'
import CaixaAviso from '../components/CaixaAviso.vue'
import VideoAnimado from '../components/VideoAnimado.vue'

const props = defineProps<{ secaoId: string }>()
const secao = computed(() => GUIA.find((candidata) => candidata.id === props.secaoId))
const video = computed(() => videoDaSecao(props.secaoId))
</script>

<template>
  <section v-if="secao" class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'guia' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao guia
      </RouterLink>
      <component :is="ICONE_SECAO_GUIA[secao.id]" :size="56" weight="bold" class="mt-6" aria-hidden="true" />
      <h1 class="titulo-1 mt-2">{{ secao.titulo }}</h1>
      <p class="nota">{{ secao.resumo }}</p>
    </header>

    <CaixaAviso v-if="secao.aviso" :titulo="secao.aviso.titulo" :tipo="secao.aviso.critico ? 'critico' : 'atencao'">
      {{ secao.aviso.texto }}
    </CaixaAviso>

    <VideoAnimado v-if="video" :key="video.id" :video="video" />

    <section v-for="bloco in secao.blocos" :key="bloco.titulo" class="space-y-4">
      <h2 class="titulo-2">{{ bloco.titulo }}</h2>
      <ul class="space-y-3">
        <li v-for="texto in bloco.itens" :key="texto" class="flex gap-3">
          <span class="mt-3 size-3 shrink-0 bg-tinta" aria-hidden="true" />
          <span>{{ texto }}</span>
        </li>
      </ul>
    </section>
  </section>

  <section v-else class="space-y-6">
    <CaixaAviso titulo="Seção não encontrada" tipo="atencao">Volte ao guia e escolha outro tema.</CaixaAviso>
    <RouterLink :to="{ name: 'guia' }" class="botao-secundario flex items-center justify-center">Voltar ao guia</RouterLink>
  </section>
</template>
