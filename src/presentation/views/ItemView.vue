<script setup lang="ts">
import { computed, ref } from 'vue'
import { PhArrowLeft, PhCalendarBlank, PhCheck, PhClockCountdown, PhForkKnife, PhPlus, PhStorefront, PhThermometer, PhTrash } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'
import { detalheDoItem } from '../../application/consultas/consultas'
import { DIAS_ALERTA_VALIDADE } from '../../domain/regras/calculo'
import type { DadosCompra } from '../../application/casos-de-uso/ServicoEstoque'
import type { Lote } from '../../domain/entidades/tipos'
import { formatarData, formatarMesAno, formatarPrazo, formatarQuantidade } from '../formato'
import FormularioLote from '../components/FormularioLote.vue'
import CaixaAviso from '../components/CaixaAviso.vue'
import CampoNumero from '../components/CampoNumero.vue'
import MensagemErro from '../components/MensagemErro.vue'

const props = defineProps<{ itemId: string }>()
const { estado, hoje, registrarCompra, consumir, descartar, limparErro } = useEstoque()
const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()

const detalhe = computed(() => detalheDoItem(estado.value, props.itemId, hoje()))
const passoConsumo = computed(() => (detalhe.value?.item.unidade === 'kg' ? 0.5 : 1))

const adicionando = ref(false)
const consumindo = ref<string | null>(null)
const quantidadeConsumo = ref(1)

function quantidade(valor: number): string {
  return detalhe.value ? formatarQuantidade(valor, detalhe.value.item.unidade) : ''
}

async function registrar(dados: DadosCompra) {
  if (!(await registrarCompra(dados))) return
  adicionando.value = false
  mostrar(`Guardado: ${quantidade(dados.quantidade)} de ${detalhe.value?.item.nome}.`)
}

function iniciarConsumo(lote: Lote) {
  limparErro()
  consumindo.value = lote.id
  quantidadeConsumo.value = Math.min(lote.quantidade, passoConsumo.value)
}

async function confirmarConsumo(lote: Lote) {
  const usado = Math.min(Number(quantidadeConsumo.value), lote.quantidade)
  if (!(await consumir(lote.id, usado))) return
  consumindo.value = null
  mostrar(`Anotado: usou ${quantidade(usado)}.`)
}

async function confirmarDescarte(lote: Lote) {
  if (!detalhe.value) return
  const confirmado = await perguntar({
    titulo: 'Jogar fora este pacote?',
    texto: `${quantidade(lote.quantidade)} de ${detalhe.value.item.nome}, validade ${formatarMesAno(lote.validade)}.`,
    confirmar: 'Sim, jogar fora',
    cancelar: 'Não, manter',
  })
  if (confirmado && (await descartar(lote.id))) mostrar('Pacote retirado do estoque.')
}
</script>

