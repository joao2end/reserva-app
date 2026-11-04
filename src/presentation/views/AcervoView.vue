<script setup lang="ts">
import { computed, ref } from 'vue'
import { PhArrowLeft, PhBooks, PhCaretRight, PhMagnifyingGlass } from '@phosphor-icons/vue'
import { ACERVO, CATEGORIAS_ACERVO, buscarNoAcervo, type CategoriaAcervo } from '../../domain/conteudo/acervo'
import { nomeDoNivel } from '../../domain/conteudo/curso'

const termo = ref('')
const categoria = ref<CategoriaAcervo>()

const encontrados = computed(() => buscarNoAcervo(termo.value, categoria.value))
const grupos = computed(() =>
  CATEGORIAS_ACERVO.map((item) => ({ ...item, guias: encontrados.value.filter((guia) => guia.categoria === item.id) })).filter(
    (grupo) => grupo.guias.length > 0,
  ),
)

function escolher(id?: CategoriaAcervo) {
  categoria.value = categoria.value === id ? undefined : id
}
</script>

<template>
  <section class="space-y-8">
    <header>
      <RouterLink :to="{ name: 'guia' }" class="rotulo inline-flex items-center gap-2 underline underline-offset-4">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar ao guia
      </RouterLink>
      <PhBooks :size="56" weight="bold" class="mt-6" aria-hidden="true" />
      <h1 class="titulo-1 mt-2">Acervo de sobrevivência</h1>
      <p class="nota">{{ ACERVO.length }} guias para consultar, mesmo sem internet.</p>
    </header>

    <label class="block">
      <span class="rotulo mb-2 flex items-center gap-2"><PhMagnifyingGlass :size="22" weight="bold" aria-hidden="true" />Procurar</span>
      <input v-model="termo" class="campo" type="search" autocomplete="off" placeholder="Ex.: enchente, remédio, raio" data-teste="busca-acervo" />
    </label>

    <div class="flex flex-wrap gap-3" role="group" aria-label="Escolher um tema">
      <button
        type="button"
        class="min-h-14 border-4 border-tinta px-4 text-[20px] font-bold"
        :class="{ bloco: !categoria }"
        :aria-pressed="!categoria"
        @click="escolher()"
      >
        Todos
      </button>
      <button
        v-for="item in CATEGORIAS_ACERVO"
        :key="item.id"
        type="button"
        class="min-h-14 border-4 border-tinta px-4 text-[20px] font-bold"
        :class="{ bloco: categoria === item.id }"
        :aria-pressed="categoria === item.id"
        :data-teste="`categoria-${item.id}`"
        @click="escolher(item.id)"
      >
        {{ item.titulo }}
      </button>
    </div>

    <p v-if="!grupos.length" class="font-bold" role="status">Nada encontrado. Tente outra palavra.</p>

    <section v-for="grupo in grupos" :key="grupo.id" class="space-y-4" :aria-labelledby="`acervo-${grupo.id}`">
      <h2 :id="`acervo-${grupo.id}`" class="titulo-2">{{ grupo.titulo }}</h2>
      <ul class="border-4 border-tinta">
        <li v-for="guia in grupo.guias" :key="guia.id" class="border-b-2 border-tinta last:border-b-0">
          <RouterLink
            :to="{ name: 'guia-acervo', params: { guiaId: guia.id } }"
            class="flex min-h-20 items-center gap-4 p-4"
            :data-teste="`guia-${guia.id}`"
          >
            <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
              <span class="block text-[24px] leading-8 font-bold">{{ guia.titulo }}</span>
              <span class="nota">{{ guia.resumo }}</span>
              <span class="rotulo mt-1 block">Nível {{ nomeDoNivel(guia.nivel).toLowerCase() }}</span>
            </span>
            <PhCaretRight :size="24" weight="bold" class="shrink-0" aria-hidden="true" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </section>
</template>
