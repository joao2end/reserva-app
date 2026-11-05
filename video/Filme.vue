<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { licaoPorId, moduloDaLicao, nomeDoNivel } from '../src/domain/conteudo/curso'
import { VOZ_NARRACAO, itensParaTela, roteiroDaLicao } from '../src/domain/conteudo/narracao'
import CenaDesenhada from '../src/presentation/components/CenaDesenhada.vue'
import IlustracaoCena from '../src/presentation/components/IlustracaoCena.vue'
import { ICONE_CURSO } from '../src/presentation/icones'

const props = defineProps<{ licaoId: string; duracoes: number[] }>()

interface Paleta {
  escuro: string
  medio: string
  destaque: string
}

const PALETAS: Record<string, Paleta> = {
  eletricista: { escuro: '#0b1d3a', medio: '#173a6b', destaque: '#ffb703' },
  encanador: { escuro: '#032b3a', medio: '#13627a', destaque: '#7dd3fc' },
  mecanica: { escuro: '#2a0f0b', medio: '#7a2e1c', destaque: '#ff8a3d' },
  horta: { escuro: '#0e2716', medio: '#1f5a33', destaque: '#a3e635' },
  agua: { escuro: '#04245e', medio: '#1565a8', destaque: '#5ee7ff' },
  socorros: { escuro: '#3a0909', medio: '#8b1e1e', destaque: '#ff7a7a' },
  comida: { escuro: '#341a03', medio: '#8a4b08', destaque: '#ffd166' },
}

const licao = licaoPorId(props.licaoId)
const curso = moduloDaLicao(props.licaoId)
if (!licao || !curso) throw new Error(`Lição desconhecida: ${props.licaoId}`)

const roteiro = roteiroDaLicao(licao, curso)
const duracoes = props.duracoes.length === roteiro.length ? props.duracoes : roteiro.map((trecho) => trecho.minimoSegundos)
const inicios = duracoes.map((_, indice) => duracoes.slice(0, indice).reduce((soma, valor) => soma + valor, 0))
const total = duracoes.reduce((soma, valor) => soma + valor, 0)
const paleta = PALETAS[curso.id] ?? PALETAS.eletricista
const icone = ICONE_CURSO[curso.id]
const totalCenas = licao.cenas.length

const tempo = ref(0)
const indice = computed(() => inicios.reduce((achado, inicio, posicao) => (inicio <= tempo.value ? posicao : achado), 0))
const local = computed(() => tempo.value - inicios[indice.value])
const duracaoAtual = computed(() => duracoes[indice.value])
const trecho = computed(() => roteiro[indice.value])
const cena = computed(() => (trecho.value.tipo === 'cena' && trecho.value.indiceCena !== undefined ? licao.cenas[trecho.value.indiceCena] : undefined))

interface ItemQuadro {
  texto: string
  numero?: number
}

const quadro = computed(() => {
  const indiceItem = trecho.value.indiceItem ?? 0
  const itens: ItemQuadro[] =
    trecho.value.tipo === 'parte' && trecho.value.indiceParte !== undefined
      ? itensParaTela(licao.partes[trecho.value.indiceParte])
      : trecho.value.tipo === 'erro'
        ? licao.erros.map((texto) => ({ texto }))
        : []
  const atual = itens[indiceItem] ?? { texto: '' }
  return {
    titulo:
      trecho.value.tipo === 'erro' ? 'Erros comuns' : trecho.value.indiceParte !== undefined ? licao.partes[trecho.value.indiceParte].titulo : '',
    rotulo: trecho.value.tipo === 'erro' ? 'Cuidado' : `Passo a passo · ${(trecho.value.indiceParte ?? 0) + 1} de ${licao.partes.length}`,
    item: atual,
    tamanho: tamanhoDoItem(atual.texto),
    pontos: itens.map((_, posicao) => posicao === indiceItem),
    novaParte: indiceItem === 0,
    cena: licao.cenas[(trecho.value.tipo === 'erro' ? licao.cenas.length - 1 : (trecho.value.indiceParte ?? 0)) % licao.cenas.length],
  }
})

