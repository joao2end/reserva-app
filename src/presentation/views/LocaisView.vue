<script setup lang="ts">
import { ref } from 'vue'
import { PhArrowLeft, PhMapPin, PhPlus, PhTrash } from '@phosphor-icons/vue'
import { useEstoque } from '../estado/useEstoque'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'
import type { LocalCompra } from '../../domain/entidades/tipos'
import { LIMITE_LOCAL, LIMITE_OBSERVACAO } from '../../domain/regras/validacao'
import CaixaAviso from '../components/CaixaAviso.vue'
import MensagemErro from '../components/MensagemErro.vue'

const { estado, adicionarLocal, removerLocal } = useEstoque()

const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()
const nome = ref('')
const observacao = ref('')

async function salvar() {
  if (await adicionarLocal({ nome: nome.value, observacao: observacao.value })) {
    mostrar('Local guardado.')
    nome.value = ''
    observacao.value = ''
  }
}

async function remover(local: LocalCompra) {
  const confirmado = await perguntar({ titulo: 'Remover este local?', texto: local.nome, confirmar: 'Sim, remover', cancelar: 'Não, manter' })
  if (confirmado && (await removerLocal(local.id))) mostrar('Local removido.')
}
</script>

<template>
  <section class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'guia' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao guia
      </RouterLink>
      <h1 class="titulo-1 mt-4">Locais de compra</h1>
      <p class="nota">Anote onde cada coisa sai mais barata e os dias de promoção.</p>
    </header>

    <form class="caixa space-y-6" novalidate @submit.prevent="salvar">
      <label class="block">
        <span class="rotulo mb-2 block">Nome do local</span>
        <input v-model="nome" class="campo" type="text" :maxlength="LIMITE_LOCAL" placeholder="Ex.: Atacarejo do bairro" />
      </label>
      <label class="block">
        <span class="rotulo mb-2 block">O que comprar lá</span>
        <textarea v-model="observacao" class="campo min-h-28 py-3" :maxlength="LIMITE_OBSERVACAO" placeholder="Ex.: arroz e óleo em fardo; promoção às quartas" />
      </label>
      <MensagemErro />
      <button type="submit" class="botao flex items-center justify-center gap-3">
        <PhPlus :size="28" weight="bold" aria-hidden="true" />Adicionar local
      </button>
    </form>

    <ul v-if="estado.locais.length" class="space-y-4">
      <li v-for="local in estado.locais" :key="local.id" class="border-4 border-tinta" data-teste="local">
        <div class="flex gap-4 p-4">
          <PhMapPin :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
          <div>
            <p class="text-[24px] font-bold">{{ local.nome }}</p>
            <p v-if="local.observacao">{{ local.observacao }}</p>
          </div>
        </div>
        <button type="button" class="flex min-h-14 w-full items-center justify-center gap-2 border-t-2 border-tinta font-bold active:bg-relevo" @click="remover(local)">
          <PhTrash :size="24" weight="bold" aria-hidden="true" />Remover
        </button>
      </li>
    </ul>

    <CaixaAviso titulo="Onde procurar">
      Atacarejos para fardos; feiras e mercados públicos para grãos a granel; distribuidoras para galões de água; farmácias e postos de saúde para hipoclorito.
    </CaixaAviso>
  </section>
</template>
