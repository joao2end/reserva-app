import type { Unidade } from '../domain/entidades/tipos'

const ROTULO_UNIDADE: Record<Unidade, string> = { kg: 'kg', L: 'L', un: 'un.' }

export function formatarQuantidade(valor: number, unidade: Unidade): string {
  return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ${ROTULO_UNIDADE[unidade]}`
}

export function formatarMesAno(mesIso: string): string {
  const [ano, mes] = mesIso.split('-')
  return `${mes}/${ano}`
}

export function formatarData(dataIso: string): string {
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}

export function formatarPrazo(dias: number): string {
  if (dias < 0) return 'Vencido'
  if (dias === 0) return 'Vence hoje'
  if (dias === 1) return 'Vence amanhã'
  return `Vence em ${dias} dias`
}

export function plural(quantidade: number, singular: string, pluralTexto: string): string {
  return `${quantidade} ${quantidade === 1 ? singular : pluralTexto}`
}
