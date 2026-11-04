<script setup lang="ts">
import { computed } from 'vue'
import type { CenaDesenhada, PecaCena } from '../../domain/conteudo/desenho'
import { DESENHO } from '../desenhos'

const props = defineProps<{ cena: CenaDesenhada; modo: 'animando' | 'pausado' | 'estatico'; descricao: string }>()

function marcarTracos(svg: string, tracarTudo: boolean): string {
  const comTracos = svg.replace(/<path class="([^"]*\btraco\b[^"]*)"/g, '<path pathLength="1" class="$1"')
  if (!tracarTudo) return comTracos
  return comTracos.replace(/<(path|circle|rect|ellipse|line) class="(t|c|r)( [^"]*)?"/g, '<$1 pathLength="1" class="$2$3 traco"')
}

function montar(peca: PecaCena, indice: number) {
  const desenho = DESENHO[peca.desenho]
  const altura = (peca.largura * desenho.altura) / desenho.largura
  const svg = marcarTracos(desenho.svg, peca.movimento === 'tracar')
  const [dx, dy] = peca.vindoDe ?? [0, 0]
  return {
    chave: `${peca.desenho}-${indice}`,
    externo: {
      left: `${peca.x - peca.largura / 2}%`,
      top: `${peca.y - altura / 2}%`,
      width: `${peca.largura}%`,
      transform: `rotate(${peca.giro ?? 0}deg) scaleX(${peca.espelhar ? -1 : 1})`,
    },
    interno: {
      '--atraso': `${peca.atraso ?? 0}s`,
      '--dx': `${dx}cqw`,
      '--dy': `${dy}cqw`,
    },
    classe: [peca.movimento ? `mov-${peca.movimento}` : '', svg.includes('manopla') ? 'tem-manopla' : ''],
    viewBox: `0 0 ${desenho.largura} ${desenho.altura}`,
    svg,
  }
}

const pecas = computed(() => props.cena.pecas.map(montar))
</script>

<template>
  <div class="cena-d" :class="modo" role="img" :aria-label="descricao">
    <div class="camera">
      <div v-for="peca in pecas" :key="peca.chave" class="peca-d" :style="peca.externo">
        <div class="mov" :class="peca.classe" :style="peca.interno">
          <svg :viewBox="peca.viewBox" aria-hidden="true" v-html="peca.svg" />
        </div>
      </div>
      <p
        v-for="rotulo in cena.rotulos"
        :key="rotulo.texto"
        class="rotulo-d"
        :class="{ destaque: rotulo.destaque }"
        :style="{
          left: `${rotulo.x}%`,
          top: `${rotulo.y}%`,
          fontSize: `${rotulo.tamanho ?? 7}cqw`,
          '--atraso': `${rotulo.atraso ?? 0}s`,
        }"
      >
        {{ rotulo.texto }}
      </p>
    </div>
  </div>
</template>

<style>
.cena-d {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  container-type: inline-size;
  background: var(--papel);
  color: var(--tinta);
}

.cena-d .camera {
  position: absolute;
  inset: 0;
  transform-origin: 50% 55%;
}

.cena-d.animando .camera {
  animation: cena-aproximar 9s linear both;
}

.cena-d .peca-d {
  position: absolute;
}

