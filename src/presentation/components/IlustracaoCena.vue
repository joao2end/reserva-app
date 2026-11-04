<script setup lang="ts">
import {
  PhBaby,
  PhCalendar,
  PhCaretRight,
  PhCheck,
  PhDrop,
  PhEyedropper,
  PhGrains,
  PhHand,
  PhJar,
  PhLeaf,
  PhPackage,
  PhPerson,
  PhSnowflake,
  PhSun,
  PhThermometer,
  PhTimer,
} from '@phosphor-icons/vue'
import type { IlustracaoId } from '../../domain/conteudo/videos'

defineProps<{ ilustracao: IlustracaoId; modo: 'animando' | 'pausado' | 'estatico'; descricao: string }>()
</script>

<template>
  <div class="palco" :class="modo" role="img" :aria-label="descricao">
    <template v-if="ilustracao === 'lugar-fresco'">
      <div class="peca ani aparecer" style="left: 6%; top: 10%; width: 40%">
        <PhThermometer size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 2%; width: 48%; top: 64%; font-size: 13cqw; animation-delay: 0.5s">
        &lt; 25 °C
      </p>
      <div class="peca ani aparecer" style="left: 60%; top: 6%; width: 30%; animation-delay: 0.9s">
        <PhSun size="100%" weight="bold" />
        <span class="risco"><span class="linha ani riscar" style="animation-delay: 1.6s" /></span>
      </div>
      <p class="peca texto ani surgir" style="left: 52%; width: 46%; top: 39%; font-size: 6cqw; animation-delay: 1.2s">SOL</p>
      <div class="peca ani aparecer" style="left: 61%; top: 52%; width: 28%; animation-delay: 2.2s">
        <PhDrop size="100%" weight="bold" />
        <span class="risco"><span class="linha ani riscar" style="animation-delay: 2.9s" /></span>
      </div>
      <p class="peca texto ani surgir" style="left: 52%; width: 46%; top: 84%; font-size: 6cqw; animation-delay: 2.5s">UMIDADE</p>
    </template>

    <template v-else-if="ilustracao === 'prateleira'">
      <div class="peca barra" style="left: 4%; width: 92%; top: 90%; height: 1.6cqw" />
      <div class="peca barra" style="left: 12%; width: 76%; top: 56%; height: 3.5cqw" />
      <div class="peca barra" style="left: 15%; width: 3cqw; top: 56%; height: 34%" />
      <div class="peca barra" style="left: 82%; width: 3cqw; top: 56%; height: 34%" />
      <div class="peca ani cair" style="left: 32%; top: 22%; width: 36%; animation-delay: 0.3s">
        <PhPackage size="100%" weight="bold" />
      </div>
      <div class="peca barra ani encher" style="left: 49%; width: 1.2cqw; top: 61%; height: 28%; animation-delay: 1.3s" />
      <p class="peca texto ani surgir" style="left: 54%; width: 26%; top: 68%; font-size: 8cqw; animation-delay: 1.8s">20 cm</p>
    </template>

    <template v-else-if="ilustracao === 'garrafa-pet'">
      <div class="peca ani inclinar" style="left: 14%; top: 4%; width: 32%">
        <PhGrains size="100%" weight="bold" />
      </div>
      <span
        v-for="grao in 5"
        :key="grao"
        class="peca grao ani pingar"
        :style="{ left: `${48 + (grao % 3) * 2}%`, top: '26%', animationDelay: `${0.6 + grao * 0.35}s` }"
      />
      <div class="peca barra" style="left: 46%; top: 34%; width: 14%; height: 5%" />
      <div class="peca contorno" style="left: 48%; top: 39%; width: 10%; height: 8%; border-bottom: 0" />
      <div class="peca contorno garrafa" style="left: 37%; top: 46%; width: 32%; height: 46%">
        <div class="enchimento ani encher" style="height: 72%; animation-delay: 0.9s; animation-duration: 2.6s" />
      </div>
    </template>

    <template v-else-if="ilustracao === 'congelar'">
      <div class="peca contorno arredondado" style="left: 6%; top: 8%; width: 52%; height: 70%">
        <div class="peca ani girar" style="left: 22%; top: 8%; width: 56%">
          <PhSnowflake size="100%" weight="bold" />
        </div>
        <div class="peca ani aparecer" style="left: 30%; top: 58%; width: 40%; animation-delay: 0.3s">
          <PhJar size="100%" weight="bold" />
        </div>
      </div>
      <div
        v-for="dia in 3"
        :key="dia"
        class="peca dia ani preencher"
        :style="{ left: '66%', top: `${8 + (dia - 1) * 24}%`, width: '26%', height: '20%', animationDelay: `${0.6 + dia * 1.1}s` }"
      >
        {{ dia }}
      </div>
      <p class="peca texto ani surgir" style="left: 4%; width: 92%; top: 82%; font-size: 10cqw; animation-delay: 4s">3 dias</p>
    </template>

    <template v-else-if="ilustracao === 'louro'">
      <div class="peca" style="left: 22%; top: 30%; width: 56%">
        <PhJar size="100%" weight="bold" />
      </div>
      <div class="peca ani cair-girando" style="left: 34%; top: 54%; width: 16%; animation-delay: 0.4s">
        <PhLeaf size="100%" weight="fill" />
      </div>
      <div class="peca ani cair-girando" style="left: 50%; top: 58%; width: 14%; animation-delay: 1.4s">
        <PhLeaf size="100%" weight="fill" />
      </div>
      <p class="peca texto ani surgir" style="left: 4%; width: 92%; top: 4%; font-size: 9cqw; animation-delay: 2.4s">LOURO OU ALHO</p>
    </template>

    <template v-else-if="ilustracao === 'rodizio'">
      <p class="peca rotulo-palco" style="left: 4%; top: 6%">ATRÁS</p>
      <div class="peca barra" style="left: 4%; width: 92%; top: 46%; height: 1cqw; opacity: 0.35" />
      <p class="peca rotulo-palco" style="left: 4%; top: 52%">FRENTE</p>
      <div class="peca ani entrar-direita" style="left: 54%; top: 6%; width: 26%; animation-delay: 0.3s">
        <PhJar size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 48%; width: 38%; top: 34%; font-size: 6.5cqw; animation-delay: 0.9s">NOVO</p>
      <div class="peca" style="left: 18%; top: 56%; width: 26%">
        <PhJar size="100%" weight="fill" />
      </div>
      <p class="peca texto" style="left: 12%; width: 38%; top: 84%; font-size: 6.5cqw">ANTIGO</p>
      <div class="peca ani empurrar" style="left: 50%; top: 58%; width: 18%; animation-delay: 1.5s">
        <PhHand size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 46%; width: 52%; top: 80%; font-size: 6.5cqw; animation-delay: 1.9s">
        USE PRIMEIRO
      </p>
    </template>

    <template v-else-if="ilustracao === 'etiqueta'">
      <div class="peca" style="left: 18%; top: 14%; width: 64%">
        <PhJar size="100%" weight="bold" />
      </div>
      <div class="peca etiqueta ani colar" style="left: 29%; top: 52%; width: 42%; height: 24%; animation-delay: 0.4s">
        <span style="font-size: 7cqw">ARROZ</span>
        <span style="font-size: 5cqw">03/11/26</span>
      </div>
      <div class="peca selo ani aparecer" style="left: 72%; top: 8%; width: 20%; animation-delay: 1.7s">
        <PhCheck size="70%" weight="bold" />
      </div>
    </template>

    <template v-else-if="ilustracao === 'quatro-litros'">
      <div class="peca ani aparecer" style="left: 4%; top: 14%; width: 38%">
        <PhPerson size="100%" weight="bold" />
      </div>
      <div
        v-for="litro in 4"
        :key="litro"
        class="peca ani aparecer"
        :style="{
          left: `${litro % 2 ? 48 : 72}%`,
          top: `${litro <= 2 ? 8 : 38}%`,
          width: '22%',
          animationDelay: `${0.3 + litro * 0.5}s`,
        }"
      >
        <PhDrop size="100%" :weight="litro <= 2 ? 'fill' : 'bold'" />
      </div>
      <p class="peca texto ani surgir" style="left: 44%; width: 54%; top: 66%; font-size: 15cqw; animation-delay: 2.6s">4 L</p>
      <p class="peca texto ani surgir" style="left: 44%; width: 54%; top: 86%; font-size: 6cqw; animation-delay: 2.9s">POR DIA</p>
    </template>

    <template v-else-if="ilustracao === 'hipoclorito'">
      <div class="peca ani surgir" style="left: 30%; top: 0%; width: 26%">
        <div class="conta-gotas"><PhEyedropper size="100%" weight="bold" /></div>
      </div>
      <div
        v-for="gota in 2"
        :key="gota"
        class="peca ani pingar"
        :style="{ left: '37%', top: '26%', width: '7%', animationDelay: `${0.5 + gota * 0.9}s`, animationIterationCount: 1 }"
      >
        <PhDrop size="100%" weight="fill" />
      </div>
      <div class="peca contorno copo" style="left: 22%; top: 44%; width: 36%; height: 44%">
        <div class="enchimento" style="height: 62%; opacity: 0.35" />
      </div>
      <div class="peca ani aparecer" style="left: 64%; top: 40%; width: 30%; animation-delay: 2.8s">
        <PhTimer size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 58%; width: 42%; top: 78%; font-size: 9cqw; animation-delay: 3.2s">30 min</p>
    </template>

    <template v-else-if="ilustracao === 'guardar-agua'">
      <div class="peca barra" style="left: 25%; top: 16%; width: 14%; height: 8%" />
      <div class="peca contorno galao ani aparecer" style="left: 10%; top: 24%; width: 44%; height: 64%">
        <div class="peca" style="left: 28%; top: 30%; width: 44%">
          <PhDrop size="100%" weight="bold" />
        </div>
      </div>
      <div class="peca ani aparecer" style="left: 62%; top: 6%; width: 28%; animation-delay: 0.8s">
        <PhSun size="100%" weight="bold" />
        <span class="risco"><span class="linha ani riscar" style="animation-delay: 1.5s" /></span>
      </div>
      <div class="peca ani aparecer" style="left: 64%; top: 50%; width: 24%; animation-delay: 2.2s">
        <PhCalendar size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 56%; width: 42%; top: 80%; font-size: 7.5cqw; animation-delay: 2.6s">6 meses</p>
    </template>

    <template v-else-if="ilustracao === 'beber-agua'">
      <div class="peca contorno copo" style="left: 28%; top: 10%; width: 44%; height: 66%">
        <div class="enchimento ani encher" style="height: 80%; animation-delay: 0.3s; animation-duration: 2.4s" />
      </div>
      <p class="peca texto ani surgir" style="left: 4%; width: 92%; top: 80%; font-size: 11cqw; animation-delay: 2.7s">
        mín. 1 L
      </p>
    </template>

    <template v-else-if="ilustracao === 'ordem-comer'">
      <div class="peca ani aparecer" style="left: 4%; top: 12%; width: 26%; height: 50%; animation-delay: 0.2s">
        <div class="contorno arredondado geladeira" />
      </div>
      <div class="peca ani surgir" style="left: 30.5%; top: 30%; width: 6%; animation-delay: 1.3s">
        <PhCaretRight size="100%" weight="bold" />
      </div>
      <div class="peca contorno arredondado ani aparecer" style="left: 37%; top: 24%; width: 26%; height: 38%; animation-delay: 1.8s">
        <div class="peca" style="left: 15%; top: 15%; width: 70%">
          <PhSnowflake size="100%" weight="bold" />
        </div>
      </div>
      <div class="peca ani surgir" style="left: 63.5%; top: 30%; width: 6%; animation-delay: 2.9s">
        <PhCaretRight size="100%" weight="bold" />
      </div>
      <div class="peca contorno arredondado ani aparecer" style="left: 70%; top: 24%; width: 26%; height: 38%; animation-delay: 3.4s">
        <div class="peca" style="left: 15%; top: 15%; width: 70%">
          <PhGrains size="100%" weight="bold" />
        </div>
      </div>
      <p
        v-for="(ordem, posicao) in ['1º', '2º', '3º']"
        :key="ordem"
        class="peca texto ani surgir"
        :style="{ left: `${4 + posicao * 33}%`, width: '26%', top: '68%', fontSize: '12cqw', animationDelay: `${0.5 + posicao * 1.6}s` }"
      >
        {{ ordem }}
      </p>
    </template>

    <template v-else-if="ilustracao === 'metade'">
      <div class="peca contorno prato" style="left: 14%; top: 6%; width: 72%; aspect-ratio: 1">
        <div class="metade-esquerda" />
        <div class="metade-direita ani sumir" style="animation-delay: 1.2s" />
      </div>
      <p class="peca texto ani surgir" style="left: 4%; width: 92%; top: 82%; font-size: 12cqw; animation-delay: 2.4s">½</p>
    </template>

    <template v-else-if="ilustracao === 'quem-nao-corta'">
      <div class="peca ani aparecer" style="left: 6%; top: 10%; width: 36%">
        <PhBaby size="100%" weight="bold" />
      </div>
      <div class="peca ani aparecer" style="left: 56%; top: 10%; width: 36%; animation-delay: 0.4s">
        <PhPerson size="100%" weight="bold" />
      </div>
      <p class="peca texto" style="left: 0%; width: 48%; top: 52%; font-size: 7cqw">CRIANÇA</p>
      <p class="peca texto" style="left: 50%; width: 50%; top: 52%; font-size: 7cqw">GESTANTE</p>
      <div class="peca selo ani aparecer" style="left: 30%; top: 4%; width: 16%; animation-delay: 1.1s">
        <PhCheck size="70%" weight="bold" />
      </div>
      <div class="peca selo ani aparecer" style="left: 80%; top: 4%; width: 16%; animation-delay: 1.5s">
        <PhCheck size="70%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 4%; width: 92%; top: 76%; font-size: 8cqw; animation-delay: 2s">COMEM O NORMAL</p>
    </template>

    <template v-else-if="ilustracao === 'sem-sal'">
      <div class="peca saleiro-tampa" style="left: 35%; top: 10%; width: 30%; height: 14%">
        <span v-for="furo in 3" :key="furo" class="furo" />
      </div>
      <div class="peca contorno saleiro" style="left: 31%; top: 24%; width: 38%; height: 54%">SAL</div>
      <span class="risco grande" style="left: 18%; top: 47%; width: 64%">
        <span class="linha ani riscar" style="animation-delay: 1s" />
      </span>
      <div class="peca ani aparecer" style="left: 74%; top: 60%; width: 18%; animation-delay: 2s">
        <PhDrop size="100%" weight="fill" />
      </div>
    </template>

    <template v-else-if="ilustracao === 'porcao-do-dia'">
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 4%; font-size: 14cqw; animation-delay: 0.2s">10 kg</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 26%; font-size: 10cqw; animation-delay: 1.2s">÷ 40 dias</p>
      <div class="peca barra ani riscar" style="left: 14%; width: 72%; top: 48%; height: 1.4cqw; animation-delay: 2.1s" />
      <p class="peca texto ani aparecer" style="left: 0; width: 100%; top: 54%; font-size: 16cqw; animation-delay: 2.6s">250 g</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 82%; font-size: 8cqw; animation-delay: 3.3s">POR DIA</p>
    </template>
























  </div>
