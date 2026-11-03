<script setup lang="ts">
import { computed, ref } from 'vue'
import { PhCheck, PhMapPin, PhSealCheck } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'
import { useAviso } from '../estado/useAviso'
import { formatarQuantidade } from '../formato'
import { listaDeCompras } from '../../application/consultas/consultas'
import type { DadosCompra } from '../../application/casos-de-uso/ServicoEstoque'
import FormularioLote from '../components/FormularioLote.vue'
import CaixaAviso from '../components/CaixaAviso.vue'
import CabecalhoCategoria from '../components/CabecalhoCategoria.vue'

const { configuracao, estado, hoje, registrarCompra, limparErro } = useEstoque()
const { mostrar } = useAviso()
const comprando = ref<string | null>(null)

const grupos = computed(() => (configuracao.value ? listaDeCompras(configuracao.value, estado.value.lotes, hoje()) : []))
const totalItens = computed(() => grupos.value.reduce((soma, grupo) => soma + grupo.linhas.length, 0))

function abrir(itemId: string) {
  limparErro()
  comprando.value = itemId
}

async function registrar(dados: DadosCompra) {
  const linha = grupos.value.flatMap((grupo) => grupo.linhas).find((candidata) => candidata.item.id === dados.itemId)
  if (!(await registrarCompra(dados))) return
  comprando.value = null
  if (linha) mostrar(`Guardado: ${formatarQuantidade(dados.quantidade, linha.item.unidade)} de ${linha.item.nome}.`)
}
</script>

<template>
  <section class="space-y-8">
    <header>
      <p class="rotulo">Lista de compras</p>
      <h1 class="titulo-1">{{ totalItens ? `Faltam ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}` : 'Tudo comprado' }}</h1>
      <p class="nota">Ao voltar do mercado, toque em "Comprei" no que você trouxe.</p>
    </header>

    <div v-if="!totalItens" class="caixa flex gap-4">
      <PhSealCheck :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
      <div>
        <p class="rotulo mb-2">Tudo comprado</p>
        <p>Seu estoque chegou na meta. Para guardar mais, toque em Início › Mudar pessoas ou tempo.</p>
      </div>
    </div>

    <CaixaAviso v-else titulo="Dica">Não compre tudo de uma vez. Leve 2 ou 3 itens a mais a cada ida ao mercado.</CaixaAviso>

    <section v-for="grupo in grupos" :key="grupo.categoria.id">
      <CabecalhoCategoria :categoria="grupo.categoria" />
      <ul class="border-4 border-t-0 border-tinta">
        <li v-for="linha in grupo.linhas" :key="linha.item.id" class="border-b-2 border-tinta last:border-b-0" :data-teste="`compra-${linha.item.id}`">
          <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3">
            <span class="min-w-0 flex-1 basis-40 break-words">
              <span class="block font-bold">{{ linha.item.nome }}</span>
              <span class="text-[26px] font-bold tabular-nums">{{ formatarQuantidade(linha.falta, linha.item.unidade) }}</span>
            </span>
            <button
              v-if="comprando !== linha.item.id"
              type="button"
              class="flex min-h-14 shrink-0 items-center gap-2 rounded-md border-4 border-tinta bg-tinta px-4 font-bold text-papel active:opacity-80"
              @click="abrir(linha.item.id)"
            >
              <PhCheck :size="24" weight="bold" aria-hidden="true" />Comprei
            </button>
          </div>
          <div v-if="comprando === linha.item.id" class="px-4 pb-4">
            <FormularioLote
              :item="linha.item"
              :quantidade-inicial="linha.falta"
              texto-botao="Guardar no estoque"
              @salvar="registrar"
              @cancelar="comprando = null"
            />
          </div>
        </li>
      </ul>
    </section>

    <RouterLink :to="{ name: 'locais' }" class="botao-secundario flex items-center justify-center gap-3">
      <PhMapPin :size="28" weight="bold" aria-hidden="true" />Meus locais de compra
    </RouterLink>
  </section>
</template>
