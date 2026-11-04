<script setup lang="ts">
import { ref } from 'vue'
import { PhVideoCamera } from '@phosphor-icons/vue'
import type { VideoReal } from '../../domain/conteudo/curso'

defineProps<{ video: VideoReal }>()

const indisponivel = ref(false)
</script>

<template>
  <figure v-if="!indisponivel" class="space-y-3" data-teste="video-real">
    <div class="overflow-hidden border-4 border-tinta bg-tinta">
      <video
        class="block aspect-video w-full object-cover"
        :src="video.arquivo"
        controls
        playsinline
        muted
        loop
        preload="none"
        :aria-label="video.titulo"
        @error="indisponivel = true"
      />
    </div>
    <figcaption class="space-y-1">
      <p class="flex items-center gap-2 text-[22px] leading-7 font-bold">
        <PhVideoCamera :size="26" weight="bold" class="shrink-0" aria-hidden="true" />{{ video.titulo }}
      </p>
      <p>{{ video.legenda }}</p>
      <p class="nota">Vídeo: {{ video.autor }} · {{ video.licenca }}</p>
    </figcaption>
  </figure>
</template>
