const MILISSEGUNDOS_POR_DIA = 86_400_000
const PADRAO_DATA = /^\d{4}-\d{2}-\d{2}$/
const PADRAO_MES = /^\d{4}-(0[1-9]|1[0-2])$/

function doisDigitos(valor: number): string {
  return String(valor).padStart(2, '0')
}

export function dataIso(data: Date): string {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`
}

export function ehDataIso(valor: string): boolean {
  return PADRAO_DATA.test(valor) && !Number.isNaN(new Date(`${valor}T12:00:00`).getTime())
}

export function ehMesIso(valor: string): boolean {
  return PADRAO_MES.test(valor)
}

export function ultimoDiaDoMes(mesIso: string): Date {
  const [ano, mes] = mesIso.split('-').map(Number)
  return new Date(ano, mes, 0, 23, 59, 59)
}

export function diasAteVencer(validade: string, hoje: Date): number {
  return Math.floor((ultimoDiaDoMes(validade).getTime() - hoje.getTime()) / MILISSEGUNDOS_POR_DIA)
}

export function somarMeses(dataIsoInicial: string, meses: number): string {
  const data = new Date(`${dataIsoInicial}T12:00:00`)
  data.setDate(1)
  data.setMonth(data.getMonth() + meses)
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}`
}