function tamanhoDoItem(texto: string): number {
  if (texto.length <= 110) return 42
  if (texto.length <= 170) return 38
  return 34
}

function suave(valor: number): number {
  const x = Math.min(1, Math.max(0, valor))
  return 1 - Math.pow(1 - x, 3)
}

function entrada(atraso: number, duracao = 0.6, distancia = 36) {
  const progresso = suave((local.value - atraso) / duracao)
  return { opacity: progresso, transform: `translateY(${(1 - progresso) * distancia}px)` }
}

const itemNaTela = computed(() => {
  const chegada = entrada(0.1, 0.5, 40)
  const saida = suave((duracaoAtual.value - local.value) / 0.3)
  return { ...chegada, opacity: Math.min(chegada.opacity, saida) }
})

const visibilidade = computed(() => {
  const chegada = suave(local.value / 0.35)
  const saida = suave((duracaoAtual.value - local.value) / 0.3)
  return Math.min(chegada, saida)
})

const palco = computed(() => {
  const progresso = suave(local.value / 0.7)
  return { opacity: progresso, transform: `scale(${0.86 + progresso * 0.14}) rotate(${(1 - progresso) * -4}deg)` }
})

function palavras(texto: string) {
  return texto.split(' ').map((palavra, posicao) => ({ palavra, estilo: entrada(0.15 + posicao * 0.07, 0.5, 44) }))
}

const bolhas = computed(() =>
  [
    { tamanho: 520, x: 0.12, y: 0.2, fase: 0 },
    { tamanho: 380, x: 0.85, y: 0.75, fase: 2 },
    { tamanho: 260, x: 0.7, y: 0.1, fase: 4 },
  ].map(({ tamanho, x, y, fase }) => ({
    width: `${tamanho}px`,
    height: `${tamanho}px`,
    left: `${x * 1280 - tamanho / 2 + Math.sin(tempo.value * 0.35 + fase) * 40}px`,
    top: `${y * 720 - tamanho / 2 + Math.cos(tempo.value * 0.3 + fase) * 30}px`,
  })),
)

const linhaAbertura = computed(() => `${suave((local.value - 0.9) / 0.8) * 220}px`)

const progressoTotal = computed(() => Math.min(1, tempo.value / total))

async function posicionar(segundos: number) {
  tempo.value = Math.min(segundos, total - 0.001)
  await nextTick()
  for (const animacao of document.getAnimations()) {
    animacao.pause()
    animacao.currentTime = local.value * 1000
  }
}

Object.assign(window, { posicionar, duracaoTotal: total })

onMounted(async () => {
  await document.fonts.ready
  await posicionar(0)
  window.pronto = true
})
</script>

