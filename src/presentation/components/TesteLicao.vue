<script setup lang="ts">
import { computed, ref } from 'vue'
import { PhCheckCircle, PhXCircle } from '@phosphor-icons/vue'
import type { PerguntaLicao } from '../../domain/conteudo/curso'

const props = defineProps<{ perguntas: PerguntaLicao[]; licaoId: string }>()
const emit = defineEmits<{ aprovado: [] }>()

const escolhas = ref<(number | null)[]>(props.perguntas.map(() => null))

const acertos = computed(() => props.perguntas.filter((pergunta, indice) => escolhas.value[indice] === pergunta.correta).length)

function escolher(indicePergunta: number, indiceOpcao: number) {
  escolhas.value[indicePergunta] = indiceOpcao
  if (acertos.value === props.perguntas.length) emit('aprovado')
}
</script>

<template>
  <div class="space-y-6">
    <p class="bloco p-4 text-[22px] font-bold" role="status" data-teste="placar">
      {{ acertos }} de {{ perguntas.length }} certas
    </p>
    <fieldset v-for="(pergunta, indicePergunta) in perguntas" :key="pergunta.pergunta" class="caixa space-y-4" data-teste="pergunta">
      <legend class="sr-only">Pergunta {{ indicePergunta + 1 }}</legend>
      <p class="rotulo">Pergunta {{ indicePergunta + 1 }} de {{ perguntas.length }}</p>
      <p class="text-[24px] leading-8 font-bold">{{ pergunta.pergunta }}</p>
      <div class="space-y-3">
        <label
          v-for="(opcao, indiceOpcao) in pergunta.opcoes"
          :key="opcao"
          class="flex min-h-16 cursor-pointer items-center gap-4 rounded-md border-4 border-tinta px-4 py-2"
          :class="{ bloco: escolhas[indicePergunta] === indiceOpcao }"
        >
          <input
            type="radio"
            class="size-7 shrink-0 accent-current"
            :name="`${licaoId}-${indicePergunta}`"
            :checked="escolhas[indicePergunta] === indiceOpcao"
            @change="escolher(indicePergunta, indiceOpcao)"
          />
          <span class="min-w-0 flex-1 font-bold [overflow-wrap:anywhere]">{{ opcao }}</span>
        </label>
      </div>
      <div v-if="escolhas[indicePergunta] !== null" class="flex gap-3" aria-live="polite" data-teste="resposta">
        <component
          :is="escolhas[indicePergunta] === pergunta.correta ? PhCheckCircle : PhXCircle"
          :size="32"
          weight="bold"
          class="shrink-0"
          aria-hidden="true"
        />
        <p>
          <strong class="block">{{ escolhas[indicePergunta] === pergunta.correta ? 'Certo!' : 'Ainda não. Tente outra.' }}</strong>
          <span v-if="escolhas[indicePergunta] === pergunta.correta" class="block">{{ pergunta.explicacao }}</span>
        </p>
      </div>
    </fieldset>
  </div>
</template>