.cena-d .mov,
.cena-d svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.cena-d .c,
.cena-d .r,
.cena-d .t,
.cena-d .t-p {
  stroke-width: 4;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.cena-d .c {
  fill: var(--papel);
  stroke: var(--tinta);
}

.cena-d .r {
  fill: var(--relevo);
  stroke: var(--tinta);
}

.cena-d .t {
  fill: none;
  stroke: var(--tinta);
}

.cena-d .t-p {
  fill: none;
  stroke: var(--papel);
}

.cena-d .f {
  fill: var(--tinta);
}

.cena-d .p {
  fill: var(--papel);
}

.cena-d .fino {
  stroke-width: 2.5;
}

.cena-d .grosso {
  stroke-width: 6;
}

.cena-d .agua {
  fill: var(--relevo);
  stroke: none;
}

.cena-d .brilho {
  fill: var(--relevo);
}

.cena-d .letra,
.cena-d .letra-p {
  fill: var(--tinta);
  font-family: var(--font-sans);
  font-weight: 700;
  text-anchor: middle;
}

.cena-d .letra {
  font-size: 22px;
}

.cena-d .letra-p {
  font-size: 9px;
  letter-spacing: 0.5px;
}

.cena-d .fio-capa {
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
}

.cena-d .fase {
  stroke: #1a1a1a;
}

.cena-d .neutro {
  stroke: #5aa9e6;
}

.cena-d .terra {
  stroke: #3fa34d;
}

.cena-d .terra-listra {
  stroke: #e8d33f;
  stroke-dasharray: 7 7;
  stroke-width: 6;
}

.cena-d .retorno {
  stroke: #b0b0b0;
}

.cena-d .letra {
  paint-order: stroke;
  stroke: var(--papel);
  stroke-width: 5px;
}

.cena-d .cobre {
  fill: none;
  stroke: #c47a2c;
  stroke-width: 5;
  stroke-linecap: round;
}

.cena-d .cobre-cheio {
  fill: #c47a2c;
}

.cena-d .camara-tubo {
  stroke-width: 14;
  stroke: var(--relevo);
}

.cena-d .bolha-sobe {
  fill: none;
  stroke: var(--tinta);
  stroke-width: 2;
}

.cena-d .gota-cai {
  fill: var(--tinta);
}

.cena-d .rotulo-d {
  position: absolute;
  margin: 0;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  font-weight: 700;
  line-height: 1.05;
}

.cena-d .rotulo-d.destaque {
  padding: 1.2cqw 2.4cqw;
  border-radius: 1.6cqw;
  background: var(--tinta);
  color: var(--papel);
}

.cena-d.animando .rotulo-d,
.cena-d.pausado .rotulo-d {
  animation: cena-surgir 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: var(--atraso);
}

.cena-d .luz {
  opacity: 0;
}

.cena-d .mov-acender .luz {
  opacity: 1;
}

.cena-d .mov-desligar .alavanca {
  transform: translateY(18px);
}

.cena-d .mov {
  animation-delay: var(--atraso);
  animation-fill-mode: both;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}

.cena-d .mov-entrar {
  animation-name: cena-entrar;
}

.cena-d .mov-surgir {
  animation-name: cena-surgir;
}

.cena-d .mov-cair {
  animation-name: cena-cair;
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(0.3, 1.35, 0.5, 1);
}

.cena-d .mov-deslizar {
  animation-name: cena-deslizar;
  animation-duration: 1.4s;
  animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1);
}

