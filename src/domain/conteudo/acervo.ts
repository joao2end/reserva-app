import type { NivelLicao } from './cursos/tipos'

export type CategoriaAcervo = 'clima' | 'energia' | 'saude' | 'casa' | 'comunicacao'

export const CATEGORIAS_ACERVO: { id: CategoriaAcervo; titulo: string }[] = [
  { id: 'clima', titulo: 'Chuva, vento e enchente' },
  { id: 'energia', titulo: 'Sem energia' },
  { id: 'saude', titulo: 'Saúde' },
  { id: 'casa', titulo: 'Casa e família' },
  { id: 'comunicacao', titulo: 'Comunicação' },
]

export type LigacaoAcervo =
  | { tipo: 'licao'; id: string; titulo: string }
  | { tipo: 'curso'; id: string; titulo: string }
  | { tipo: 'secao'; id: string; titulo: string }

export interface GuiaAcervo {
  id: string
  categoria: CategoriaAcervo
  nivel: NivelLicao
  titulo: string
  resumo: string
  aviso?: { critico: boolean; titulo: string; texto: string }
  blocos: { titulo: string; itens: string[] }[]
  ligacoes?: LigacaoAcervo[]
  fontes: string[]
}

export const ACERVO: GuiaAcervo[] = [
  {
    id: 'falta-de-energia',
    categoria: 'energia',
    nivel: 'facil',
    titulo: 'Falta de energia por muitas horas',
    resumo: 'Luz, geladeira e aparelhos quando a energia some.',
    aviso: {
      critico: false,
      titulo: 'Prefira lanterna a vela',
      texto: 'Vela é a maior causa de incêndio quando falta luz. Se usar, deixe num pires firme, longe de cortina, e apague antes de dormir.',
    },
    blocos: [
      {
        titulo: 'Antes de faltar',
        itens: [
          'Tenha lanterna e pilhas novas num lugar fácil de achar no escuro.',
          'Deixe um carregador portátil sempre carregado.',
          'Saiba onde fica o disjuntor geral da casa.',
          'Se alguém usa aparelho de saúde na tomada, combine com o médico um plano para falta de energia.',
        ],
      },
      {
        titulo: 'Enquanto estiver sem energia',
        itens: [
          'Tire da tomada geladeira, TV e computador. Assim a volta da energia não queima nada.',
          'Deixe só uma lâmpada ligada para saber quando a energia voltou.',
          'Abra a geladeira o mínimo possível.',
          'Nunca use fogareiro, churrasqueira ou gerador dentro de casa ou na garagem. A fumaça tem um gás que mata sem cheiro.',
        ],
      },
      {
        titulo: 'Quando voltar',
        itens: [
          'Espere alguns minutos e ligue os aparelhos um de cada vez.',
          'Confira a comida da geladeira antes de comer.',
          'Reponha as pilhas e recarregue o carregador portátil.',
        ],
      },
    ],
    ligacoes: [
      { tipo: 'licao', id: 'sem-geladeira', titulo: 'O que salvar da geladeira' },
      { tipo: 'licao', id: 'eletrica-gerador', titulo: 'Gerador sem acidente' },
    ],
    fontes: ['Defesa Civil Nacional', 'Ready.gov: Power Outages', 'CDC: monóxido de carbono'],
  },
  {
    id: 'enchente',
    categoria: 'clima',
    nivel: 'medio',
    titulo: 'Enchente e alagamento',
    resumo: 'Como se proteger antes, durante e depois da água.',
    aviso: {
      critico: true,
      titulo: 'Não entre em água corrente',
      texto: 'Só 15 centímetros de água correndo já derrubam uma pessoa. 30 centímetros arrastam um carro. Dê a volta.',
    },
    blocos: [
      {
        titulo: 'Antes da chuva forte',
        itens: [
          'Receba os alertas: mande uma mensagem com o seu CEP para o número 40199.',
          'Guarde documentos e remédios em saco plástico fechado, num lugar alto.',
          'Saiba o caminho até um lugar mais alto e seguro.',
          'Limpe calhas e ralos e não jogue lixo na rua.',
        ],
      },
      {
        titulo: 'Se a água subir',
        itens: [
          'Se a água for entrar em casa e o quadro estiver seco, desligue o disjuntor geral.',
          'Nunca mexa em fio ou tomada com os pés ou as mãos molhados.',
          'Suba para um lugar alto e espere ajuda. Ligue 193 ou 199.',
          'Fique longe de rio, córrego, bueiro e fio caído.',
        ],
      },
      {
        titulo: 'Depois que a água baixar',
        itens: [
          'Água de enchente é suja de esgoto e pode passar leptospirose.',
          'Para limpar, use bota e luva de borracha, ou dois sacos plásticos nos pés e nas mãos.',
          'Jogue fora a comida que encostou na água, até as latas amassadas.',
          'Lave a casa com água e sabão e depois com água sanitária, na medida do rótulo.',
          'Febre e dor na batata da perna até um mês depois: vá ao posto e diga que pegou enchente.',
        ],
      },
    ],
    ligacoes: [{ tipo: 'secao', id: 'deslocamento', titulo: 'Para onde se deslocar' }],
    fontes: ['Defesa Civil Nacional', 'Ministério da Saúde: leptospirose', 'Ready.gov: Floods'],
  },
  {
    id: 'temporal-raios',
    categoria: 'clima',
    nivel: 'facil',
    titulo: 'Temporal, vento forte e raios',
    resumo: 'Onde ficar e o que evitar durante a tempestade.',
    blocos: [
      {
        titulo: 'Antes',
        itens: [
          'Recolha do quintal o que o vento pode jogar longe: telhas soltas, vasos, lonas.',
          'Feche portas e janelas.',
          'Tire da tomada TV, computador e carregadores.',
        ],
      },
      {
        titulo: 'Com raios por perto',
        itens: [
          'Fique dentro de casa ou dentro de um carro fechado, longe das janelas.',
          'Não tome banho de chuveiro e não use telefone com fio.',
          'Na rua, não fique debaixo de árvore, nem em campo aberto, nem perto de cerca de arame.',
          'Saia da piscina, do rio e do mar.',
          'Ouviu trovão? O raio pode cair onde você está.',
        ],
      },
      {
        titulo: 'Depois',
        itens: [
          'Espere 30 minutos depois do último trovão para sair.',
          'Fio caído é sempre perigoso. Fique longe e ligue para a companhia de energia ou 193.',
          'Não suba no telhado molhado para consertar.',
        ],
      },
    ],
    fontes: ['INPE: Grupo de Eletricidade Atmosférica', 'Defesa Civil Nacional', 'CDC: Lightning Safety'],
  },
  {
    id: 'incendio-em-casa',
    categoria: 'casa',
    nivel: 'medio',
    titulo: 'Incêndio em casa: evitar e sair',
    resumo: 'Os cuidados do dia a dia e como sair com vida.',
    aviso: {
      critico: true,
      titulo: 'Óleo pegando fogo: nunca jogue água',
      texto: 'Desligue o fogo e cubra a panela com uma tampa ou um pano úmido bem torcido. Deixe tampado até esfriar.',
    },
    blocos: [
      {
        titulo: 'Para não começar',
        itens: [
          'Não ligue vários aparelhos fortes no mesmo benjamim.',
          'Panela no fogo nunca fica sozinha.',
          'Fósforo e isqueiro longe das crianças.',
          'Cheiro de gás: não acenda nada, não mexa em interruptor, abra as janelas e feche o registro.',
        ],
      },
      {
        titulo: 'Para sair',
        itens: [
          'Abaixe-se. A fumaça sobe e o ar limpo fica perto do chão.',
          'Antes de abrir uma porta, toque nela com as costas da mão. Se estiver quente, não abra.',
          'Feche as portas atrás de você.',
          'Não volte para buscar nada.',
          'Já fora de casa, ligue 193.',
        ],
      },
      {
        titulo: 'Roupa pegando fogo',
        itens: ['Pare onde está, deite no chão e role até apagar.', 'Depois, água fria corrente na queimadura.'],
      },
      {
        titulo: 'Plano da família',
        itens: [
          'Combine duas saídas de cada cômodo.',
          'Combine um ponto de encontro do lado de fora.',
          'Treine uma vez com todos da casa.',
        ],
      },
    ],
    ligacoes: [
      { tipo: 'licao', id: 'pouco-gas', titulo: 'Cozinhar com segurança' },
      { tipo: 'licao', id: 'sangramento-queimadura', titulo: 'Queimadura' },
    ],
    fontes: ['Corpo de Bombeiros Militar', 'NFPA: Escape Planning'],
  },
  {
    id: 'comunicacao',
    categoria: 'comunicacao',
    nivel: 'facil',
    titulo: 'Quando o celular falha',
    resumo: 'Como dar e receber notícias sem sinal ou sem bateria.',
    blocos: [
      {
        titulo: 'Tenha em casa',
        itens: [
          'Um rádio a pilha, com pilhas de reserva.',
          'Os telefones importantes escritos no papel.',
          'Um carregador portátil carregado.',
        ],
      },
      {
        titulo: 'Para a bateria durar',
        itens: [
          'Diminua o brilho da tela.',
          'Desligue internet e Bluetooth quando não precisar.',
          'Feche os aplicativos e evite vídeo.',
          'Combine horários para ligar o celular, em vez de deixar ligado o dia todo.',
        ],
      },
      {
        titulo: 'Para falar com a família',
        itens: [
          'Mensagem de texto passa quando a ligação não passa.',
          'Escreva curto: onde você está, se está bem e quando vai falar de novo.',
          'Combine um parente de outra cidade para todos avisarem.',
          'Combine um ponto de encontro se não der para se falar.',
        ],
      },
    ],
    fontes: ['Defesa Civil Nacional', 'Ready.gov: Make a Plan'],
  },
  {
    id: 'desidratacao',
    categoria: 'saude',
    nivel: 'facil',
    titulo: 'Desidratação e soro caseiro',
    resumo: 'Os sinais de falta de água no corpo e como repor.',
    aviso: {
      critico: true,
      titulo: 'Procure ajuda já',
      texto: 'Vômito que não para, sangue nas fezes, muita sonolência, confusão ou muitas horas sem urinar. Ligue 192.',
    },
    blocos: [
      {
        titulo: 'Sinais',
        itens: [
          'Boca seca e muita sede.',
          'Pouca urina, e escura.',
          'Tontura, fraqueza e dor de cabeça.',
          'No idoso, confusão pode ser o primeiro sinal, mesmo sem sede.',
          'No bebê: moleira funda, choro sem lágrima e fralda seca.',
        ],
      },
      {
        titulo: 'Soro caseiro',
        itens: [
          'Prefira o envelope de soro de reidratação. É grátis no posto de saúde.',
          'Sem envelope: 1 litro de água filtrada ou fervida e já fria.',
          'Junte 1 colher pequena, de café, rasa de sal.',
          'Junte 2 colheres de sopa rasas de açúcar e misture bem.',
          'Dê aos poucos, em goles, ao longo do dia. Jogue fora o que sobrar depois de 24 horas.',
        ],
      },
    ],
    ligacoes: [{ tipo: 'secao', id: 'calor', titulo: 'Calor forte' }],
    fontes: ['Ministério da Saúde: orientações ao paciente com dengue', 'Ministério da Saúde: diarreia e desidratação'],
  },
  {
    id: 'dengue-agua-guardada',
    categoria: 'saude',
    nivel: 'facil',
    titulo: 'Água guardada sem mosquito da dengue',
    resumo: 'Estocar água sem criar foco do Aedes.',
    blocos: [
      {
        titulo: 'Na água do estoque',
        itens: [
          'Caixa d’água, tonel e balde sempre bem tampados.',
          'Sem tampa, cubra com tela fina ou pano bem amarrado.',
          'Ao trocar a água, esfregue as paredes do balde. Os ovos grudam e aguentam mais de um ano.',
          'Garrafas vazias de boca para baixo.',
        ],
      },
      {
        titulo: 'No quintal',
        itens: [
          'Pratinho de vaso com areia até a borda.',
          'Calha limpa e sem água parada.',
          'Pneu guardado em lugar coberto.',
          'Uma volta pela casa toda semana: 10 minutos bastam.',
        ],
      },
      {
        titulo: 'Sinais de dengue',
        itens: [
          'Febre alta, dor no corpo e atrás dos olhos, manchas na pele.',
          'Beba bastante líquido e vá ao posto.',
          'Não tome remédio por conta própria. Alguns pioram o sangramento.',
          'Dor forte na barriga, vômito, sangramento ou tontura: atendimento imediato.',
        ],
      },
    ],
    ligacoes: [{ tipo: 'curso', id: 'agua', titulo: 'Água que salva' }],
    fontes: ['Ministério da Saúde: dengue', 'Ministério da Saúde: orientações ao paciente com dengue'],
  },
  {
    id: 'escorpiao-cobra',
    categoria: 'saude',
    nivel: 'medio',
    titulo: 'Escorpião e cobra: prevenir e agir',
    resumo: 'Na seca eles entram mais nas casas.',
    aviso: {
      critico: true,
      titulo: 'Picou: hospital, sem esperar',
      texto: 'Principalmente criança e idoso. Ligue 192. Se puder, tire uma foto do bicho de longe.',
    },
    blocos: [
      {
        titulo: 'Para não entrarem',
        itens: [
          'Sem entulho, lixo ou tijolos empilhados perto da casa.',
          'Tela ou tampa nos ralos e vedação embaixo das portas.',
          'Sacuda sapatos, roupas e toalhas antes de usar.',
          'Afaste a cama e o berço da parede.',
        ],
      },
      {
        titulo: 'Se o escorpião picar',
        itens: [
          'Lave o local com água e sabão.',
          'Uma compressa morna ajuda na dor.',
          'Vá ao hospital mesmo que a dor pareça pequena.',
        ],
      },
      {
        titulo: 'Se a cobra picar',
        itens: [
          'Deite a pessoa e deixe o braço ou a perna parados.',
          'Tire anéis, pulseiras e sapato apertado.',
          'Não amarre, não corte, não chupe e não passe nada no local.',
          'Leve ao hospital o mais rápido possível.',
        ],
      },
    ],
    ligacoes: [{ tipo: 'secao', id: 'socorros', titulo: 'Primeiros socorros' }],
    fontes: ['Ministério da Saúde: acidentes por animais peçonhentos'],
  },
  {
    id: 'remedios',
    categoria: 'saude',
    nivel: 'facil',
    titulo: 'Remédios de uso contínuo',
    resumo: 'Para não ficar sem o remédio de todo dia.',
    blocos: [
      {
        titulo: 'Organize',
        itens: [
          'Escreva num papel o nome de cada remédio, a dose e o horário.',
          'Guarde uma cópia da receita e tire uma foto dela.',
          'Tenha alguns dias a mais de remédio, sem deixar vencer.',
          'Pergunte se o seu remédio sai grátis pela Farmácia Popular.',
        ],
      },
      {
        titulo: 'Guarde bem',
        itens: [
          'Longe do sol, do calor e da umidade do banheiro.',
          'A insulina em uso aguenta algumas semanas fora da geladeira. Veja na bula quantos dias e a temperatura máxima.',
          'Não use remédio vencido ou que mudou de cor ou de cheiro.',
        ],
      },
      {
        titulo: 'Se precisar sair de casa',
        itens: [
          'Os remédios e a lista vão na mochila de saída.',
          'Nunca pare um remédio por conta própria. Fale com o médico ou com o farmacêutico.',
        ],
      },
    ],
    fontes: ['Anvisa: armazenamento de medicamentos', 'Ministério da Saúde: Farmácia Popular'],
  },
  {
    id: 'animais',
    categoria: 'casa',
    nivel: 'facil',
    titulo: 'Animais de estimação na emergência',
    resumo: 'Cachorro, gato e outros também precisam de plano.',
    blocos: [
      {
        titulo: 'Estoque do animal',
        itens: [
          'Ração e água para os mesmos dias do estoque da família.',
          'Os remédios dele e a carteira de vacinação.',
          'Uma foto recente do animal com você.',
        ],
      },
      {
        titulo: 'Para sair junto',
        itens: [
          'Coleira com plaquinha e o seu telefone.',
          'Caixa de transporte ou guia curta.',
          'Nunca deixe o animal preso ou acorrentado em área que pode alagar.',
        ],
      },
      {
        titulo: 'No calor',
        itens: ['Sombra e água fresca o dia todo.', 'Passeio só cedo ou à noite: o chão quente queima as patas.'],
      },
    ],
    fontes: ['Defesa Civil Nacional', 'Ready.gov: Pets and Animals'],
  },
  {
    id: 'banheiro-sem-agua',
    categoria: 'casa',
    nivel: 'medio',
    titulo: 'Banheiro e lixo quando falta água',
    resumo: 'Higiene sem gastar a água de beber.',
    blocos: [
      {
        titulo: 'Descarga',
        itens: [
          'Use a água do banho ou da roupa, guardada num balde.',
          'Jogue de uma vez no vaso, com força, para levar tudo.',
          'Nunca use a água de beber para isso.',
        ],
      },
      {
        titulo: 'Vaso de emergência',
        itens: [
          'Sem água nenhuma: forre o vaso ou um balde com dois sacos de lixo.',
          'Depois de usar, jogue serragem, terra seca ou cal por cima.',
          'Feche bem o saco e deixe num lugar coberto, longe de comida e de crianças.',
        ],
      },
      {
        titulo: 'Mãos e lixo',
        itens: [
          'Lave as mãos com uma garrafa com furinho na tampa: molha, ensaboa, enxágua.',
          'Sem água, use álcool em gel, mas lave quando puder.',
          'Lixo em saco fechado e lixeira tampada, longe da casa.',
        ],
      },
    ],
    ligacoes: [{ tipo: 'secao', id: 'racionamento', titulo: 'Racionamento' }],
    fontes: ['CDC: Emergency Sanitation', 'Defesa Civil Nacional'],
  },
  {
    id: 'documentos-dinheiro',
    categoria: 'casa',
    nivel: 'facil',
    titulo: 'Documentos e dinheiro na emergência',
    resumo: 'O que proteger para recomeçar depois.',
    blocos: [
      {
        titulo: 'Documentos',
        itens: [
          'RG, CPF, certidões, cartão do SUS, receitas e escritura ou contrato da casa.',
          'Cópias num saco plástico fechado, na mochila de saída.',
          'Foto de cada documento no celular de alguém da família.',
        ],
      },
      {
        titulo: 'Dinheiro',
        itens: [
          'Sem energia, maquininha e banco podem parar.',
          'Guarde um pouco de dinheiro em notas pequenas.',
          'Anote o telefone do banco para bloquear cartão perdido.',
        ],
      },
    ],
    ligacoes: [{ tipo: 'secao', id: 'deslocamento', titulo: 'Mochila de saída' }],
    fontes: ['Defesa Civil Nacional', 'Ready.gov: Financial Preparedness'],
  },
]

export function guiaDoAcervo(id: string): GuiaAcervo | undefined {
  return ACERVO.find((guia) => guia.id === id)
}

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function textoDoGuia(guia: GuiaAcervo): string {
  return normalizar([guia.titulo, guia.resumo, ...guia.blocos.flatMap((bloco) => [bloco.titulo, ...bloco.itens])].join(' '))
}

export function buscarNoAcervo(termo: string, categoria?: CategoriaAcervo): GuiaAcervo[] {
  const palavras = normalizar(termo).split(/\s+/).filter(Boolean)
  return ACERVO.filter((guia) => !categoria || guia.categoria === categoria).filter((guia) => {
    const texto = textoDoGuia(guia)
    return palavras.every((palavra) => texto.includes(palavra))
  })
}