<template>
  <div
    class="filme"
    :style="{
      '--escuro': paleta.escuro,
      '--medio': paleta.medio,
      '--destaque': paleta.destaque,
    }"
  >
    <div v-for="(estilo, posicao) in bolhas" :key="posicao" class="bolha" :style="estilo" />

    <header class="topo">
      <span class="selos"><span class="selo-curso"><component :is="icone" :size="30" weight="bold" />{{ curso.titulo }}</span><span class="selo-nivel">Nível {{ nomeDoNivel(licao.nivel).toLowerCase() }}</span></span>
      <span class="marca">SBV</span>
    </header>

    <section v-if="trecho.tipo === 'abertura'" :key="`a-${indice}`" class="abertura" :style="{ opacity: visibilidade }">
      <div class="icone-grande" :style="palco"><component :is="icone" :size="120" weight="bold" /></div>
      <p class="rotulo-filme" :style="entrada(0.3)">Lição · Nível {{ nomeDoNivel(licao.nivel).toLowerCase() }}</p>
      <h1 class="titulo-abertura">
        <span v-for="(item, posicao) in palavras(licao.titulo)" :key="posicao" :style="item.estilo">{{ item.palavra }}&nbsp;</span>
      </h1>
      <div class="linha" :style="{ width: linhaAbertura }" />
      <p class="objetivo" :style="entrada(1.4)">{{ licao.objetivo }}</p>
    </section>

    <section v-else-if="cena" :key="`c-${indice}`" class="cena-filme" :style="{ opacity: visibilidade }">
      <div class="cartao" :style="palco">
        <CenaDesenhada v-if="cena.desenho" :cena="cena.desenho" modo="animando" :descricao="cena.titulo" />
        <IlustracaoCena v-else-if="cena.ilustracao" :ilustracao="cena.ilustracao" modo="animando" :descricao="cena.titulo" />
      </div>
      <div class="texto-filme">
        <p class="rotulo-filme" :style="entrada(0.1)">Parte {{ (trecho.indiceCena ?? 0) + 1 }} de {{ totalCenas }}</p>
        <h2 class="titulo-cena">
          <span v-for="(item, posicao) in palavras(cena.titulo)" :key="posicao" :style="item.estilo">{{ item.palavra }}&nbsp;</span>
        </h2>
        <p class="frase" :style="entrada(0.9)">{{ cena.texto }}</p>
      </div>
    </section>

    <section
      v-else-if="trecho.tipo === 'parte' || trecho.tipo === 'erro'"
      :key="`q-${indice}`"
      class="quadro-filme"
      :class="{ erros: trecho.tipo === 'erro' }"
      :style="{ opacity: quadro.novaParte ? visibilidade : 1 }"
    >
      <p class="rotulo-filme" :style="quadro.novaParte ? entrada(0.05) : {}">{{ quadro.rotulo }}</p>
      <h2 class="titulo-quadro" :style="quadro.novaParte ? entrada(0.15) : {}">{{ quadro.titulo }}</h2>
      <div class="corpo-quadro">
        <div class="cartao-quadro" :style="quadro.novaParte ? palco : {}">
          <CenaDesenhada v-if="quadro.cena?.desenho" :cena="quadro.cena.desenho" modo="estatico" :descricao="quadro.cena.titulo" />
          <IlustracaoCena
            v-else-if="quadro.cena?.ilustracao"
            :ilustracao="quadro.cena.ilustracao"
            modo="estatico"
            :descricao="quadro.cena.titulo"
          />
        </div>
        <div class="lousa">
          <p class="item-lousa" :style="{ ...itemNaTela, fontSize: `${quadro.tamanho}px` }">
            <span v-if="trecho.tipo === 'erro'" class="marca-item erro-marca">✕</span>
            <span v-else-if="quadro.item.numero" class="marca-item">{{ quadro.item.numero }}</span>
            <span v-else class="marca-item barra-item" />
            <span class="texto-item">{{ quadro.item.texto }}</span>
          </p>
          <span v-if="quadro.pontos.length > 1" class="pontos-lousa">
            <span v-for="(ligado, posicao) in quadro.pontos" :key="posicao" class="ponto-lousa" :class="{ ligado }" />
          </span>
        </div>
      </div>
    </section>

    <section v-else :key="`e-${indice}`" class="abertura" :style="{ opacity: visibilidade }">
      <div class="icone-grande" :style="palco"><component :is="icone" :size="120" weight="bold" /></div>
      <h1 class="titulo-abertura">
        <span v-for="(item, posicao) in palavras('Agora é com você')" :key="posicao" :style="item.estilo">{{ item.palavra }}&nbsp;</span>
      </h1>
      <p class="objetivo final" :style="entrada(0.9)">Consulte o passo a passo por escrito e faça o teste rápido no app SBV.</p>
      <p class="creditos" :style="entrada(1.6)">Narração: {{ VOZ_NARRACAO }} · Animação: app SBV</p>
    </section>

    <footer class="progresso-filme">
      <span class="trilho">
        <span class="enchido" :style="{ width: `${progressoTotal * 100}%` }" />
      </span>
    </footer>
  </div>
</template>

<style>
.quadro-filme {
  position: absolute;
  inset: 0;
  padding: 104px 90px 90px;
}

.titulo-quadro {
  margin: 0 0 22px;
  font-size: 46px;
  line-height: 1.1;
}

.corpo-quadro {
  display: flex;
  gap: 32px;
  height: 400px;
}

.cartao-quadro {
  flex: none;
  width: 280px;
  height: 280px;
  align-self: center;
  overflow: hidden;
  border-radius: 32px;
  background: #ffffff;
  box-shadow: 0 0 0 8px color-mix(in srgb, var(--destaque) 45%, transparent);
}

