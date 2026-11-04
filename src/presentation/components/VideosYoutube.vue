<script setup lang="ts">
import { PhArrowSquareOut, PhSealCheck, PhYoutubeLogo } from '@phosphor-icons/vue'
import { enderecoYoutube, type VideoYoutube } from '../../domain/conteudo/cursos/youtube'

defineProps<{ videos: VideoYoutube[] }>()
</script>

<template>
  <section class="space-y-4" aria-labelledby="no-youtube" data-teste="videos-youtube">
    <h2 id="no-youtube" class="titulo-2 flex items-center gap-3">
      <PhYoutubeLogo :size="36" weight="bold" aria-hidden="true" />Mais vídeos no YouTube
    </h2>
    <ul class="space-y-3">
      <li v-for="video in videos" :key="video.id">
        <a
          :href="enderecoYoutube(video)"
          target="_blank"
          rel="noopener noreferrer"
          class="flex min-h-20 items-center gap-4 border-4 border-tinta p-4"
          :data-teste="`youtube-${video.id}`"
        >
          <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <span class="block text-[22px] leading-7 font-bold">{{ video.titulo }}</span>
            <span class="nota flex items-center gap-1">
              <PhSealCheck v-if="video.oficial" :size="20" weight="bold" aria-hidden="true" />{{ video.canal
              }}{{ video.oficial ? ' · canal oficial' : '' }}
            </span>
          </span>
          <PhArrowSquareOut :size="28" weight="bold" class="shrink-0" aria-hidden="true" />
        </a>
      </li>
    </ul>
    <p class="nota">
      Abre no app do YouTube e precisa de internet. Para ver depois sem internet, toque em <strong>Baixar</strong> embaixo do
      vídeo, no próprio app do YouTube. Esses vídeos são de outros canais: se algo for diferente do que está nesta lição, siga a
      lição.
    </p>
  </section>
</template>
