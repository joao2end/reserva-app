<script setup lang="ts">
import { PhPencilSimple, PhPhoneCall, PhPlus, PhUsersThree } from '@phosphor-icons/vue'
import { TELEFONES_EMERGENCIA } from '../../domain/conteudo/telefones'
import { usePreferencias } from '../estado/usePreferencias'
import { formatarTelefone } from '../formato'

const { contatoFamilia } = usePreferencias()

function soletrar(numero: string): string {
  return numero.split('').join(' ')
}
</script>

<template>
  <section class="space-y-4" aria-labelledby="titulo-emergencia" data-teste="emergencia">
    <h2 id="titulo-emergencia" class="titulo-2">Ligar para emergência</h2>
    <p class="nota">Toque para abrir o telefone com o número pronto.</p>
    <ul class="grid gap-3">
      <li v-if="contatoFamilia" data-teste="contato-familia">
        <a
          :href="`tel:${contatoFamilia.telefone}`"
          class="bloco flex min-h-20 items-center gap-4 rounded-md border-4 border-tinta p-4 active:opacity-80"
          :aria-label="`Ligar para ${contatoFamilia.nome}, da família, ${soletrar(contatoFamilia.telefone)}.`"
        >
          <PhUsersThree :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
          <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <span class="block text-[24px] leading-8 font-bold">{{ contatoFamilia.nome }}</span>
            <span class="text-[18px] tabular-nums">{{ formatarTelefone(contatoFamilia.telefone) }}</span>
          </span>
          <PhPhoneCall :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
        </a>
      </li>
      <li v-for="telefone in TELEFONES_EMERGENCIA" :key="telefone.numero">
        <a
          :href="`tel:${telefone.numero}`"
          class="flex min-h-20 items-center gap-4 rounded-md border-4 border-tinta p-4 active:bg-relevo"
          :aria-label="`Ligar para ${telefone.nome}, ${soletrar(telefone.numero)}. ${telefone.quando}.`"
        >
          <PhPhoneCall :size="36" weight="bold" class="shrink-0" aria-hidden="true" />
          <span class="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <span class="block text-[24px] leading-8 font-bold">{{ telefone.nome }}</span>
            <span class="nota">{{ telefone.quando }}</span>
          </span>
          <span class="bloco shrink-0 rounded-md px-3 py-1 text-[30px] font-bold tabular-nums">{{ telefone.numero }}</span>
        </a>
      </li>
    </ul>
    <RouterLink :to="{ name: 'familia' }" class="botao-secundario flex items-center justify-center gap-3">
      <component :is="contatoFamilia ? PhPencilSimple : PhPlus" :size="28" weight="bold" aria-hidden="true" />
      {{ contatoFamilia ? 'Mudar telefone da família' : 'Salvar telefone da família' }}
    </RouterLink>
  </section>
</template>
