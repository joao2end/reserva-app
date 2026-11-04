<script setup lang="ts">
import { computed } from 'vue'
import { PhCaretRight, PhGraduationCap } from '@phosphor-icons/vue'
import { AREAS_CURSO, LICOES, cursosDaArea, type ModuloCurso } from '../../domain/conteudo/curso'
import { usePreferencias } from '../estado/usePreferencias'
import { ICONE_CURSO } from '../icones'
import BarraProgresso from '../components/BarraProgresso.vue'

const { licoesConcluidas } = usePreferencias()

const concluidas = computed(() => LICOES.filter((licao) => licoesConcluidas.value.includes(licao.id)).length)
const percentual = computed(() => Math.round((concluidas.value / LICOES.length) * 100))

const areas = AREAS_CURSO.map((area) => ({ ...area, cursos: cursosDaArea(area.id) }))

function feitasNoCurso(curso: ModuloCurso): number {
  return curso.licoes.filter((licao) => licoesConcluidas.value.includes(licao.id)).length
}
</script>

<template>
  <section class="space-y-10">
    <header>
      <PhGraduationCap :size="56" weight="bold" aria-hidden="true" />
      <p class="rotulo mt-2">Cursos</p>
      <h1 class="titulo-1">Aprenda a fazer</h1>
      <p class="nota">Cada lição tem animação, vídeo, passo a passo e um teste rápido. Funciona sem internet.</p>
    </header>

    <div class="space-y-2">
      <BarraProgresso :percentual="percentual" rotulo="Meu progresso" />
      <p class="font-bold" data-teste="progresso-cursos">{{ concluidas }} de {{ LICOES.length }} lições concluídas</p>
    </div>

    <section v-for="area in areas" :key="area.id" class="space-y-4" :aria-labelledby="`area-${area.id}`">
      <div>
        <h2 :id="`area-${area.id}`" class="titulo-2">{{ area.titulo }}</h2>
        <p class="nota">{{ area.resumo }}</p>
      </div>
      <ul class="space-y-3">
        <li v-for="curso in area.cursos" :key="curso.id">
          <RouterLink
            :to="{ name: 'curso', params: { cursoId: curso.id } }"
            class="flex min-h-28 items-center gap-4 border-4 border-tinta p-4"
            :data-teste="`curso-${curso.id}`"
          >
            <span class="flex size-16 shrink-0 items-center justify-center bg-tinta text-papel" aria-hidden="true">
              <component :is="ICONE_CURSO[curso.id]" :size="40" weight="bold" />
            </span>
            <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
              <span class="block text-[26px] leading-8 font-bold">{{ curso.titulo }}</span>
              <span class="block text-[18px] leading-6">{{ curso.resumo }}</span>
              <span class="mt-1 block text-[18px] font-bold">
                {{ feitasNoCurso(curso) }} de {{ curso.licoes.length }} lições
              </span>
            </span>
            <PhCaretRight :size="28" weight="bold" class="shrink-0" aria-hidden="true" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </section>
</template>
