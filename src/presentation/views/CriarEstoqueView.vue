<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhArrowLeft, PhArrowRight, PhCheck, PhTrash, PhUsers, PhCalendarBlank, PhBowlFood, PhClipboardText } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'
import { CATALOGO, CATEGORIAS, ITENS_PADRAO } from '../../domain/conteudo/catalogo'
import { litrosDeAguaPorDia, metaDoItem } from '../../domain/regras/calculo'
import { LIMITE_NOME, LIMITE_PESSOAS } from '../../domain/regras/validacao'
import type { ConfiguracaoEstoque } from '../../domain/entidades/tipos'
import { formatarQuantidade, plural } from '../formato'
import CampoNumero from '../components/CampoNumero.vue'
import CabecalhoCategoria from '../components/CabecalhoCategoria.vue'
import MensagemErro from '../components/MensagemErro.vue'

const router = useRouter()
const { configuracao, definirEstoque, apagarTudo, limparErro } = useEstoque()
const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()

const editando = Boolean(configuracao.value)
const nome = ref(configuracao.value?.nome ?? 'Minha casa')
const adultos = ref(configuracao.value?.adultos ?? 2)
const criancas = ref(configuracao.value?.criancas ?? 0)
const dias = ref(configuracao.value?.dias ?? 14)
const selecionados = ref<string[]>([...(configuracao.value?.itensSelecionados ?? ITENS_PADRAO)])

const passos = [
  { titulo: 'Quantas pessoas vão comer?', icone: PhUsers },
  { titulo: 'Para quanto tempo?', icone: PhCalendarBlank },
  { titulo: 'O que vocês comem?', icone: PhBowlFood },
  { titulo: 'Confira e salve', icone: PhClipboardText },
]
const passo = ref(0)
const problemaDoPasso = ref<string | null>(null)

const opcoesDias = [
  { valor: 14, rotulo: '2 semanas', dica: 'Bom para começar' },
  { valor: 30, rotulo: '1 mês', dica: '' },
  { valor: 60, rotulo: '2 meses', dica: '' },
  { valor: 90, rotulo: '3 meses', dica: 'Mais segurança' },
]

const simulacao = computed<ConfiguracaoEstoque>(() => ({
  nome: nome.value,
  adultos: Number(adultos.value) || 0,
  criancas: Number(criancas.value) || 0,
  dias: dias.value,
  itensSelecionados: selecionados.value,
  criadoEm: '',
}))

const grupos = CATEGORIAS.map((categoria) => ({
  categoria,
  itens: CATALOGO.filter((item) => item.categoria === categoria.id),
}))

const rotuloDias = computed(() => opcoesDias.find((opcao) => opcao.valor === dias.value)?.rotulo ?? `${dias.value} dias`)
const litrosTotais = computed(() => litrosDeAguaPorDia(simulacao.value) * dias.value)

function validarPasso(): string | null {
  if (passo.value === 0 && simulacao.value.adultos + simulacao.value.criancas === 0) return 'Coloque pelo menos uma pessoa.'
  if (passo.value === 2 && selecionados.value.length === 0) return 'Marque pelo menos um alimento.'
  return null
}

function avancar() {
  problemaDoPasso.value = validarPasso()
  if (problemaDoPasso.value) return
  passo.value += 1
  window.scrollTo({ top: 0 })
}

function voltar() {
  problemaDoPasso.value = null
  limparErro()
  if (passo.value > 0) passo.value -= 1
  else if (window.history.state?.back) router.back()
  else router.push({ name: 'inicio' })
  window.scrollTo({ top: 0 })
}

async function salvar() {
  const sucesso = await definirEstoque({
    nome: nome.value,
    adultos: adultos.value,
    criancas: criancas.value,
    dias: dias.value,
    itensSelecionados: selecionados.value,
  })
  if (!sucesso) return
  mostrar(editando ? 'Alterações salvas.' : 'Estoque criado. Veja abaixo o que comprar.')
  router.push({ name: editando ? 'inicio' : 'compras' })
}

async function recomecar() {
  const confirmado = await perguntar({
    titulo: 'Apagar tudo?',
    texto: 'O estoque, os pacotes guardados e os locais de compra serão apagados. Isso não pode ser desfeito.',
    confirmar: 'Sim, apagar tudo',
    cancelar: 'Não, manter',
  })
  if (confirmado && (await apagarTudo())) {
    mostrar('Tudo foi apagado.')
    router.push({ name: 'inicio' })
  }
}
</script>

