<script setup lang="ts">
import { computed } from 'vue'
import { PhCaretRight, PhCheckCircle, PhClockCountdown } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'
import { situacaoDoEstoque } from '../../application/consultas/consultas'
import { formatarQuantidade } from '../formato'
import CabecalhoCategoria from '../components/CabecalhoCategoria.vue'

const { configuracao, estado, hoje } = useEstoque()

const grupos = computed(() => (configuracao.value ? situacaoDoEstoque(configuracao.value, estado.value.lotes, hoje()) : []))
</script>

<template>
  <section class="space-y-8">
    <header>
      <p class="rotulo">{{ configuracao?.nome }}</p>
      <h1 class="titulo-1">Meu estoque</h1>
      <p class="nota">Toque num alimento para ver, anotar compras ou o que usou.</p>
    </header>

    <section v-for="grupo in grupos" :key="grupo.categoria.id">
      <CabecalhoCategoria :categoria="grupo.categoria" />
      <ul class="border-4 border-t-0 border-tinta">
        <li
          v-for="(linha, indice) in grupo.linhas"
          :key="linha.item.id"
          class="border-b-2 border-tinta last:border-b-0"
          :class="{ 'bg-relevo': indice % 2 === 1 }"
        >
          <RouterLink :to="{ name: 'item', params: { itemId: linha.item.id } }" class="flex min-h-18 items-center gap-3 px-4 py-3">
            <span class="flex-1">
              <span class="block font-bold">{{ linha.item.nome }}</span>
              <span class="nota flex flex-wrap items-center gap-x-2">
                <template v-if="linha.falta === 0">
                  <PhCheckCircle :size="20" weight="bold" aria-hidden="true" />Completo
                </template>
                <template v-else>Precisa de {{ formatarQuantidade(linha.meta, linha.item.unidade) }}</template>
                <span v-if="linha.venceLogo" class="flex items-center gap-1 font-bold text-tinta">
                  <PhClockCountdown :size="20" weight="bold" aria-hidden="true" />VENCE LOGO
                </span>
              </span>
            </span>
            <span class="shrink-0 text-right text-[26px] font-bold tabular-nums">
              {{ formatarQuantidade(linha.atual, linha.item.unidade) }}
            </span>
            <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </section>
</template>
