import type { Component } from 'vue'
import {
  PhBookOpen,
  PhCookingPot,
  PhDrop,
  PhFish,
  PhGrains,
  PhHouse,
  PhJar,
  PhOrangeSlice,
  PhPackage,
  PhShoppingCart,
  PhStorefront,
  PhSun,
  PhThermometer,
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
  compra: PhStorefront,
  cuidados: PhWarningOctagon,
}

export const ICONE_NAVEGACAO: Record<string, Component> = {
  inicio: PhHouse,
  estoque: PhPackage,
  compras: PhShoppingCart,
  guia: PhBookOpen,
}