<template>
  <section v-if="detalhe" class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'estoque' }" class="botao-secundario inline-flex w-auto! items-center gap-2 text-[18px]!">
        <PhArrowLeft :size="24" weight="bold" aria-hidden="true" />Voltar
      </RouterLink>
      <h1 class="titulo-1 mt-6">{{ detalhe.item.nome }}</h1>
      <p v-if="!detalhe.noPlano" class="nota">Este item não está marcado no seu estoque.</p>
    </header>

    <dl class="grid grid-cols-3 border-4 border-tinta text-center">
      <div class="border-r-2 border-tinta p-3">
        <dt class="rotulo">Tenho</dt>
        <dd class="text-[24px] font-bold tabular-nums" data-teste="tenho">{{ quantidade(detalhe.atual) }}</dd>
      </div>
      <div class="border-r-2 border-tinta p-3">
        <dt class="rotulo">Preciso</dt>
        <dd class="text-[24px] font-bold tabular-nums">{{ quantidade(detalhe.meta) }}</dd>
      </div>
      <div class="p-3" :class="{ bloco: detalhe.falta > 0 }">
        <dt class="rotulo">Falta</dt>
        <dd class="text-[24px] font-bold tabular-nums" data-teste="falta">{{ quantidade(detalhe.falta) }}</dd>
      </div>
    </dl>

    <FormularioLote
      v-if="adicionando"
      :item="detalhe.item"
      :quantidade-inicial="detalhe.falta || passoConsumo"
      texto-botao="Guardar no estoque"
      @salvar="registrar"
      @cancelar="adicionando = false"
    />
    <button v-else type="button" class="botao flex items-center justify-center gap-3" @click="adicionando = true">
      <PhPlus :size="28" weight="bold" aria-hidden="true" />Comprei mais
    </button>

    <section class="space-y-4">
      <h2 class="titulo-2">Pacotes guardados</h2>
      <p v-if="!detalhe.lotes.length" class="nota">Nada guardado ainda. Toque em "Comprei mais" quando comprar.</p>
      <ul v-else class="space-y-4">
        <li v-for="{ lote, dias } in detalhe.lotes" :key="lote.id" class="border-4 border-tinta" data-teste="lote">
          <div class="flex items-center justify-between gap-4 p-4">
            <span>
              <span class="block text-[26px] font-bold tabular-nums">{{ quantidade(lote.quantidade) }}</span>
              <span class="nota flex items-center gap-2">
                <PhCalendarBlank :size="20" weight="bold" aria-hidden="true" />Comprado {{ formatarData(lote.compradoEm) }}
              </span>
            </span>
            <span class="text-right">
              <span class="rotulo block">Vence</span>
              <span class="text-[26px] font-bold tabular-nums">{{ formatarMesAno(lote.validade) }}</span>
            </span>
          </div>
          <p v-if="dias <= DIAS_ALERTA_VALIDADE" class="rotulo bloco flex items-center gap-2 px-4 py-2">
            <PhClockCountdown :size="22" weight="bold" aria-hidden="true" />{{ formatarPrazo(dias) }}
          </p>
          <form v-if="consumindo === lote.id" class="space-y-4 border-t-2 border-tinta p-4" novalidate @submit.prevent="confirmarConsumo(lote)">
            <CampoNumero v-model="quantidadeConsumo" rotulo="Quanto usou?" :minimo="passoConsumo" :maximo="lote.quantidade" :passo="passoConsumo" />
            <MensagemErro />
            <button type="submit" class="botao flex items-center justify-center gap-3">
              <PhCheck :size="28" weight="bold" aria-hidden="true" />Confirmar
            </button>
            <button type="button" class="botao-secundario" @click="consumindo = null">Cancelar</button>
          </form>
          <div v-else class="grid grid-cols-2 border-t-2 border-tinta">
            <button type="button" class="flex min-h-16 items-center justify-center gap-2 border-r-2 border-tinta font-bold active:bg-relevo" @click="iniciarConsumo(lote)">
              <PhForkKnife :size="26" weight="bold" aria-hidden="true" />Usei
            </button>
            <button type="button" class="flex min-h-16 items-center justify-center gap-2 font-bold active:bg-relevo" @click="confirmarDescarte(lote)">
              <PhTrash :size="26" weight="bold" aria-hidden="true" />Jogar fora
            </button>
          </div>
        </li>
      </ul>
    </section>

    <div class="caixa flex gap-4">
      <PhThermometer :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
      <div><p class="rotulo mb-2">Como guardar</p><p>{{ detalhe.item.armazenamento }}</p></div>
    </div>
    <div class="caixa flex gap-4">
      <PhStorefront :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
      <div><p class="rotulo mb-2">Onde comprar</p><p>{{ detalhe.item.ondeComprar }}</p></div>
    </div>
  </section>

  <section v-else class="space-y-6">
    <CaixaAviso titulo="Item não encontrado" tipo="atencao">Este item não existe no catálogo.</CaixaAviso>
    <RouterLink :to="{ name: 'estoque' }" class="botao-secundario flex items-center justify-center">Voltar ao estoque</RouterLink>
  </section>
</template>
