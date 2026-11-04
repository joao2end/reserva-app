export type IlustracaoId =
  | 'lugar-fresco'
  | 'prateleira'
  | 'garrafa-pet'
  | 'congelar'
  | 'louro'
  | 'rodizio'
  | 'etiqueta'
  | 'quatro-litros'
  | 'hipoclorito'
  | 'guardar-agua'
  | 'beber-agua'
  | 'ordem-comer'
  | 'metade'
  | 'quem-nao-corta'
  | 'sem-sal'
  | 'porcao-do-dia'
  | 'conta-agua'
  | 'decantar'
  | 'coar'
  | 'ferver'
  | 'sol-pet'
  | 'desviar-chuva'
  | 'bomba-manual'
  | 'limpar-reservatorio'
  | 'chamar-pessoa'
  | 'ligar-192'
  | 'maos-peito'
  | 'ritmo-rcp'
  | 'tosse'
  | 'golpes-costas'
  | 'compressao-abdominal'
  | 'bebe-golpes'
  | 'pressao-ferida'
  | 'pano-por-cima'
  | 'agua-queimadura'
  | 'nada-na-queimadura'

export interface CenaVideo {
  ilustracao: IlustracaoId
  titulo: string
  texto: string
  segundos: number
}

export interface VideoGuia {
  id: string
  secaoId: string
  titulo: string
  cenas: CenaVideo[]
}

export const VIDEOS: VideoGuia[] = [
  {
    id: 'como-guardar',
    secaoId: 'armazenamento',
    titulo: 'Como guardar os alimentos',
    cenas: [
      {
        ilustracao: 'lugar-fresco',
        titulo: 'Lugar fresco, seco e escuro',
        texto: 'Longe do sol, do fogão e da umidade. Abaixo de 25 °C.',
        segundos: 6,
      },
      {
        ilustracao: 'prateleira',
        titulo: 'Fora do chão',
        texto: 'Em prateleira, 20 cm acima do chão e longe da parede.',
        segundos: 6,
      },
      {
        ilustracao: 'garrafa-pet',
        titulo: 'Troque a embalagem',
        texto: 'Passe arroz, feijão e farinha para garrafa PET ou pote bem fechado.',
        segundos: 6,
      },
      {
        ilustracao: 'congelar',
        titulo: 'Congele por 3 dias',
        texto: 'Isso mata os ovos de caruncho. Depois espere esfriar fechado.',
        segundos: 6,
      },
      {
        ilustracao: 'louro',
        titulo: 'Louro ou alho no pote',
        texto: 'Coloque folhas de louro ou dentes de alho junto dos grãos.',
        segundos: 5,
      },
      {
        ilustracao: 'rodizio',
        titulo: 'Novo atrás, antigo na frente',
        texto: 'Use primeiro o que entrou primeiro.',
        segundos: 6,
      },
      {
        ilustracao: 'etiqueta',
        titulo: 'Escreva nome e data',
        texto: 'Etiquete cada pote e confira tudo a cada 3 meses.',
        segundos: 5,
      },
    ],
  },
  {
    id: 'agua',
    secaoId: 'agua',
    titulo: 'Como guardar e tratar a água',
    cenas: [
      {
        ilustracao: 'quatro-litros',
        titulo: '4 litros por pessoa por dia',
        texto: '2 litros para beber e 2 para cozinhar e para a higiene.',
        segundos: 6,
      },
      {
        ilustracao: 'hipoclorito',
        titulo: '2 gotas por litro',
        texto: 'Hipoclorito 2,5%: pingue 2 gotas, mexa e espere 30 minutos.',
        segundos: 7,
      },
      {
        ilustracao: 'guardar-agua',
        titulo: 'Guarde tampada e na sombra',
        texto: 'Longe de produtos de limpeza e de combustível. Troque a cada 6 meses.',
        segundos: 6,
      },
    ],
  },
  {
    id: 'racionar',
    secaoId: 'racionamento',
    titulo: 'Como fazer o racionamento',
    cenas: [
      {
        ilustracao: 'beber-agua',
        titulo: 'Água não se raciona',
        texto: 'Beba o que o corpo pede. Nunca menos de 1 litro por dia.',
        segundos: 6,
      },
      {
        ilustracao: 'ordem-comer',
        titulo: 'A ordem para comer',
        texto: '1º geladeira. 2º congelador. 3º despensa.',
        segundos: 7,
      },
      {
        ilustracao: 'metade',
        titulo: 'Adultos podem comer metade',
        texto: 'Com saúde e pouca atividade, por um tempo.',
        segundos: 6,
      },
      {
        ilustracao: 'quem-nao-corta',
        titulo: 'Crianças e gestantes, não',
        texto: 'Eles comem o normal. Quem toma remédio, pergunte no posto de saúde.',
        segundos: 6,
      },
      {
        ilustracao: 'sem-sal',
        titulo: 'Pouca água? Menos sal',
        texto: 'Charque, salgadinho e embutido dão mais sede.',
        segundos: 6,
      },
      {
        ilustracao: 'porcao-do-dia',
        titulo: 'Separe a porção do dia',
        texto: '10 kg de arroz para 40 dias = 250 g por dia.',
        segundos: 7,
      },
    ],
  },
]

export function videoDaSecao(secaoId: string): VideoGuia | undefined {
  return VIDEOS.find((video) => video.secaoId === secaoId)
}

export function duracaoTotal(video: VideoGuia): number {
  return video.cenas.reduce((total, cena) => total + cena.segundos, 0)
}
