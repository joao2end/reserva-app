<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { PhCheckCircle, PhDownloadSimple, PhTrash } from '@phosphor-icons/vue'
import { tamanhoLegivel, type VideoNarrado } from '../../domain/conteudo/videosNarrados'
import { servicoVideosNarrados } from '../../infrastructure/container'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'

const props = defineProps<{ licaoIds: string[] }>()
const emit = defineEmits<{ atualizou: [licaoIds: string[]] }>()
const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()

const videos = ref<VideoNarrado[]>([])
const noCelular = ref<string[]>([])
const baixando = ref(false)
const atual = ref(0)
const total = ref(0)
const fracao = ref(0)
const erro = ref('')

const faltando = computed(() => videos.value.filter((video) => !noCelular.value.includes(video.licaoId)))
const bytesFaltando = computed(() => faltando.value.reduce((soma, video) => soma + video.bytes, 0))
const bytesTotais = computed(() => videos.value.reduce((soma, video) => soma + video.bytes, 0))

async function conferir() {
  noCelular.value = await servicoVideosNarrados.quaisEstaoNoCelular(videos.value)
  emit('atualizou', noCelular.value)
}

onMounted(async () => {
  videos.value = await servicoVideosNarrados.dasLicoes(props.licaoIds)
  await conferir()
})

async function baixarTodos() {
  if (baixando.value) return
  erro.value = ''
  baixando.value = true
  fracao.value = 0
  const resultado = await servicoVideosNarrados.baixarTodos(videos.value, (progresso) => {
    atual.value = progresso.atual
    total.value = progresso.total
    fracao.value = progresso.fracao
  })
  baixando.value = false
  await conferir()
  if (resultado.falhas > 0) {
    erro.value = `${resultado.falhas === 1 ? '1 vídeo não baixou' : `${resultado.falhas} vídeos não baixaram`}. Confira a internet e toque de novo para baixar o que falta.`
    return
  }
  mostrar('Vídeos baixados. Agora eles funcionam sem internet.')
}

async function apagarTodos() {
  const sim = await perguntar({
    titulo: 'Apagar os vídeos deste curso?',
    texto: 'Eles saem do celular para liberar espaço. Você pode baixar de novo quando quiser.',
    confirmar: 'Sim, apagar',
    cancelar: 'Não, manter',
  })
  if (!sim) return
  await servicoVideosNarrados.apagarTodos(videos.value)
  await conferir()
  mostrar('Vídeos apagados do celular.')
}
</script>

<template>
  <section v-if="videos.length" class="caixa space-y-4" aria-labelledby="videos-do-curso" data-teste="baixar-videos-curso">
    <h2 id="videos-do-curso" class="titulo-2">Vídeos com narração</h2>
    <p class="font-bold" data-teste="videos-no-celular">{{ noCelular.length }} de {{ videos.length }} vídeos no celular</p>

    <template v-if="faltando.length">
      <button
        type="button"
        class="botao flex min-h-18 items-center justify-center gap-3 px-4 text-center"
        :disabled="baixando"
        data-teste="baixar-todos"
        @click="baixarTodos"
      >
        <PhDownloadSimple :size="30" weight="bold" class="shrink-0" aria-hidden="true" />
        <span v-if="baixando">Baixando {{ atual }} de {{ total }}… {{ Math.round(fracao * 100) }}%</span>
        <span v-else-if="noCelular.length">Baixar os que faltam ({{ tamanhoLegivel(bytesFaltando) }})</span>
        <span v-else>Baixar todos os vídeos ({{ tamanhoLegivel(bytesFaltando) }})</span>
      </button>
      <div v-if="baixando" class="h-4 border-2 border-tinta" role="progressbar" :aria-valuenow="Math.round(fracao * 100)" aria-valuemin="0" aria-valuemax="100">
        <div class="h-full bg-tinta" :style="{ width: `${fracao * 100}%` }" />
      </div>
      <p class="nota">Use o Wi-Fi se puder. Depois de baixados, os vídeos funcionam sem internet.</p>
      <p v-if="erro" class="font-bold" role="alert">{{ erro }}</p>
    </template>

    <template v-else>
      <p class="flex items-center gap-2 font-bold">
        <PhCheckCircle :size="28" weight="bold" aria-hidden="true" />Todos os vídeos deste curso estão no celular
      </p>
      <button type="button" class="botao-secundario flex items-center justify-center gap-3" @click="apagarTodos">
        <PhTrash :size="26" weight="bold" aria-hidden="true" />Apagar os vídeos ({{ tamanhoLegivel(bytesTotais) }})
      </button>
    </template>
  </section>
</template>
