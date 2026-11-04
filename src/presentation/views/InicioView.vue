<script setup lang="ts">
import { computed } from 'vue'
import { PhDrop, PhPencilSimple, PhPlus, PhShoppingCart, PhBookOpen, PhClockCountdown, PhCaretRight } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'
import { resumo } from '../../application/consultas/consultas'
import { formatarMesAno, formatarPrazo, formatarQuantidade, plural } from '../formato'
import BarraProgresso from '../components/BarraProgresso.vue'
import CaixaAviso from '../components/CaixaAviso.vue'
import SeletorTamanhoTexto from '../components/SeletorTamanhoTexto.vue'
import TelefonesEmergencia from '../components/TelefonesEmergencia.vue'

const { estado, hoje } = useEstoque()

const dados = computed(() => resumo(estado.value, hoje()))

const descricaoPessoas = computed(() => {
  if (!dados.value) return ''
  const { adultos, criancas } = dados.value.configuracao
  const partes = adultos > 0 ? [plural(adultos, 'adulto', 'adultos')] : []
  if (criancas > 0) partes.push(plural(criancas, 'criança', 'crianças'))
  return partes.join(' e ')
})

const comoUsar = [
  'Diga quantas pessoas e por quanto tempo.',
  'Veja a lista do que comprar.',
  'Ao voltar do mercado, toque em "Comprei".',
]
</script>

<template>
  <section v-if="!dados" class="space-y-8">
    <h1 class="text-[64px] leading-[64px] font-bold">SBV</h1>
    <p>Monte e mantenha um estoque de comida e água para atravessar a seca do El Niño.</p>

    <section class="caixa space-y-4">
      <h2 class="titulo-2">Como usar</h2>
      <ol class="space-y-4">
        <li v-for="(texto, indice) in comoUsar" :key="texto" class="flex items-center gap-4">
          <span class="bloco flex size-12 shrink-0 items-center justify-center text-[26px] font-bold" aria-hidden="true">{{ indice + 1 }}</span>
          <span>{{ texto }}</span>
        </li>
      </ol>
    </section>

    <RouterLink :to="{ name: 'criar' }" class="botao flex min-h-18 items-center justify-center gap-3 text-[26px]">
      <PhPlus :size="32" weight="bold" aria-hidden="true" />Começar
    </RouterLink>
    <RouterLink :to="{ name: 'guia' }" class="botao-secundario flex items-center justify-center gap-3">
      <PhBookOpen :size="28" weight="bold" aria-hidden="true" />Ler o guia primeiro
    </RouterLink>

    <TelefonesEmergencia />

    <SeletorTamanhoTexto />
  </section>

  <section v-else class="space-y-8">
    <header>
      <p class="rotulo">Estoque</p>
      <h1 class="titulo-1">{{ dados.configuracao.nome }}</h1>
      <p class="nota">{{ descricaoPessoas }} · para {{ dados.configuracao.dias }} dias</p>
    </header>

    <BarraProgresso :percentual="dados.progresso" rotulo="Quanto já tenho" />

    <RouterLink v-if="dados.itensFaltando" :to="{ name: 'compras' }" class="bloco flex min-h-24 items-center gap-4 border-4 border-tinta p-4" data-teste="faltam">
      <PhShoppingCart :size="44" weight="bold" class="shrink-0" aria-hidden="true" />
      <span class="flex-1">
        <span class="block text-[30px] leading-9 font-bold">Falta comprar {{ plural(dados.itensFaltando, 'item', 'itens') }}</span>
        <span class="text-[18px]">Toque para ver a lista</span>
      </span>
      <PhCaretRight :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
    </RouterLink>
    <CaixaAviso v-else titulo="Tudo comprado">Seu estoque chegou na meta.</CaixaAviso>

    <div class="caixa flex items-start gap-4" data-teste="agua">
      <PhDrop :size="44" weight="bold" class="shrink-0" aria-hidden="true" />
      <div class="space-y-3">
        <p>A casa precisa de <strong class="text-[30px] tabular-nums">{{ dados.litrosAguaDia }} litros</strong> de água por dia.</p>
        <p v-if="dados.diasDeAgua === 0" data-teste="dias-agua">Ainda não há água guardada.</p>
        <p v-else-if="dados.diasDeAgua !== null" data-teste="dias-agua">A água guardada dá para <strong class="text-[30px] tabular-nums">{{ plural(dados.diasDeAgua, 'dia', 'dias') }}</strong>.</p>
      </div>
    </div>

    <section v-if="dados.consumirPrimeiro.length" class="space-y-4">
      <h2 class="titulo-2 flex items-center gap-3">
        <PhClockCountdown :size="34" weight="bold" aria-hidden="true" />Use primeiro
      </h2>
      <p class="nota">Estes vencem logo. Use antes dos outros.</p>
      <ul class="border-4 border-tinta">
        <li v-for="{ lote, item, dias } in dados.consumirPrimeiro" :key="lote.id" class="border-b-2 border-tinta last:border-b-0">
          <RouterLink :to="{ name: 'item', params: { itemId: item.id } }" class="flex items-center justify-between gap-4 p-4">
            <span>
              <span class="block font-bold">{{ item.nome }}</span>
              <span class="nota">{{ formatarQuantidade(lote.quantidade, item.unidade) }}</span>
            </span>
            <span class="text-right">
              <span class="block font-bold tabular-nums">{{ formatarMesAno(lote.validade) }}</span>
              <span class="nota">{{ formatarPrazo(dias) }}</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <RouterLink :to="{ name: 'criar' }" class="botao-secundario flex items-center justify-center gap-3">
      <PhPencilSimple :size="28" weight="bold" aria-hidden="true" />Mudar pessoas ou tempo
    </RouterLink>

    <TelefonesEmergencia />

    <SeletorTamanhoTexto />
  </section>
</template>