</template>

<style scoped>
.palco {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  container-type: inline-size;
  background: var(--papel);
  color: var(--tinta);
}

.peca {
  position: absolute;
}

.peca > svg {
  display: block;
}

.texto {
  margin: 0;
  text-align: center;
  font-weight: 700;
  line-height: 1;
}

.rotulo-palco {
  margin: 0;
  font-size: 5cqw;
  font-weight: 700;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.barra {
  background: var(--tinta);
}

.contorno {
  border: 1.5cqw solid var(--tinta);
  overflow: hidden;
}

.arredondado {
  border-radius: 3cqw;
}

.garrafa {
  border-radius: 5cqw;
}

.galao {
  border-radius: 4cqw;
}

.copo {
  border-top: 0;
  border-radius: 0 0 4cqw 4cqw;
}

.prato {
  border-radius: 50%;
}

.enchimento {
  position: absolute;
  inset: auto 0 0 0;
  background: var(--tinta);
  transform-origin: bottom;
}

.grao {
  width: 2.6cqw;
  height: 2.6cqw;
  border-radius: 50%;
  background: var(--tinta);
  opacity: 0;
}

.geladeira {
  position: relative;
  height: 100%;
}

.geladeira::before {
  content: '';
  position: absolute;
  inset: 34% 0 auto 0;
  height: 1.5cqw;
  background: var(--tinta);
}

.geladeira::after {
  content: '';
  position: absolute;
  left: 14%;
  top: 10%;
  width: 1.5cqw;
  height: 14%;
  background: var(--tinta);
}

.dia {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.2cqw solid var(--tinta);
  background: var(--tinta);
  color: var(--papel);
  font-size: 9cqw;
  font-weight: 700;
}

.etiqueta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1cqw;
  border: 1cqw solid var(--tinta);
  background: var(--papel);
  font-weight: 700;
  line-height: 1;
  transform: rotate(-4deg);
}