<template>
  <section class="space-y-8">
    <header class="space-y-4">
      <p class="rotulo" data-teste="passo">Passo {{ passo + 1 }} de {{ passos.length }}</p>
      <div class="grid grid-cols-4 gap-2" aria-hidden="true">
        <span v-for="(_, indice) in passos" :key="indice" class="h-3 border-2 border-tinta" :class="{ 'bg-tinta': indice <= passo }" />
      </div>
      <component :is="passos[passo].icone" :size="56" weight="bold" aria-hidden="true" />
      <h1 class="titulo-1">{{ passos[passo].titulo }}</h1>
    </header>

    <div v-if="passo === 0" class="space-y-6">
      <CampoNumero v-model="adultos" rotulo="Adultos" :maximo="LIMITE_PESSOAS" />
      <CampoNumero v-model="criancas" rotulo="Crianças até 12 anos" :maximo="LIMITE_PESSOAS" />
      <p class="nota">Toque em + ou − para mudar o número.</p>
    </div>

    <fieldset v-else-if="passo === 1" class="space-y-3">
      <legend class="sr-only">Para quanto tempo?</legend>
      <label
        v-for="opcao in opcoesDias"
        :key="opcao.valor"
        class="flex min-h-20 cursor-pointer items-center gap-4 border-4 border-tinta px-5 has-[:focus-visible]:outline-4"
        :class="{ bloco: dias === opcao.valor }"
      >
        <input v-model="dias" type="radio" name="dias" class="sr-only" :value="opcao.valor" />
        <span class="flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-current" aria-hidden="true">
          <span v-if="dias === opcao.valor" class="size-3 rounded-full bg-current" />
        </span>
        <span class="flex-1">
          <span class="block text-[26px] leading-8 font-bold">{{ opcao.rotulo }}</span>
          <span v-if="opcao.dica" class="block text-[18px]">{{ opcao.dica }}</span>
        </span>
      </label>
    </fieldset>

    <div v-else-if="passo === 2" class="space-y-6">
      <p>Deixe marcado só o que a casa costuma comer. Já marcamos os mais comuns.</p>
      <fieldset v-for="grupo in grupos" :key="grupo.categoria.id">
        <legend class="w-full"><CabecalhoCategoria :categoria="grupo.categoria" /></legend>
        <ul class="border-4 border-t-0 border-tinta">
          <li v-for="item in grupo.itens" :key="item.id" class="border-b-2 border-tinta last:border-b-0">
            <label class="flex min-h-18 cursor-pointer items-center gap-4 px-4 py-2">
              <input v-model="selecionados" type="checkbox" :value="item.id" class="size-8 shrink-0 accent-current" />
              <span class="flex-1">
                <span class="block font-bold">{{ item.nome }}</span>
                <span class="nota">Precisa de {{ formatarQuantidade(metaDoItem(item, simulacao), item.unidade) }}</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>
    </div>

    <div v-else class="space-y-6">
      <label class="block">
        <span class="rotulo mb-2 block">Nome do estoque</span>
        <input v-model="nome" class="campo" type="text" :maxlength="LIMITE_NOME" autocomplete="off" />
      </label>
      <dl class="border-4 border-tinta">
        <div class="flex justify-between gap-4 border-b-2 border-tinta p-4">
          <dt class="rotulo self-center">Pessoas</dt>
          <dd class="text-right font-bold">
            {{ plural(simulacao.adultos, 'adulto', 'adultos') }}<template v-if="simulacao.criancas">, {{ plural(simulacao.criancas, 'criança', 'crianças') }}</template>
          </dd>
        </div>
        <div class="flex justify-between gap-4 border-b-2 border-tinta p-4">
          <dt class="rotulo self-center">Tempo</dt>
          <dd class="font-bold">{{ rotuloDias }}</dd>
        </div>
        <div class="flex justify-between gap-4 border-b-2 border-tinta p-4">
          <dt class="rotulo self-center">Alimentos</dt>
          <dd class="font-bold">{{ selecionados.length }}</dd>
        </div>
        <div class="bloco flex justify-between gap-4 p-4">
          <dt class="rotulo self-center">Água no total</dt>
          <dd class="font-bold tabular-nums">{{ litrosTotais.toLocaleString('pt-BR') }} litros</dd>
        </div>
      </dl>
    </div>

    <div v-if="problemaDoPasso" class="caixa bloco font-bold" role="alert">{{ problemaDoPasso }}</div>
    <MensagemErro />

    <div class="space-y-3">
      <button v-if="passo < passos.length - 1" type="button" class="botao flex items-center justify-center gap-3" @click="avancar">
        Próximo<PhArrowRight :size="28" weight="bold" aria-hidden="true" />
      </button>
      <button v-else type="button" class="botao flex items-center justify-center gap-3" @click="salvar">
        <PhCheck :size="28" weight="bold" aria-hidden="true" />{{ editando ? 'Salvar alterações' : 'Criar meu estoque' }}
      </button>
      <button type="button" class="botao-secundario flex items-center justify-center gap-3" @click="voltar">
        <PhArrowLeft :size="28" weight="bold" aria-hidden="true" />{{ passo === 0 ? 'Sair' : 'Voltar' }}
      </button>
    </div>

    <button v-if="editando && passo === passos.length - 1" type="button" class="botao-secundario flex items-center justify-center gap-3" @click="recomecar">
      <PhTrash :size="28" weight="bold" aria-hidden="true" />Apagar tudo e recomeçar
    </button>
  </section>
</template>
