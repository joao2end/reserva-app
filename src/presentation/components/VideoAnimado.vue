<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowCounterClockwise, PhCaretLeft, PhCaretRight, PhFilmStrip, PhPause, PhPlay } from '@phosphor-icons/vue'
import { duracaoTotal, type VideoGuia } from '../../domain/conteudo/videos'
import { useReprodutor } from '../estado/useReprodutor'
import CenaDesenhada from './CenaDesenhada.vue'
import IlustracaoCena from './IlustracaoCena.vue'

const props = defineProps<{ video: VideoGuia }>()
const { indice, estado, cena, ehPrimeira, ehUltima, rodada, alternar, proxima, anterior, progressoDaCena } =
  useReprodutor(props.video)

const botaoPrincipal = computed(() => {
  if (estado.value === 'tocando') return { texto: 'Pausar', icone: PhPause }
  if (estado.value === 'pausado') return { texto: 'Continuar', icone: PhPlay }
  if (estado.value === 'fim') return { texto: 'Assistir de novo', icone: PhArrowCounterClockwise }
  return { texto: 'Assistir o vídeo', icone: PhPlay }
})

const modo = computed(() => {
  if (estado.value === 'tocando') return 'animando'
  if (estado.value === 'pausado') return 'pausado'
  return 'estatico'
})
</script>

<template>
  <section class="space-y-4" :aria-label="`Vídeo: ${video.titulo}`">
    <p class="rotulo flex items-center gap-2">
      <PhFilmStrip :size="24" weight="bold" aria-hidden="true" />Vídeo de {{ duracaoTotal(video) }} segundos
    </p>
    <h2 class="titulo-2">{{ video.titulo }}</h2>

    <div class="border-4 border-tinta">
      <div class="relative">
        <Transition name="troca-cena">
          <CenaDesenhada
            v-if="cena.desenho"
            :key="rodada"
            :cena="cena.desenho"
            :modo="modo"
            :descricao="`${cena.titulo}. ${cena.texto}`"
          />
          <IlustracaoCena v-else :key="rodada" :ilustracao="cena.ilustracao" :modo="modo" :descricao="`${cena.titulo}. ${cena.texto}`" />
        </Transition>
        <button
          v-if="estado === 'parado'"
          type="button"
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-papel/85 font-bold text-[26px]"
          @click="alternar"
        >
          <span class="flex size-28 items-center justify-center rounded-full bg-tinta text-papel">
            <PhPlay :size="56" weight="fill" aria-hidden="true" />
          </span>
          Assistir o vídeo
        </button>
      </div>

      <div class="flex gap-2 border-t-4 border-tinta px-4 pt-4" aria-hidden="true">
        <div v-for="(item, posicao) in video.cenas" :key="item.titulo" class="h-3 flex-1 border-2 border-tinta">
          <div class="h-full bg-tinta" :style="{ width: `${progressoDaCena(posicao) * 100}%` }" />
        </div>
      </div>

      <div class="space-y-2 p-4" aria-live="polite">
        <p class="rotulo">Parte {{ indice + 1 }} de {{ video.cenas.length }}</p>
        <p class="text-[28px] leading-9 font-bold">{{ cena.titulo }}</p>
        <p>{{ cena.texto }}</p>
      </div>
    </div>

    <button type="button" class="botao flex items-center justify-center gap-3" @click="alternar">
      <component :is="botaoPrincipal.icone" :size="28" weight="bold" aria-hidden="true" />{{ botaoPrincipal.texto }}
    </button>
    <div class="grid grid-cols-2 gap-3">
      <button
        type="button"
        class="botao-secundario flex items-center justify-center gap-2 disabled:opacity-40"
        :disabled="ehPrimeira"
        @click="anterior"
      >
        <PhCaretLeft :size="24" weight="bold" aria-hidden="true" />Voltar
      </button>
      <button
        type="button"
        class="botao-secundario flex items-center justify-center gap-2 disabled:opacity-40"
        :disabled="ehUltima"
        @click="proxima"
      >
        Avançar<PhCaretRight :size="24" weight="bold" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.troca-cena-enter-active,
.troca-cena-leave-active {
  transition: opacity 0.45s ease;
}

.troca-cena-leave-active {
  position: absolute;
  inset: 0;
}

.troca-cena-enter-from,
.troca-cena-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .troca-cena-enter-active,
  .troca-cena-leave-active {
    transition: none;
  }
}
</style>