.selo {
  display: flex;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--tinta);
  color: var(--papel);
}

.metade-esquerda,
.metade-direita {
  position: absolute;
  top: 10%;
  bottom: 10%;
  width: 40%;
  background: var(--tinta);
}

.metade-esquerda {
  left: 10%;
  border-radius: 999px 0 0 999px;
}

.metade-direita {
  right: 10%;
  border-radius: 0 999px 999px 0;
  opacity: 0;
}

.saleiro-tampa {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3cqw;
  border-radius: 5cqw 5cqw 0 0;
  background: var(--tinta);
}

.furo {
  width: 2.6cqw;
  height: 2.6cqw;
  border-radius: 50%;
  background: var(--papel);
}

.saleiro {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 4cqw 4cqw;
  font-size: 12cqw;
  font-weight: 700;
}

.conta-gotas {
  transform: rotate(-45deg);
}

.risco {
  position: absolute;
  left: -12%;
  top: 44%;
  width: 124%;
  height: 2.2cqw;
  transform: rotate(-40deg);
}

.risco.grande {
  height: 3cqw;
}

.linha {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--tinta);
  box-shadow: 0 0 0 1.2cqw var(--papel);
  transform-origin: left;
}

.ani {
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-fill-mode: both;
}

.aparecer {
  animation-name: aparecer;
}
.surgir {
  animation-name: surgir;
}
.cair {
  animation-name: cair;
  animation-duration: 1.1s;
  animation-timing-function: cubic-bezier(0.3, 1.4, 0.5, 1);
}
.cair-girando {
  animation-name: cair-girando;
  animation-duration: 1.4s;
}
.entrar-direita {
  animation-name: entrar-direita;
  animation-duration: 1.2s;
}
.encher {
  animation-name: encher;
  animation-duration: 1.4s;
  animation-timing-function: ease-in-out;
}
.riscar {
  animation-name: riscar;
  animation-duration: 0.6s;
}
.inclinar {
  animation-name: inclinar;
  animation-duration: 1s;
  transform: rotate(40deg);
}
.girar {
  animation-name: girar;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.pingar {
  animation-name: pingar;
  animation-duration: 0.9s;
  animation-timing-function: ease-in;
  animation-iteration-count: 3;
  animation-fill-mode: backwards;
  opacity: 0;
}
.preencher {
  animation-name: preencher;
  animation-duration: 0.5s;
}
.empurrar {
  animation-name: empurrar;
  animation-duration: 0.9s;
  animation-iteration-count: 3;
  animation-fill-mode: backwards;
}
.colar {
  animation-name: colar;
  animation-duration: 1.1s;
}
.sumir {
  animation-name: sumir;
  animation-duration: 1.4s;
}

.pano {
  border: 1cqw solid var(--tinta);
  background: repeating-linear-gradient(45deg, var(--tinta) 0 1cqw, var(--papel) 1cqw 3cqw);
}

.bolha {
  width: 3.5cqw;
  height: 3.5cqw;
  border: 1cqw solid var(--tinta);
  border-radius: 50%;
  opacity: 0;
}

.telhado {
  background: var(--tinta);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}

.cisterna {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5.5cqw;
  font-weight: 700;
}

.alavanca {
  transform-origin: right center;
  transform: rotate(-12deg);
}

.balao {
  border: 1cqw solid var(--tinta);
  border-radius: 6cqw;
  padding: 3cqw 2cqw;
}

.deitado {
  transform: rotate(90deg);
}

.inclinado {
  transform: rotate(25deg);
}

.peito {
  border-radius: 40cqw 40cqw 0 0;
}

.braco {
  border-radius: 10cqw;
}

.jato {
  background: var(--tinta);
  opacity: 0.4;
  transform-origin: top;
}

.faixa {
  padding: 2cqw 0;
}

.item-proibido {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3cqw;
  border: 1cqw solid var(--tinta);
  font-size: 7cqw;
  font-weight: 700;
}

.subir {
  animation-name: subir;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
}
.assentar {
  animation-name: assentar;
  animation-duration: 2s;
  animation-timing-function: ease-in;
  animation-fill-mode: backwards;
  opacity: 0;
}
.pulsar {
  animation-name: pulsar;
  animation-duration: 0.545s;
  animation-iteration-count: infinite;
}
.pulsar-lento {
  animation-name: pulsar;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
}
.bater {
  animation-name: bater;
  animation-duration: 0.55s;
  animation-iteration-count: 5;
  animation-fill-mode: backwards;
}
.apertar {
  animation-name: apertar;
  animation-duration: 0.55s;
  animation-iteration-count: 5;
  animation-fill-mode: backwards;
}
.puxar {
  animation-name: puxar;
  animation-duration: 0.7s;
  animation-iteration-count: 5;
  animation-fill-mode: backwards;
}
.bombear {
  animation-name: bombear;
  animation-duration: 0.8s;
  animation-iteration-count: 4;
  animation-fill-mode: backwards;
}
.tocar {
  animation-name: tocar;
  animation-duration: 0.5s;
  animation-iteration-count: 4;
  animation-fill-mode: backwards;
}
.tremer {
  animation-name: tocar;
  animation-duration: 0.3s;
  animation-iteration-count: 3;
}
.escorrer {
  animation-name: encher;
  animation-duration: 1s;
}

.congelador {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: end;
  gap: 1.5cqw;
  padding: 2cqw;
}

.bloco-gelo {
  height: 9cqw;
  background: var(--tinta);
}

.pausado .ani {
  animation-play-state: paused;
}

.estatico .ani {
  animation: none;
}

@media (prefers-reduced-motion: reduce) {
  .ani {
    animation: none;
  }
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
}

@keyframes surgir {
  from {
    opacity: 0;
    transform: translateY(4cqw);
  }
}

@keyframes cair {
  from {
    opacity: 0;
    transform: translateY(-60cqw);
  }
}

@keyframes cair-girando {
  from {
    opacity: 0;
    transform: translateY(-70cqw) rotate(-160deg);
  }
}

@keyframes entrar-direita {
  from {
    opacity: 0;
    transform: translateX(60cqw);
  }
}

@keyframes encher {
  from {
    transform: scaleY(0);
  }
}

@keyframes riscar {
  from {
    transform: scaleX(0);
  }
}

@keyframes inclinar {
  from {
    transform: rotate(0deg);
  }
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pingar {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(14cqw);
  }
}

@keyframes preencher {
  from {
    background: var(--papel);
    color: var(--tinta);
  }
}

@keyframes empurrar {
  50% {
    transform: translateX(-5cqw);
  }
}

@keyframes colar {
  from {
    opacity: 0;
    transform: translate(60cqw, -40cqw) rotate(30deg);
  }
}

@keyframes sumir {
  from {
    opacity: 1;
  }
}

@keyframes subir {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-14cqw);
  }
}

@keyframes assentar {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(32cqw);
  }
}

@keyframes pulsar {
  50% {
    transform: scale(0.82);
  }
}

@keyframes bater {
  50% {
    transform: translateX(-5cqw);
  }
}

@keyframes apertar {
  50% {
    transform: translateY(3cqw) scale(0.94);
  }
}

@keyframes puxar {
  50% {
    transform: translate(-1cqw, -4cqw);
  }
}

@keyframes bombear {
  50% {
    transform: rotate(14deg);
  }
}

@keyframes tocar {
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
</style>