.lousa {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 28px 40px 52px;
  border-radius: 32px;
  background: #ffffff;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
}

.item-lousa {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin: 0;
  color: var(--escuro);
  font-weight: 700;
  line-height: 1.28;
}

.marca-item {
  display: flex;
  flex: none;
  width: 58px;
  height: 58px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--destaque);
  color: var(--escuro);
  font-size: 34px;
  font-weight: 700;
}

.barra-item {
  width: 12px;
  height: 58px;
  border-radius: 6px;
}

.pontos-lousa {
  position: absolute;
  left: 40px;
  bottom: 24px;
  display: flex;
  gap: 12px;
}

.ponto-lousa {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--escuro) 18%, #ffffff);
}

.ponto-lousa.ligado {
  width: 40px;
  border-radius: 7px;
  background: var(--escuro);
}

.erro-marca {
  background: #ffd6d6;
  color: #b3261e;
}

.erros .erro-marca {
  background: #e5484d;
  color: #ffffff;
}

.texto-item {
  padding-top: 4px;
}

html,
body {
  margin: 0;
  background: #000;
}

.filme {
  --papel: #ffffff;
  --tinta: var(--escuro);
  --relevo: color-mix(in srgb, var(--destaque) 35%, #ffffff);
  --font-sans: 'Atkinson Hyperlegible', sans-serif;
  position: relative;
  width: 1280px;
  height: 720px;
  overflow: hidden;
  font-family: var(--font-sans);
  color: #ffffff;
  background: radial-gradient(circle at 30% 20%, var(--medio), var(--escuro) 70%);
}

.bolha {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--destaque) 26%, transparent), transparent 70%);
}

.topo {
  position: absolute;
  inset: 32px 48px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.selos {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.selo-nivel {
  padding: 10px 18px;
  border: 2px solid var(--destaque);
  border-radius: 999px;
  color: var(--destaque);
  font-size: 22px;
  font-weight: 700;
}

.selo-curso {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 24px;
  font-weight: 700;
}

.marca {
  padding: 8px 18px;
  border-radius: 12px;
  background: var(--destaque);
  color: var(--escuro);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 2px;
}

.abertura {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 120px;
  text-align: center;
}

.icone-grande {
  display: flex;
  width: 190px;
  height: 190px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--destaque);
  color: var(--escuro);
  box-shadow: 0 0 0 18px color-mix(in srgb, var(--destaque) 25%, transparent);
  margin-bottom: 34px;
}

.rotulo-filme {
  margin: 0 0 10px;
  color: var(--destaque);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
}

.titulo-abertura {
  margin: 0;
  font-size: 66px;
  line-height: 1.1;
}

.titulo-abertura span,
.titulo-cena span {
  display: inline-block;
}

.linha {
  height: 8px;
  margin: 26px 0 22px;
  border-radius: 8px;
  background: var(--destaque);
}

.objetivo {
  margin: 0;
  max-width: 900px;
  font-size: 32px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.9);
}

.objetivo.final {
  margin-top: 24px;
}

.creditos {
  position: absolute;
  bottom: 70px;
  margin: 0;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.cena-filme {
  position: absolute;
  inset: 0;
}

.cartao {
  position: absolute;
  left: 80px;
  top: 120px;
  width: 500px;
  height: 500px;
  overflow: hidden;
  border-radius: 40px;
  background: #ffffff;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.35),
    0 0 0 10px color-mix(in srgb, var(--destaque) 45%, transparent);
}

.cartao > * {
  width: 100%;
}

.texto-filme {
  position: absolute;
  left: 650px;
  right: 70px;
  top: 150px;
  bottom: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titulo-cena {
  margin: 0 0 22px;
  font-size: 56px;
  line-height: 1.12;
}

.frase {
  margin: 0;
  font-size: 32px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.92);
}

.progresso-filme {
  position: absolute;
  left: 80px;
  right: 80px;
  bottom: 42px;
  display: flex;
  gap: 12px;
}

.trilho {
  flex: 1;
  height: 10px;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
}

.enchido {
  display: block;
  height: 100%;
  background: var(--destaque);
}
</style>
