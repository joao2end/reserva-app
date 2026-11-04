<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowLeft, PhCaretRight, PhCheck, PhGraduationCap } from '@phosphor-icons/vue'
import { CURSO, LICOES } from '../../domain/conteudo/curso'
import { usePreferencias } from '../estado/usePreferencias'
import BarraProgresso from '../components/BarraProgresso.vue'

const { licoesConcluidas } = usePreferencias()

const concluidas = computed(() => LICOES.filter((licao) => licoesConcluidas.value.includes(licao.id)).length)
const percentual = computed(() => Math.round((concluidas.value / LICOES.length) * 100))
</script>

<template>
  <section class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'guia' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao guia
      </RouterLink>
      <PhGraduationCap :size="56" weight="bold" class="mt-6" aria-hidden="true" />
      <h1 class="titulo-1 mt-2">Curso de sobrevivência</h1>
      <p class="nota">Cada lição tem animação, passo a passo e um teste rápido no fim. O progresso fica salvo no celular.</p>
    </header>

    <div class="space-y-2">
      <BarraProgresso :percentual="percentual" rotulo="Meu progresso" />
      <p class="font-bold" data-teste="progresso-curso">{{ concluidas }} de {{ LICOES.length }} lições concluídas</p>
    </div>

    <section v-for="(modulo, indiceModulo) in CURSO" :key="modulo.id" class="space-y-4" :aria-labelledby="`modulo-${modulo.id}`">
      <div>
        <p class="rotulo">Módulo {{ indiceModulo + 1 }}</p>
        <h2 :id="`modulo-${modulo.id}`" class="titulo-2">{{ modulo.titulo }}</h2>
        <p class="nota">{{ modulo.resumo }}</p>
      </div>
      <ol class="border-4 border-tinta">
        <li v-for="(licao, indiceLicao) in modulo.licoes" :key="licao.id" class="border-b-2 border-tinta last:border-b-0">
          <RouterLink
            :to="{ name: 'licao', params: { licaoId: licao.id } }"
            class="flex min-h-20 items-center gap-4 p-4"
            :data-teste="`licao-${licao.id}`"
          >
            <span
              class="flex size-12 shrink-0 items-center justify-center border-4 border-tinta text-[24px] font-bold"
              :class="{ bloco: licoesConcluidas.includes(licao.id) }"
              aria-hidden="true"
            >
              <PhCheck v-if="licoesConcluidas.includes(licao.id)" :size="28" weight="bold" />
              <template v-else>{{ indiceLicao + 1 }}</template>
            </span>
            <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
              <span class="block text-[22px] leading-7 font-bold">{{ licao.titulo }}</span>
              <span class="nota">
                {{ licao.minutos }} min{{ licoesConcluidas.includes(licao.id) ? ' · Concluída' : '' }}
              </span>
            </span>
            <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
          </RouterLink>
        </li>
      </ol>
    </section>
  </section>
</template>
