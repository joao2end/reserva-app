<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowLeft, PhBookOpen, PhCaretRight, PhGraduationCap } from '@phosphor-icons/vue'
import { CATEGORIAS_ACERVO, guiaDoAcervo, type LigacaoAcervo } from '../../domain/conteudo/acervo'
import { nomeDoNivel } from '../../domain/conteudo/curso'
import CaixaAviso from '../components/CaixaAviso.vue'

const props = defineProps<{ guiaId: string }>()
const guia = computed(() => guiaDoAcervo(props.guiaId))
const categoria = computed(() => CATEGORIAS_ACERVO.find((item) => item.id === guia.value?.categoria))

function destino(ligacao: LigacaoAcervo) {
  if (ligacao.tipo === 'licao') return { name: 'licao', params: { licaoId: ligacao.id } }
  if (ligacao.tipo === 'curso') return { name: 'curso', params: { cursoId: ligacao.id } }
  return { name: 'secao', params: { secaoId: ligacao.id } }
}
</script>

<template>
  <article v-if="guia" class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'acervo' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao acervo
      </RouterLink>
      <p class="rotulo mt-6">{{ categoria?.titulo }} · Nível {{ nomeDoNivel(guia.nivel).toLowerCase() }}</p>
      <h1 class="titulo-1 mt-2">{{ guia.titulo }}</h1>
      <p class="nota">{{ guia.resumo }}</p>
    </header>

    <CaixaAviso v-if="guia.aviso" :titulo="guia.aviso.titulo" :tipo="guia.aviso.critico ? 'critico' : 'atencao'">
      {{ guia.aviso.texto }}
    </CaixaAviso>

    <section v-for="bloco in guia.blocos" :key="bloco.titulo" class="space-y-4">
      <h2 class="titulo-2">{{ bloco.titulo }}</h2>
      <ul class="space-y-3">
        <li v-for="texto in bloco.itens" :key="texto" class="flex gap-3">
          <span class="mt-3 size-3 shrink-0 bg-tinta" aria-hidden="true" />
          <span>{{ texto }}</span>
        </li>
      </ul>
    </section>

    <section v-if="guia.ligacoes?.length" class="space-y-3" aria-labelledby="ver-tambem">
      <h2 id="ver-tambem" class="titulo-2">Veja também</h2>
      <RouterLink
        v-for="ligacao in guia.ligacoes"
        :key="`${ligacao.tipo}-${ligacao.id}`"
        :to="destino(ligacao)"
        class="flex min-h-18 items-center gap-4 border-4 border-tinta p-4"
        data-teste="ligacao-acervo"
      >
        <component :is="ligacao.tipo === 'secao' ? PhBookOpen : PhGraduationCap" :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
        <span class="min-w-0 flex-1 text-[22px] leading-7 font-bold [overflow-wrap:anywhere]">{{ ligacao.titulo }}</span>
        <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
      </RouterLink>
    </section>

    <section class="space-y-2" aria-labelledby="fontes-acervo">
      <h2 id="fontes-acervo" class="rotulo">Fontes</h2>
      <ul class="nota space-y-1">
        <li v-for="fonte in guia.fontes" :key="fonte">{{ fonte }}</li>
      </ul>
    </section>
  </article>

  <section v-else class="space-y-6">
    <CaixaAviso titulo="Guia não encontrado" tipo="atencao">Volte ao acervo e escolha outro tema.</CaixaAviso>
    <RouterLink :to="{ name: 'acervo' }" class="botao-secundario flex items-center justify-center">Ver o acervo</RouterLink>
  </section>
</template>
