<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowLeft, PhArrowRight, PhBookOpen, PhCaretDown, PhCheckCircle, PhClock, PhListNumbers, PhWarning } from '@phosphor-icons/vue'
import { licaoPorId, moduloDaLicao, nomeDoNivel, proximaLicao } from '../../domain/conteudo/curso'
import { videosYoutubeDaLicao } from '../../domain/conteudo/cursos/youtube'
import type { VideoGuia } from '../../domain/conteudo/videos'
import { usePreferencias } from '../estado/usePreferencias'
import { useAviso } from '../estado/useAviso'
import CaixaAviso from '../components/CaixaAviso.vue'
import TesteLicao from '../components/TesteLicao.vue'
import VideoAnimado from '../components/VideoAnimado.vue'
import VideoNarradoLicao from '../components/VideoNarradoLicao.vue'
import VideosYoutube from '../components/VideosYoutube.vue'

const props = defineProps<{ licaoId: string }>()
const { licoesConcluidas, concluirLicao } = usePreferencias()
const { mostrar } = useAviso()

const licao = computed(() => licaoPorId(props.licaoId))
const modulo = computed(() => moduloDaLicao(props.licaoId))
const proxima = computed(() => proximaLicao(props.licaoId))
const youtube = computed(() => videosYoutubeDaLicao(props.licaoId))
const concluida = computed(() => licoesConcluidas.value.includes(props.licaoId))
const posicao = computed(() => (modulo.value?.licoes.findIndex((item) => item.id === props.licaoId) ?? 0) + 1)

const video = computed<VideoGuia | undefined>(() =>
  licao.value ? { id: licao.value.id, secaoId: licao.value.id, titulo: 'Animação da lição', cenas: licao.value.cenas } : undefined,
)

async function aprovar() {
  if (concluida.value) return
  await concluirLicao(props.licaoId)
  mostrar('Lição concluída! Muito bem.')
}
</script>

<template>
  <article v-if="licao && modulo && video" class="space-y-8">
    <header>
      <RouterLink
        :to="{ name: 'curso', params: { cursoId: modulo.id } }"
        class="rotulo inline-flex items-center gap-2 underline underline-offset-4"
      >
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao curso
      </RouterLink>
      <p class="rotulo mt-6">{{ modulo.titulo }} · Lição {{ posicao }} de {{ modulo.licoes.length }}</p>
      <h1 class="titulo-1 mt-2">{{ licao.titulo }}</h1>
      <p class="nota flex items-center gap-2" data-teste="nivel-licao">
        <PhClock :size="22" weight="bold" aria-hidden="true" />{{ licao.minutos }} minutos · Nível {{ nomeDoNivel(licao.nivel).toLowerCase() }}
      </p>
      <p v-if="concluida" class="bloco mt-4 inline-flex items-center gap-2 px-3 py-1 font-bold" data-teste="licao-concluida">
        <PhCheckCircle :size="26" weight="bold" aria-hidden="true" />Lição concluída
      </p>
    </header>

    <p class="text-[24px] leading-9">{{ licao.objetivo }}</p>

    <VideoNarradoLicao :key="`narrado-${licao.id}`" :licao-id="licao.id" :titulo="licao.titulo">
      <VideoAnimado :key="video.id" :video="video" />
    </VideoNarradoLicao>

    <section class="space-y-3" aria-labelledby="consultar">
      <h2 id="consultar" class="titulo-2 flex items-center gap-3">
        <PhListNumbers :size="34" weight="bold" aria-hidden="true" />Para consultar
      </h2>
      <p class="nota">O mesmo conteúdo da aula, por escrito. Toque para abrir.</p>
      <details v-for="parte in licao.partes" :key="parte.titulo" class="consulta border-4 border-tinta" data-teste="parte-licao">
        <summary class="flex min-h-18 cursor-pointer items-center gap-3 p-4 text-[22px] leading-7 font-bold">
          <span class="min-w-0 flex-1">{{ parte.titulo }}</span>
          <PhCaretDown :size="26" weight="bold" class="seta shrink-0" aria-hidden="true" />
        </summary>
        <div class="space-y-4 border-t-2 border-tinta p-4">
          <p v-for="paragrafo in parte.paragrafos" :key="paragrafo">{{ paragrafo }}</p>
          <ol v-if="parte.passos" class="space-y-4">
            <li v-for="(passo, indice) in parte.passos" :key="passo" class="flex gap-4">
              <span class="bloco flex size-10 shrink-0 items-center justify-center text-[22px] font-bold" aria-hidden="true">
                {{ indice + 1 }}
              </span>
              <span class="min-w-0 flex-1 pt-1">{{ passo }}</span>
            </li>
          </ol>
        </div>
      </details>
      <details class="consulta border-4 border-tinta" data-teste="erros-licao">
        <summary class="flex min-h-18 cursor-pointer items-center gap-3 p-4 text-[22px] leading-7 font-bold">
          <PhWarning :size="28" weight="bold" class="shrink-0" aria-hidden="true" />
          <span class="min-w-0 flex-1">Erros comuns</span>
          <PhCaretDown :size="26" weight="bold" class="seta shrink-0" aria-hidden="true" />
        </summary>
        <ul class="space-y-3 border-t-2 border-tinta p-4">
          <li v-for="erro in licao.erros" :key="erro" class="flex gap-3">
            <span class="mt-3 size-3 shrink-0 bg-tinta" aria-hidden="true" />
            <span>{{ erro }}</span>
          </li>
        </ul>
      </details>
    </section>

    <section class="space-y-4" aria-labelledby="teste-rapido">
      <h2 id="teste-rapido" class="titulo-2">Teste rápido</h2>
      <p class="nota">Acerte todas para concluir a lição.</p>
      <TesteLicao :key="licao.id" :perguntas="licao.teste" :licao-id="licao.id" @aprovado="aprovar" />
    </section>

    <VideosYoutube v-if="youtube.length" :videos="youtube" />

    <RouterLink
      v-if="proxima"
      :to="{ name: 'licao', params: { licaoId: proxima.id } }"
      class="botao flex min-h-18 items-center justify-center gap-3 px-4 text-center"
    >
      <span class="min-w-0">Próxima lição: {{ proxima.titulo }}</span>
      <PhArrowRight :size="28" weight="bold" class="shrink-0" aria-hidden="true" />
    </RouterLink>
    <RouterLink v-else :to="{ name: 'curso', params: { cursoId: modulo.id } }" class="botao flex items-center justify-center gap-3">
      <PhBookOpen :size="28" weight="bold" aria-hidden="true" />Voltar ao curso
    </RouterLink>

    <section class="space-y-2" aria-labelledby="fontes">
      <h2 id="fontes" class="rotulo">Fontes</h2>
      <ul class="nota space-y-1">
        <li v-for="fonte in licao.fontes" :key="fonte">{{ fonte }}</li>
      </ul>
    </section>
  </article>

  <section v-else class="space-y-6">
    <CaixaAviso titulo="Lição não encontrada" tipo="atencao">Volte aos cursos e escolha outra lição.</CaixaAviso>
    <RouterLink :to="{ name: 'cursos' }" class="botao-secundario flex items-center justify-center">Ver os cursos</RouterLink>
  </section>
</template>

<style scoped>
.consulta summary {
  list-style: none;
}

.consulta summary::-webkit-details-marker {
  display: none;
}

.consulta[open] .seta {
  transform: rotate(180deg);
}
</style>
