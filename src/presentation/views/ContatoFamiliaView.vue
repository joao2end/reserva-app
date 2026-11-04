<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhArrowLeft, PhCheck, PhTrash, PhUsersThree, PhWarningOctagon } from '@phosphor-icons/vue'
import { ErroDeValidacao } from '../../domain/entidades/erros'
import { LIMITE_NOME } from '../../domain/regras/validacao'
import { usePreferencias } from '../estado/usePreferencias'
import { useAviso } from '../estado/useAviso'
import { useConfirmacao } from '../estado/useConfirmacao'
import { formatarTelefone } from '../formato'
import CaixaAviso from '../components/CaixaAviso.vue'

const router = useRouter()
const { contatoFamilia, definirContatoFamilia, removerContatoFamilia } = usePreferencias()
const { mostrar } = useAviso()
const { perguntar } = useConfirmacao()

const nome = ref(contatoFamilia.value?.nome ?? '')
const telefone = ref(contatoFamilia.value ? formatarTelefone(contatoFamilia.value.telefone) : '')
const erro = ref('')

function voltar() {
  if (window.history.state?.back) router.back()
  else router.push({ name: 'inicio' })
}

async function salvar() {
  erro.value = ''
  try {
    await definirContatoFamilia(nome.value, telefone.value)
    mostrar('Telefone da família salvo.')
    voltar()
  } catch (falha) {
    if (!(falha instanceof ErroDeValidacao)) throw falha
    erro.value = falha.message
  }
}

async function remover() {
  const confirmado = await perguntar({
    titulo: 'Apagar o telefone da família?',
    texto: contatoFamilia.value?.nome ?? '',
    confirmar: 'Sim, apagar',
    cancelar: 'Não, manter',
  })
  if (!confirmado) return
  await removerContatoFamilia()
  mostrar('Telefone da família apagado.')
  voltar()
}
</script>

<template>
  <section class="space-y-8">
    <header>
      <button type="button" class="rotulo inline-flex min-h-12 items-center gap-2 underline underline-offset-4" @click="voltar">
        <PhArrowLeft :size="22" weight="bold" aria-hidden="true" />Voltar
      </button>
      <PhUsersThree :size="56" weight="bold" class="mt-6" aria-hidden="true" />
      <h1 class="titulo-1 mt-2">Telefone da família</h1>
      <p class="nota">Um parente ou amigo para ligar numa emergência. Fica salvo só neste celular.</p>
    </header>

    <form class="caixa space-y-6" novalidate @submit.prevent="salvar">
      <label class="block">
        <span class="rotulo mb-2 block">Nome</span>
        <input v-model="nome" class="campo" type="text" autocomplete="off" :maxlength="LIMITE_NOME" placeholder="Ex.: Maria, minha filha" />
      </label>
      <label class="block">
        <span class="rotulo mb-2 block">Telefone com DDD</span>
        <input
          v-model="telefone"
          class="campo tabular-nums"
          type="tel"
          inputmode="tel"
          autocomplete="off"
          maxlength="20"
          placeholder="Ex.: 82 99999-9999"
        />
      </label>
      <div v-if="erro" class="caixa bloco flex items-start gap-4" role="alert">
        <PhWarningOctagon :size="32" weight="bold" class="shrink-0" aria-hidden="true" />
        <p class="font-bold">{{ erro }}</p>
      </div>
      <button type="submit" class="botao flex items-center justify-center gap-3">
        <PhCheck :size="28" weight="bold" aria-hidden="true" />Salvar
      </button>
    </form>

    <CaixaAviso titulo="Combine com a família">
      Escolha alguém que more em outro bairro ou cidade. Numa emergência, todos ligam para essa pessoa para dar notícias.
    </CaixaAviso>

    <button v-if="contatoFamilia" type="button" class="botao-secundario flex items-center justify-center gap-3" @click="remover">
      <PhTrash :size="28" weight="bold" aria-hidden="true" />Apagar telefone da família
    </button>
  </section>
</template>
