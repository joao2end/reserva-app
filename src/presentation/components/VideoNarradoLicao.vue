<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PhDownloadSimple, PhPlay, PhShareNetwork, PhSpeakerHigh, PhTrash } from '@phosphor-icons/vue'
import { duracaoLegivel, enderecoRemoto, tamanhoLegivel, type VideoNarrado } from '../../domain/conteudo/videosNarrados'
import { VOZ_NARRACAO } from '../../domain/conteudo/narracao'
import { servicoVideosNarrados } from '../../infrastructure/container'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'

const props = defineProps<{ licaoId: string; titulo: string }>()
const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()

const video = ref<VideoNarrado>()
const carregado = ref(false)
const endereco = ref<string>()
const baixando = ref(false)
const progresso = ref(0)
const noCelular = ref(false)
const erro = ref('')

onMounted(async () => {
  video.value = await servicoVideosNarrados.daLicao(props.licaoId)
  if (video.value) endereco.value = await servicoVideosNarrados.enderecoLocal(video.value)
  noCelular.value = Boolean(endereco.value)
  carregado.value = true
})

function assistirAgora() {
  if (video.value) endereco.value = enderecoRemoto(video.value)
}

async function baixar() {
  if (!video.value || baixando.value) return
  erro.value = ''
  baixando.value = true
  progresso.value = 0
  try {
    endereco.value = await servicoVideosNarrados.baixar(video.value, (fracao) => (progresso.value = fracao))
    noCelular.value = true
    mostrar('Vídeo baixado. Agora ele funciona sem internet.')
  } catch {
    erro.value = 'Não deu para baixar. Confira a internet e tente de novo.'
  } finally {
    baixando.value = false
  }
}

async function salvar() {
  if (video.value) await servicoVideosNarrados.salvarNoCelular(video.value, props.titulo).catch(() => undefined)
}

async function apagar() {
  if (!video.value) return
  const sim = await perguntar({
    titulo: 'Apagar o vídeo do celular?',
    texto: 'Ele sai do app para liberar espaço. Você pode baixar de novo quando quiser.',
    confirmar: 'Sim, apagar',
    cancelar: 'Não, manter',
  })
  if (!sim) return
  await servicoVideosNarrados.apagar(video.value)
  endereco.value = undefined
  noCelular.value = false
  mostrar('Vídeo apagado do celular.')
}
</script>

<template>
  <section v-if="video" class="space-y-4" aria-labelledby="video-narrado" data-teste="video-narrado">
    <h2 id="video-narrado" class="titulo-2 flex items-center gap-3">
      <PhSpeakerHigh :size="34" weight="bold" aria-hidden="true" />Aula em vídeo
    </h2>
    <p class="nota">{{ duracaoLegivel(video.segundos) }} · {{ tamanhoLegivel(video.bytes) }} · com voz e texto na tela</p>

    <div v-if="endereco" class="overflow-hidden border-4 border-tinta bg-tinta">
      <video class="block aspect-video w-full" :src="endereco" controls playsinline preload="metadata" :aria-label="titulo" />
    </div>
    <button v-else type="button" class="botao flex min-h-18 items-center justify-center gap-3" data-teste="assistir-agora" @click="assistirAgora">
      <PhPlay :size="30" weight="fill" aria-hidden="true" />Assistir agora (usa internet)
    </button>

    <div v-if="noCelular" class="grid gap-3">
      <p class="font-bold">Este vídeo está no celular e funciona sem internet.</p>
      <button type="button" class="botao-secundario flex items-center justify-center gap-3" @click="salvar">
        <PhShareNetwork :size="28" weight="bold" aria-hidden="true" />Salvar ou enviar o vídeo
      </button>
      <button type="button" class="botao-secundario flex items-center justify-center gap-3" @click="apagar">
        <PhTrash :size="26" weight="bold" aria-hidden="true" />Apagar do celular
      </button>
    </div>

    <template v-else>
      <button
        type="button"
        class="botao-secundario flex min-h-18 items-center justify-center gap-3"
        :disabled="baixando"
        data-teste="baixar-video"
        @click="baixar"
      >
        <PhDownloadSimple :size="30" weight="bold" aria-hidden="true" />
        {{ baixando ? `Baixando… ${Math.round(progresso * 100)}%` : `Baixar para ver sem internet (${tamanhoLegivel(video.bytes)})` }}
      </button>
      <div v-if="baixando" class="h-4 border-2 border-tinta" aria-hidden="true">
        <div class="h-full bg-tinta" :style="{ width: `${progresso * 100}%` }" />
      </div>
      <p v-if="erro" class="font-bold" role="alert">{{ erro }}</p>
    </template>

    <p class="nota">Narração: {{ VOZ_NARRACAO }}.</p>
  </section>
  <slot v-else-if="carregado" />
</template>
