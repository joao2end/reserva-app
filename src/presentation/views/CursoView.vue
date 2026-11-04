<script setup lang="ts">
import { computed, ref } from 'vue'
import { PhArrowLeft, PhCaretRight, PhCheck } from '@phosphor-icons/vue'
import { cursoPorId } from '../../domain/conteudo/curso'
import { usePreferencias } from '../estado/usePreferencias'
import { ICONE_CURSO } from '../icones'
import BarraProgresso from '../components/BarraProgresso.vue'
import CaixaAviso from '../components/CaixaAviso.vue'
import BaixarVideosCurso from '../components/BaixarVideosCurso.vue'

const props = defineProps<{ cursoId: string }>()
const { licoesConcluidas } = usePreferencias()

const curso = computed(() => cursoPorId(props.cursoId))
const concluidas = computed(() => curso.value?.licoes.filter((licao) => licoesConcluidas.value.includes(licao.id)).length ?? 0)
const videosNoCelular = ref<string[]>([])
const percentual = computed(() => (curso.value ? Math.round((concluidas.value / curso.value.licoes.length) * 100) : 0))
</script>

<template>
  <section v-if="curso" class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'cursos' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Todos os cursos
      </RouterLink>
      <component :is="ICONE_CURSO[curso.id]" :size="56" weight="bold" class="mt-6" aria-hidden="true" />
      <h1 class="titulo-1 mt-2">{{ curso.titulo }}</h1>
      <p class="nota">{{ curso.resumo }}</p>
    </header>

    <CaixaAviso v-if="curso.aviso" titulo="Atenção" tipo="atencao">{{ curso.aviso }}</CaixaAviso>

    <div class="space-y-2">
      <BarraProgresso :percentual="percentual" rotulo="Meu progresso neste curso" />
      <p class="font-bold" data-teste="progresso-curso">{{ concluidas }} de {{ curso.licoes.length }} lições concluídas</p>
    </div>

    <BaixarVideosCurso
      :key="curso.id"
      :licao-ids="curso.licoes.map((licao) => licao.id)"
      @atualizou="(ids) => (videosNoCelular = ids)"
    />

    <ol class="border-4 border-tinta">
      <li v-for="(licao, indice) in curso.licoes" :key="licao.id" class="border-b-2 border-tinta last:border-b-0">
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
            <template v-else>{{ indice + 1 }}</template>
          </span>
          <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <span class="block text-[22px] leading-7 font-bold">{{ licao.titulo }}</span>
            <span class="nota">
              {{ licao.minutos }} min{{ videosNoCelular.includes(licao.id) ? ' · vídeo no celular' : '' }}{{
                licoesConcluidas.includes(licao.id) ? ' · Concluída' : ''
              }}
            </span>
          </span>
          <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
        </RouterLink>
      </li>
    </ol>
  </section>

  <section v-else class="space-y-6">
    <CaixaAviso titulo="Curso não encontrado" tipo="atencao">Volte e escolha outro curso.</CaixaAviso>
    <RouterLink :to="{ name: 'cursos' }" class="botao-secundario flex items-center justify-center">Ver os cursos</RouterLink>
  </section>
</template>
