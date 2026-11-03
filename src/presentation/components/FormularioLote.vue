<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PhCheck } from '@phosphor-icons/vue'
import type { ItemCatalogo } from '../../domain/entidades/tipos'
import type { DadosCompra } from '../../application/casos-de-uso/ServicoEstoque'
import { validadeSugerida } from '../../domain/regras/calculo'
import { dataIso } from '../../domain/regras/datas'
import { useEstoque } from '../estado/useEstoque'
import CampoNumero from './CampoNumero.vue'
import CampoMesAno from './CampoMesAno.vue'
import MensagemErro from './MensagemErro.vue'

const props = defineProps<{ item: ItemCatalogo; quantidadeInicial: number; textoBotao: string }>()
const emit = defineEmits<{ salvar: [dados: DadosCompra]; cancelar: [] }>()

const { hoje, limparErro } = useEstoque()
const dataDeHoje = dataIso(hoje())

const quantidade = ref(props.quantidadeInicial)
const compradoHoje = ref(true)
const outroDia = ref(dataDeHoje)
const compradoEm = computed(() => (compradoHoje.value ? dataDeHoje : outroDia.value))
const validade = ref(validadeSugerida(props.item, dataDeHoje))

watch(compradoEm, (data) => {
  if (data) validade.value = validadeSugerida(props.item, data)
})

const passo = props.item.unidade === 'kg' ? 0.5 : 1
const nomeUnidade = { kg: 'quilos', L: 'litros', un: 'unidades' }[props.item.unidade]

function cancelar() {
  limparErro()
  emit('cancelar')
}

function salvar() {
  emit('salvar', {
    itemId: props.item.id,
    quantidade: Number(quantidade.value),
    compradoEm: compradoEm.value,
    validade: validade.value,
  })
}
</script>

<template>
  <form class="caixa space-y-6" novalidate @submit.prevent="salvar">
    <CampoNumero v-model="quantidade" :rotulo="`Quantos ${nomeUnidade}?`" :passo="passo" :maximo="9999" />

    <fieldset>
      <legend class="rotulo mb-2">Quando comprou?</legend>
      <div class="grid grid-cols-2 gap-3">
        <label class="flex min-h-16 cursor-pointer items-center justify-center border-4 border-tinta font-bold has-[:focus-visible]:outline-4" :class="{ bloco: compradoHoje }">
          <input v-model="compradoHoje" type="radio" class="sr-only" :value="true" />Hoje
        </label>
        <label class="flex min-h-16 cursor-pointer items-center justify-center border-4 border-tinta font-bold has-[:focus-visible]:outline-4" :class="{ bloco: !compradoHoje }">
          <input v-model="compradoHoje" type="radio" class="sr-only" :value="false" />Outro dia
        </label>
      </div>
      <label v-if="!compradoHoje" class="mt-3 block">
        <span class="nota mb-1 block">Data da compra</span>
        <input v-model="outroDia" class="campo" type="date" :max="dataDeHoje" />
      </label>
    </fieldset>

    <div>
      <CampoMesAno v-model="validade" rotulo="Vence quando?" :ano-inicial="hoje().getFullYear()" />
      <p class="nota mt-2">Já preenchemos com o prazo comum ({{ item.validadeMeses }} meses). Confira na embalagem.</p>
    </div>

    <MensagemErro />
    <div class="space-y-3">
      <button type="submit" class="botao flex items-center justify-center gap-3">
        <PhCheck :size="28" weight="bold" aria-hidden="true" />{{ textoBotao }}
      </button>
      <button type="button" class="botao-secundario" @click="cancelar">Cancelar</button>
    </div>
  </form>
</template>
