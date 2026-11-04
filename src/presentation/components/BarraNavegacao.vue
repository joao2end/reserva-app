<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ICONE_NAVEGACAO } from '../icones'

const rota = useRoute()

const ROTAS_DA_ABA: Record<string, string[]> = {
  cursos: ['cursos', 'curso', 'licao'],
}

function estaNaAba(nome: string, ativo: boolean, ativoExato: boolean): boolean {
  if (ROTAS_DA_ABA[nome]) return ROTAS_DA_ABA[nome].includes(String(rota.name))
  return nome === 'inicio' ? ativoExato : ativo
}

const destinos = [
  { nome: 'inicio', rotulo: 'Início' },
  { nome: 'estoque', rotulo: 'Estoque' },
  { nome: 'compras', rotulo: 'Compras' },
  { nome: 'cursos', rotulo: 'Cursos' },
  { nome: 'guia', rotulo: 'Guia' },
]
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-10 border-t-4 border-tinta bg-papel"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Navegação principal"
  >
    <ul class="mx-auto grid max-w-xl grid-cols-5">
      <li v-for="destino in destinos" :key="destino.nome">
        <RouterLink
          v-slot="{ href, navigate, isActive, isExactActive }"
          :to="{ name: destino.nome }"
          custom
        >
          <a
            :href="href"
            class="flex min-h-18 flex-col items-center justify-center gap-1 text-[15px] font-bold"
            :class="{ bloco: estaNaAba(destino.nome, isActive, isExactActive) }"
            :aria-current="estaNaAba(destino.nome, isActive, isExactActive) ? 'page' : undefined"
            @click="navigate"
          >
            <component :is="ICONE_NAVEGACAO[destino.nome]" :size="30" weight="bold" aria-hidden="true" />
            {{ destino.rotulo }}
          </a>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