.cena-d .mov-pulsar {
  animation-name: cena-pulsar;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.cena-d .mov-tremer {
  animation-name: cena-tremer;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
}

.cena-d .mov-girar {
  animation-name: cena-girar;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.cena-d .mov-balancar {
  animation-name: cena-balancar;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.cena-d .mov-apertar:not(.tem-manopla) {
  animation-name: cena-apertar;
  animation-duration: 1s;
  animation-iteration-count: 4;
  animation-timing-function: ease-in-out;
  transform-origin: 50% 50%;
}

.cena-d .mov-apertar .manopla {
  animation: cena-girar-manopla 1.2s ease-in-out 3 both;
  animation-delay: var(--atraso);
}

.cena-d .mov-crescer {
  animation-name: cena-crescer;
  animation-duration: 2.2s;
  transform-origin: 50% 100%;
}

.cena-d .mov-pingar {
  animation-name: cena-pingar;
  animation-duration: 1.1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.5, 0, 1, 0.6);
}

.cena-d .mov-piscar {
  animation-name: cena-piscar;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.cena-d .mov-empurrar {
  animation-name: cena-empurrar;
  animation-duration: 0.6s;
  animation-iteration-count: 6;
  animation-timing-function: ease-in-out;
}

.cena-d .mov-acender {
  animation: none;
}

.cena-d .mov-acender .luz {
  animation: cena-acender 0.6s ease-out both;
  animation-delay: var(--atraso);
}

.cena-d .mov-desligar .alavanca {
  animation: cena-desligar 0.5s cubic-bezier(0.5, 0, 0.3, 1.4) both;
  animation-delay: var(--atraso);
}

.cena-d .traco {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: cena-tracar 1.6s ease-in-out both;
  animation-delay: var(--atraso, 0s);
}

.cena-d .mov-tracar {
  animation: none;
}

.cena-d .circuito {
  fill: none;
  stroke: var(--tinta);
  stroke-width: 3;
  stroke-dasharray: 1;
  animation-duration: 1.2s;
}

.cena-d .fita-rosca {
  fill: none;
  stroke: var(--relevo);
  stroke-width: 5;
  animation-duration: 2.4s;
}

.cena-d .fita {
  animation: cena-surgir 0.7s ease-out both;
  animation-delay: calc(var(--atraso, 0s) + 1.4s);
}

.cena-d .gota-cai {
  animation: cena-gota 1.2s cubic-bezier(0.5, 0, 1, 0.6) infinite both;
}

.cena-d .gota-cai.longe {
  animation-name: cena-gota-longe;
}

.cena-d .gira-dentro {
  animation: cena-girar 4s linear infinite;
}

.cena-d .gira-dentro.lento {
  animation-duration: 8s;
}

.cena-d .bolha-sobe {
  animation: cena-bolha 1.5s ease-out infinite both;
}

.cena-d .empurra-dentro {
  animation: cena-pistao 0.8s ease-in-out infinite;
}

.cena-d .cresce-dentro {
  animation: cena-crescer 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.cena-d .chama {
  transform-origin: 65px 116px;
  animation: cena-chama 0.45s ease-in-out infinite alternate;
}

.cena-d .porca {
  animation: cena-porca 2.4s ease-in-out infinite both;
}

.cena-d.pausado *,
.cena-d.pausado {
  animation-play-state: paused !important;
}

.cena-d.estatico *,
.cena-d.estatico {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .cena-d *,
  .cena-d {
    animation: none !important;
  }
}

@keyframes cena-aproximar {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

@keyframes cena-entrar {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes cena-surgir {
  from {
    opacity: 0;
    translate: 0 4cqw;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes cena-cair {
  from {
    opacity: 0;
    transform: translateY(-40cqw);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cena-deslizar {
  from {
    transform: translate(var(--dx), var(--dy));
  }
  to {
    transform: translate(0, 0);
  }
}

@keyframes cena-pulsar {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes cena-tremer {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-1.2cqw) rotate(-2deg);
  }
  75% {
    transform: translateX(1.2cqw) rotate(2deg);
  }
}

@keyframes cena-girar {
  to {
    transform: rotate(360deg);
  }
}

@keyframes cena-balancar {
  0%,
  100% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
}

@keyframes cena-apertar {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-28deg);
  }
}

@keyframes cena-girar-manopla {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
}

@keyframes cena-crescer {
  from {
    transform: scale(0.1, 0);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes cena-pingar {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  to {
    transform: translateY(26cqw);
    opacity: 0;
  }
}

@keyframes cena-piscar {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}

@keyframes cena-empurrar {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3cqw);
  }
}

@keyframes cena-acender {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes cena-desligar {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(18px);
  }
}

@keyframes cena-tracar {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes cena-gota {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  to {
    transform: translateY(26px);
    opacity: 0;
  }
}

@keyframes cena-gota-longe {
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
  to {
    transform: translate(4px, 44px);
    opacity: 0;
  }
}

@keyframes cena-bolha {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-22px);
    opacity: 0;
  }
}

@keyframes cena-pistao {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(28px);
  }
}

@keyframes cena-chama {
  from {
    transform: scaleY(0.88);
  }
  to {
    transform: scaleY(1.08);
  }
}

@keyframes cena-porca {
  0%,
  100% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.25);
  }
  30% {
    transform: scale(1);
  }
}
</style>
