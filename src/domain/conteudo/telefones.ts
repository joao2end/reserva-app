export interface TelefoneEmergencia {
  numero: string
  nome: string
  quando: string
}

export const TELEFONES_EMERGENCIA: TelefoneEmergencia[] = [
  { numero: '192', nome: 'SAMU', quando: 'Doença, desmaio, acidente' },
  { numero: '193', nome: 'Bombeiros', quando: 'Fogo, resgate, fio caído' },
  { numero: '199', nome: 'Defesa Civil', quando: 'Enchente, desabamento, desastre' },
  { numero: '190', nome: 'Polícia', quando: 'Violência e perigo' },
]
