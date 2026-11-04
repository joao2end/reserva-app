import type { Component } from 'vue'
import {
  PhBookOpen,
  PhFire,
  PhFirstAid,
  PhFunnel,
  PhLightning,
  PhPlant,
  PhSignpost,
  PhWrench,
  PhCookingPot,
  PhDrop,
  PhFish,
  PhGrains,
  PhHouse,
  PhJar,
  PhOrangeSlice,
  PhPackage,
  PhScales,
  PhShoppingCart,
  PhStorefront,
  PhSun,
  PhThermometer,
  PhThermometerHot,
  PhWarningOctagon,
} from '@phosphor-icons/vue'
import type { CategoriaId } from '../domain/entidades/tipos'

export const ICONE_CATEGORIA: Record<CategoriaId, Component> = {
  agua: PhDrop,
  graos: PhGrains,
  proteinas: PhFish,
  gorduras: PhJar,
  vegetais: PhOrangeSlice,
  basicos: PhCookingPot,
}

export const ICONE_SECAO_GUIA: Record<string, Component> = {
  'el-nino': PhSun,
  armazenamento: PhThermometer,
  agua: PhDrop,
  racionamento: PhScales,
  compra: PhStorefront,
  cuidados: PhWarningOctagon,
  eletrica: PhLightning,
  mecanica: PhWrench,
  cultivo: PhPlant,
  deslocamento: PhSignpost,
  purificar: PhFunnel,
  fumaca: PhFire,
  calor: PhThermometerHot,
  socorros: PhFirstAid,
}

export const ICONE_NAVEGACAO: Record<string, Component> = {
  inicio: PhHouse,
  estoque: PhPackage,
  compras: PhShoppingCart,
  guia: PhBookOpen,
}
