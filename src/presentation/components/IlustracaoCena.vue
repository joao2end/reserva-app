<script setup lang="ts">
import {
  PhArrowDownLeft,
  PhArrowUp,
  PhBaby,
  PhCalendar,
  PhCaretRight,
  PhCalendarBlank,
  PhCheck,
  PhClock,
  PhCloudRain,
  PhCookingPot,
  PhDrop,
  PhEyedropper,
  PhFlame,
  PhGrains,
  PhHand,
  PhHandFist,
  PhHandPalm,
  PhHeart,
  PhJar,
  PhLeaf,
  PhPackage,
  PhPerson,
  PhPhoneCall,
  PhProhibit,
  PhSnowflake,
  PhSpeakerHigh,
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

    <template v-else-if="ilustracao === 'conta-agua'">
      <div
        v-for="pessoa in 3"
        :key="pessoa"
        class="peca ani aparecer"
        :style="{ left: `${4 + (pessoa - 1) * 14}%`, top: '6%', width: '13%', animationDelay: `${0.2 * pessoa}s` }"
      >
        <PhPerson size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 0; width: 48%; top: 26%; font-size: 6cqw; animation-delay: 0.8s">3 PESSOAS</p>
      <p class="peca texto ani surgir" style="left: 46%; width: 8%; top: 8%; font-size: 10cqw; animation-delay: 1s">×</p>
      <div class="peca ani aparecer" style="left: 62%; top: 2%; width: 20%; animation-delay: 1.2s">
        <PhCalendarBlank size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 52%; width: 40%; top: 26%; font-size: 6cqw; animation-delay: 1.4s">14 DIAS</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 38%; font-size: 11cqw; animation-delay: 2s">× 4 litros</p>
      <div class="peca barra ani riscar" style="left: 14%; width: 72%; top: 56%; height: 1.4cqw; animation-delay: 2.6s" />
      <p class="peca texto ani aparecer" style="left: 0; width: 100%; top: 61%; font-size: 17cqw; animation-delay: 3s">168 L</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 86%; font-size: 6cqw; animation-delay: 3.6s">9 GALÕES DE 20 L</p>
    </template>

    <template v-else-if="ilustracao === 'decantar'">
      <div class="peca barra ani cair" style="left: 20%; top: 14%; width: 60%; height: 3cqw; animation-delay: 2.8s" />
      <div class="peca contorno copo" style="left: 24%; top: 20%; width: 52%; height: 64%">
        <div class="enchimento" style="height: 86%; opacity: 0.2" />
        <div class="enchimento ani encher" style="height: 16%; animation-delay: 0.6s; animation-duration: 2.4s" />
        <span
          v-for="grao in 6"
          :key="grao"
          class="peca grao ani assentar"
          :style="{ left: `${12 + grao * 12}%`, top: '18%', animationDelay: `${0.2 + grao * 0.25}s` }"
        />
      </div>
      <div class="peca ani surgir" style="left: 80%; top: 4%; width: 16%">
        <PhClock size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 88%; font-size: 6.5cqw; animation-delay: 3.2s">TAMPADO, SEM MEXER</p>
    </template>

    <template v-else-if="ilustracao === 'coar'">
      <div class="peca ani inclinar" style="left: 14%; top: 2%; width: 28%">
        <PhCookingPot size="100%" weight="bold" />
      </div>
      <span
        v-for="gota in 4"
        :key="gota"
        class="peca grao ani pingar"
        :style="{ left: `${46 + (gota % 2) * 4}%`, top: '30%', animationDelay: `${0.8 + gota * 0.3}s` }"
      />
      <div class="peca pano ani surgir" style="left: 22%; top: 42%; width: 56%; height: 7%; animation-delay: 0.3s" />
      <div class="peca contorno copo" style="left: 30%; top: 52%; width: 40%; height: 40%">
        <div class="enchimento ani encher" style="height: 60%; opacity: 0.3; animation-delay: 1.2s; animation-duration: 2.6s" />
      </div>
      <p class="peca texto ani surgir" style="left: 72%; width: 28%; top: 44%; font-size: 5.5cqw; animation-delay: 0.6s">PANO</p>
    </template>

    <template v-else-if="ilustracao === 'ferver'">
      <span
        v-for="bolha in 5"
        :key="bolha"
        class="peca bolha ani subir"
        :style="{ left: `${30 + bolha * 7}%`, top: '30%', animationDelay: `${0.2 + bolha * 0.3}s` }"
      />
      <div class="peca" style="left: 18%; top: 28%; width: 60%">
        <PhCookingPot size="100%" weight="bold" />
      </div>
      <div class="peca ani pulsar-lento" style="left: 36%; top: 76%; width: 22%">
        <PhFlame size="100%" weight="fill" />
      </div>
      <div class="peca ani aparecer" style="left: 74%; top: 4%; width: 22%; animation-delay: 1s">
        <PhTimer size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 64%; width: 36%; top: 30%; font-size: 9cqw; animation-delay: 1.4s">5 min</p>
    </template>

    <template v-else-if="ilustracao === 'sol-pet'">
      <div class="peca ani girar" style="left: 6%; top: 4%; width: 30%">
        <PhSun size="100%" weight="bold" />
      </div>
      <p class="peca texto ani aparecer" style="left: 50%; width: 46%; top: 10%; font-size: 16cqw; animation-delay: 1.2s">6 h</p>
      <div class="peca contorno garrafa ani entrar-direita" style="left: 14%; top: 50%; width: 64%; height: 22%; animation-delay: 0.4s">
        <div class="enchimento" style="height: 100%; opacity: 0.25" />
      </div>
      <div class="peca barra ani entrar-direita" style="left: 78%; top: 56%; width: 8%; height: 10%; animation-delay: 0.4s" />
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 80%; font-size: 7cqw; animation-delay: 2s">PET TRANSPARENTE, ATÉ 2 L</p>
    </template>

    <template v-else-if="ilustracao === 'desviar-chuva'">
      <div class="peca ani surgir" style="left: 64%; top: 0%; width: 30%">
        <PhCloudRain size="100%" weight="bold" />
      </div>
      <div class="peca telhado" style="left: 6%; top: 12%; width: 52%; height: 20%" />
      <div class="peca barra" style="left: 52%; top: 32%; width: 3cqw; height: 26%" />
      <span
        v-for="gota in 3"
        :key="gota"
        class="peca grao ani pingar"
        :style="{ left: '52.5%', top: '36%', animationDelay: `${0.6 + gota * 0.4}s` }"
      />
      <div class="peca ani surgir" style="left: 30%; top: 58%; width: 14%; animation-delay: 1s">
        <PhArrowDownLeft size="100%" weight="bold" />
      </div>
      <div class="peca ani aparecer" style="left: 2%; top: 74%; width: 40%; animation-delay: 1.4s">
        <p class="texto" style="font-size: 6cqw">1ª CHUVA</p>
        <p class="texto" style="font-size: 8cqw; margin-top: 2cqw">JOGA FORA</p>
      </div>
      <div class="peca contorno arredondado cisterna ani aparecer" style="left: 56%; top: 62%; width: 38%; height: 30%; animation-delay: 2.4s">
        CISTERNA
      </div>
      <div class="peca selo ani aparecer" style="left: 84%; top: 52%; width: 14%; animation-delay: 3s">
        <PhCheck size="70%" weight="bold" />
      </div>
    </template>

    <template v-else-if="ilustracao === 'bomba-manual'">
      <div class="peca contorno arredondado" style="left: 4%; top: 50%; width: 52%; height: 42%">
        <div class="enchimento" style="height: 60%; opacity: 0.3" />
      </div>
      <div class="peca barra" style="left: 26%; top: 18%; width: 3cqw; height: 34%" />
      <div class="peca barra" style="left: 28%; top: 24%; width: 16%; height: 3cqw" />
      <div class="peca barra alavanca ani bombear" style="left: 8%; top: 18%; width: 22%; height: 3cqw" />
      <span
        v-for="gota in 3"
        :key="gota"
        class="peca grao ani pingar"
        :style="{ left: '42%', top: '30%', animationDelay: `${0.4 + gota * 0.5}s` }"
      />
      <div class="peca barra" style="left: 76%; top: 8%; width: 1cqw; height: 32%" />
      <div class="peca contorno copo" style="left: 66%; top: 38%; width: 22%; height: 20%" />
      <span class="risco" style="left: 60%; top: 34%; width: 34%"><span class="linha ani riscar" style="animation-delay: 1.8s" /></span>
      <p class="peca texto ani surgir" style="left: 58%; width: 40%; top: 66%; font-size: 6cqw; animation-delay: 2.2s">BALDE NÃO</p>
    </template>

    <template v-else-if="ilustracao === 'limpar-reservatorio'">
      <div class="peca contorno arredondado cisterna ani aparecer" style="left: 6%; top: 10%; width: 26%; height: 34%; font-size: 8cqw">1 L</div>
      <p class="peca texto ani surgir" style="left: 2%; width: 34%; top: 46%; font-size: 4.5cqw; animation-delay: 0.4s">ÁGUA SANITÁRIA</p>
      <div class="peca ani surgir" style="left: 35%; top: 20%; width: 9%; animation-delay: 0.8s">
        <PhCaretRight size="100%" weight="bold" />
      </div>
      <div class="peca contorno arredondado cisterna ani aparecer" style="left: 46%; top: 6%; width: 48%; height: 44%; font-size: 9cqw; animation-delay: 1.1s">
        1.000 L
        <div class="enchimento" style="height: 50%; opacity: 0.2" />
      </div>
      <div class="peca ani aparecer" style="left: 12%; top: 62%; width: 24%; animation-delay: 2s">
        <PhTimer size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 40%; width: 58%; top: 68%; font-size: 12cqw; animation-delay: 2.4s">2 horas</p>
    </template>

    <template v-else-if="ilustracao === 'chamar-pessoa'">
      <p class="peca texto balao ani aparecer" style="left: 8%; width: 84%; top: 4%; font-size: 7cqw; animation-delay: 0.3s">
        Você está bem?
      </p>
      <div class="peca ani empurrar" style="left: 8%; top: 34%; width: 20%; animation-delay: 1s">
        <PhHand size="100%" weight="bold" />
      </div>
      <div class="peca deitado" style="left: 30%; top: 30%; width: 44%">
        <PhPerson size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 84%; font-size: 7cqw; animation-delay: 2.4s">NÃO RESPONDE?</p>
    </template>

    <template v-else-if="ilustracao === 'ligar-192'">
      <div class="peca ani tocar" style="left: 28%; top: 6%; width: 40%">
        <PhPhoneCall size="100%" weight="bold" />
      </div>
      <div class="peca ani surgir" style="left: 72%; top: 12%; width: 20%; animation-delay: 1.6s">
        <PhSpeakerHigh size="100%" weight="bold" />
      </div>
      <p class="peca texto ani aparecer" style="left: 0; width: 100%; top: 56%; font-size: 24cqw; animation-delay: 0.8s">192</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 86%; font-size: 6.5cqw; animation-delay: 1.8s">NO VIVA-VOZ</p>
    </template>

    <template v-else-if="ilustracao === 'maos-peito'">
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 3%; font-size: 6.5cqw; animation-delay: 1.8s">MEIO DO PEITO</p>
      <div class="peca contorno peito" style="left: 6%; top: 22%; width: 88%; height: 90%" />
      <div class="peca ani cair" style="left: 37%; top: 40%; width: 26%; animation-delay: 0.3s">
        <PhHandPalm size="100%" weight="bold" />
      </div>
      <div class="peca ani cair" style="left: 39%; top: 45%; width: 22%; animation-delay: 1s">
        <PhHandPalm size="100%" weight="fill" />
      </div>
    </template>

    <template v-else-if="ilustracao === 'ritmo-rcp'">
      <div class="peca ani pulsar" style="left: 30%; top: 6%; width: 40%">
        <PhHeart size="100%" weight="fill" />
      </div>
      <p class="peca texto ani aparecer" style="left: 0; width: 100%; top: 58%; font-size: 15cqw; animation-delay: 0.4s">100–120</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 80%; font-size: 6.5cqw; animation-delay: 0.8s">POR MINUTO · 5 cm</p>
    </template>

    <template v-else-if="ilustracao === 'tosse'">
      <div class="peca" style="left: 8%; top: 16%; width: 42%">
        <PhPerson size="100%" weight="bold" />
      </div>
      <p class="peca texto ani tremer" style="left: 50%; width: 46%; top: 8%; font-size: 12cqw; animation-delay: 0.4s">COF!</p>
      <div
        v-for="linha in 3"
        :key="linha"
        class="peca barra ani surgir"
        :style="{ left: '52%', top: `${28 + linha * 6}%`, width: `${10 + linha * 4}%`, height: '1.6cqw', animationDelay: `${0.4 + linha * 0.2}s` }"
      />
      <div class="peca selo ani aparecer" style="left: 74%; top: 52%; width: 18%; animation-delay: 1.6s">
        <PhCheck size="70%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 84%; font-size: 7cqw; animation-delay: 2s">DEIXE TOSSIR</p>
    </template>

    <template v-else-if="ilustracao === 'golpes-costas'">
      <div class="peca inclinado" style="left: 10%; top: 20%; width: 42%">
        <PhPerson size="100%" weight="bold" />
      </div>
      <div class="peca ani bater" style="left: 50%; top: 18%; width: 24%; animation-delay: 0.4s">
        <PhHandPalm size="100%" weight="bold" />
      </div>
      <p class="peca texto ani aparecer" style="left: 60%; width: 38%; top: 58%; font-size: 16cqw; animation-delay: 0.4s">5×</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 86%; font-size: 6cqw; animation-delay: 1.2s">ENTRE AS ESCÁPULAS</p>
    </template>

    <template v-else-if="ilustracao === 'compressao-abdominal'">
      <div class="peca" style="left: 24%; top: 4%; width: 50%">
        <PhPerson size="100%" weight="bold" />
      </div>
      <div class="peca ani puxar" style="left: 40%; top: 44%; width: 20%; animation-delay: 0.4s">
        <PhHandFist size="100%" weight="fill" />
      </div>
      <div class="peca ani surgir" style="left: 64%; top: 40%; width: 12%; animation-delay: 0.8s">
        <PhArrowUp size="100%" weight="bold" />
      </div>
      <p class="peca texto ani aparecer" style="left: 2%; width: 30%; top: 50%; font-size: 14cqw; animation-delay: 0.4s">5×</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 86%; font-size: 6cqw; animation-delay: 1.2s">ACIMA DO UMBIGO</p>
    </template>

    <template v-else-if="ilustracao === 'bebe-golpes'">
      <div class="peca" style="left: 6%; top: 18%; width: 34%">
        <PhBaby size="100%" weight="bold" />
      </div>
      <div class="peca ani bater" style="left: 24%; top: 4%; width: 18%; animation-delay: 0.3s">
        <PhHandPalm size="100%" weight="bold" />
      </div>
      <p class="peca texto" style="left: 0; width: 48%; top: 56%; font-size: 7cqw">5 COSTAS</p>
      <div class="peca ani aparecer" style="left: 58%; top: 18%; width: 34%; animation-delay: 3s">
        <PhBaby size="100%" weight="bold" />
      </div>
      <div class="peca ani apertar" style="left: 68%; top: 4%; width: 14%; animation-delay: 3.4s">
        <PhHand size="100%" weight="bold" />
      </div>
      <p class="peca texto ani surgir" style="left: 50%; width: 50%; top: 56%; font-size: 7cqw; animation-delay: 3s">5 PEITO</p>
      <p class="peca texto bloco faixa ani surgir" style="left: 4%; width: 92%; top: 76%; font-size: 6.5cqw; animation-delay: 5.6s">
        NUNCA NA BARRIGA
      </p>
    </template>

    <template v-else-if="ilustracao === 'pressao-ferida'">
      <div class="peca contorno braco" style="left: 2%; top: 48%; width: 96%; height: 20%" />
      <div class="peca pano ani cair" style="left: 34%; top: 40%; width: 32%; height: 30%; animation-delay: 0.3s" />
      <div class="peca ani cair" style="left: 32%; top: 8%; width: 36%; animation-delay: 1s">
        <div class="ani apertar" style="animation-delay: 2s"><PhHandPalm size="100%" weight="fill" /></div>
      </div>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 82%; font-size: 7cqw; animation-delay: 2.2s">APERTE SEM TIRAR</p>
    </template>

    <template v-else-if="ilustracao === 'pano-por-cima'">
      <div class="peca contorno braco" style="left: 2%; top: 48%; width: 96%; height: 20%" />
      <div class="peca barra" style="left: 36%; top: 42%; width: 28%; height: 26%" />
      <div class="peca pano ani cair" style="left: 32%; top: 36%; width: 36%; height: 30%; animation-delay: 0.8s" />
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 8%; font-size: 7cqw; animation-delay: 0.2s">ENCHARCOU?</p>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 80%; font-size: 7cqw; animation-delay: 1.8s">OUTRO POR CIMA</p>
    </template>

    <template v-else-if="ilustracao === 'agua-queimadura'">
      <div class="peca barra" style="left: 18%; top: 8%; width: 40%; height: 6%" />
      <div class="peca barra" style="left: 50%; top: 8%; width: 8%; height: 14%" />
      <div class="peca jato ani escorrer" style="left: 51.5%; top: 22%; width: 5%; height: 38%; animation-delay: 0.3s" />
      <div class="peca" style="left: 36%; top: 52%; width: 34%">
        <PhHand size="100%" weight="bold" />
      </div>
      <div class="peca ani aparecer" style="left: 76%; top: 28%; width: 18%; animation-delay: 2s">
        <PhSnowflake size="100%" weight="bold" />
        <span class="risco"><span class="linha ani riscar" style="animation-delay: 2.5s" /></span>
      </div>
      <p class="peca texto ani surgir" style="left: 0; width: 100%; top: 86%; font-size: 8cqw; animation-delay: 1.2s">10 A 20 MIN</p>
    </template>

    <template v-else-if="ilustracao === 'nada-na-queimadura'">
      <div
        v-for="(item, posicao) in ['PASTA DE DENTE', 'MANTEIGA', 'PÓ DE CAFÉ']"
        :key="item"
        class="peca item-proibido ani aparecer"
        :style="{ left: '8%', top: `${4 + posicao * 22}%`, width: '84%', height: '17%', animationDelay: `${0.2 + posicao * 0.9}s` }"
      >
        <PhProhibit size="9cqw" weight="bold" class="shrink-0" />
        <span>{{ item }}</span>
      </div>
      <div class="peca ani aparecer" style="left: 20%; top: 72%; width: 16%; animation-delay: 3.2s">
        <PhDrop size="100%" weight="fill" />
      </div>
      <p class="peca texto ani surgir" style="left: 36%; width: 56%; top: 76%; font-size: 9cqw; animation-delay: 3.4s">SÓ ÁGUA</p>
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
