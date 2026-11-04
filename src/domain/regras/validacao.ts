import { ErroDeValidacao } from '../entidades/erros'
import { ehDataIso, ehMesIso } from './datas'

export const OPCOES_DIAS = [14, 30, 60, 90] as const
export const LIMITE_PESSOAS = 30
export const LIMITE_NOME = 30
export const LIMITE_LOCAL = 40
export const LIMITE_OBSERVACAO = 200

export function exigir(condicao: boolean, mensagem: string): asserts condicao {
  if (!condicao) throw new ErroDeValidacao(mensagem)
}

export function exigirInteiroEntre(valor: number, minimo: number, maximo: number, campo: string) {
  exigir(Number.isInteger(valor) && valor >= minimo && valor <= maximo, `${campo} deve ser um número inteiro entre ${minimo} e ${maximo}.`)
}

export function exigirQuantidadePositiva(valor: number) {
  exigir(Number.isFinite(valor) && valor > 0, 'A quantidade deve ser maior que zero.')
}

export function exigirData(valor: string, campo: string) {
  exigir(ehDataIso(valor), `${campo} inválida.`)
}

export function exigirMes(valor: string, campo: string) {
  exigir(ehMesIso(valor), `${campo} inválida. Use mês e ano.`)
}

export const DIGITOS_TELEFONE = { minimo: 8, maximo: 13 }

export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '')
}

export function ehTelefone(valor: string): boolean {
  return /^\d+$/.test(valor) && valor.length >= DIGITOS_TELEFONE.minimo && valor.length <= DIGITOS_TELEFONE.maximo
}

export function exigirTelefone(valor: string): string {
  const digitos = apenasDigitos(valor)
  exigir(digitos.length > 0, 'Informe o telefone.')
  exigir(ehTelefone(digitos), 'Telefone inválido. Escreva o número com DDD, por exemplo 82 99999-9999.')
  return digitos
}

export function exigirTexto(valor: string, limite: number, campo: string): string {
  const limpo = valor.trim()
  exigir(limpo.length > 0, `Informe ${campo}.`)
  exigir(limpo.length <= limite, `${campo} pode ter no máximo ${limite} caracteres.`)
  return limpo
}
