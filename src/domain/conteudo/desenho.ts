export const DESENHOS = [
  'quadro',
  'disjuntor',
  'dr',
  'chave-teste',
  'tomada',
  'plugue',
  'interruptor',
  'lampada',
  'bocal',
  'fio-fase',
  'fio-neutro',
  'fio-terra',
  'fio-retorno',
  'alicate',
  'chave-fenda',
  'emenda',
  'fita-isolante',
  'caixa-parede',
  'chuveiro',
  'planta-casa',
  'bitolas',
  'raio',
  'mao',
  'torneira',
  'gota',
  'registro',
  'chave-inglesa',
  'vedante',
  'rosca',
  'veda-rosca',
  'pia-sifao',
  'desentupidor',
  'balde',
  'caixa-dagua',
  'roda-bike',
  'camara',
  'remendo',
  'lixa',
  'espatula',
  'bomba-ar',
  'bacia-agua',
  'carro',
  'macaco',
  'chave-roda',
  'roda-porcas',
  'vareta-oleo',
  'triangulo',
  'canteiro',
  'semente',
  'broto',
  'muda',
  'regador',
  'garrafa-gotejo',
  'palha',
  'composteira',
  'sol',
  'pessoa',
  'eletricista',
  'certo',
  'errado',
  'seta',
  'relogio',
  'galao',
  'garrafa-pet',
  'panela',
  'pano',
  'conta-gotas',
  'cisterna-casa',
  'pessoa-deitada',
  'maos-rcp',
  'telefone',
  'bebe',
  'braco',
  'pasta',
  'copo',
  'geladeira',
  'floco',
  'tampa',
  'braseiro',
  'gerador',
  'placa-solar',
  'lanterna',
  'bateria',
  'fita-larga',
  'cano-furado',
  'cano-luva',
  'pulgao',
  'borrifador',
  'pessoa-quatro-apoios',
  'cadeira',
  'vaso-sanitario',
  'tomate',
  'pote-sementes',
] as const

export type DesenhoId = (typeof DESENHOS)[number]

export const MOVIMENTOS = [
  'entrar',
  'surgir',
  'cair',
  'deslizar',
  'pulsar',
  'tremer',
  'girar',
  'balancar',
  'apertar',
  'crescer',
  'pingar',
  'piscar',
  'acender',
  'desligar',
  'empurrar',
  'tracar',
] as const

export type Movimento = (typeof MOVIMENTOS)[number]

export interface PecaCena {
  desenho: DesenhoId
  x: number
  y: number
  largura: number
  giro?: number
  espelhar?: boolean
  movimento?: Movimento
  atraso?: number
  vindoDe?: [number, number]
}

export interface RotuloCena {
  texto: string
  x: number
  y: number
  tamanho?: number
  atraso?: number
  destaque?: boolean
}

export interface CenaDesenhada {
  pecas: PecaCena[]
  rotulos?: RotuloCena[]
}
