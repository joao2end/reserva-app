export type GrupoGuia = 'preparo' | 'sobrevivencia'

export const GRUPOS_GUIA: { id: GrupoGuia; titulo: string }[] = [
  { id: 'preparo', titulo: 'Como se preparar' },
  { id: 'sobrevivencia', titulo: 'Emergências e riscos' },
]

export interface SecaoGuia {
  id: string
  grupo: GrupoGuia
  titulo: string
  resumo: string
  blocos: { titulo: string; itens: string[] }[]
  aviso?: { critico: boolean; titulo: string; texto: string }
  telefones?: boolean
  curso?: { id: string; titulo: string }
}

export const GUIA: SecaoGuia[] = [
  {
    id: 'el-nino',
    grupo: 'preparo',
    titulo: 'Por que se preparar',
    resumo: 'El Niño pode trazer seca, alta de preços e falta de água.',
    blocos: [
      {
        titulo: 'O que pode acontecer',
        itens: [
          'Chuva abaixo da média e seca prolongada, principalmente no Norte e no Nordeste.',
          'Alta no preço de alimentos que dependem de chuva: feijão, milho, mandioca, verduras.',
          'Racionamento ou falta de água encanada.',
          'Quedas de energia por menor nível dos reservatórios.',
        ],
      },
      {
        titulo: 'Estratégia',
        itens: [
          'Comece pela água, depois o básico: arroz, feijão, proteína.',
          'Monte aos poucos: 2 semanas, depois 1 mês, depois 3 meses.',
          'Estoque o que a casa já come e faça rodízio.',
          'Compre antes da alta de preços, nas promoções.',
        ],
      },
    ],
  },
  {
    id: 'armazenamento',
    grupo: 'preparo',
    titulo: 'Como armazenar',
    resumo: 'Fresco, seco, escuro e fora do chão.',
    blocos: [
      {
        titulo: 'O local',
        itens: [
          'Abaixo de 25 °C: longe do fogão, da traseira da geladeira e de paredes com sol.',
          'Sem umidade: evite banheiro, área de serviço e paredes com mofo.',
          'Escuro: a luz faz óleo, castanha e leite em pó rançarem.',
          'Em prateleiras, 15 a 20 cm acima do chão e afastado da parede.',
        ],
      },
      {
        titulo: 'Grãos e secos',
        itens: [
          'Tire da embalagem do mercado e passe para garrafa PET ou pote bem fechado.',
          'Congele por 3 dias antes de guardar para matar ovos de caruncho.',
          'Espere voltar à temperatura ambiente ainda fechado, para não condensar água.',
          'Coloque folhas de louro ou dentes de alho dentro do pote.',
        ],
      },
      {
        titulo: 'Organização',
        itens: [
          'Novo atrás, antigo na frente: o primeiro que entra é o primeiro que sai.',
          'Etiquete cada pote com o nome e a data de compra.',
          'Agrupe por categoria para conferir rápido.',
          'Revise tudo a cada 3 meses.',
        ],
      },
    ],
  },
  {
    id: 'agua',
    grupo: 'preparo',
    curso: { id: 'agua', titulo: 'Água que salva' },
    titulo: 'Água',
    resumo: '4 litros por pessoa por dia. É o item mais importante.',
    blocos: [
      {
        titulo: 'Quantidade',
        itens: [
          '2 litros para beber e 2 para cozinhar e para a higiene mínima, por pessoa por dia.',
          'Para 2 pessoas por 2 semanas: cerca de 110 litros.',
        ],
      },
      {
        titulo: 'Guardar e tratar',
        itens: [
          'Galões lacrados seguem a validade do rótulo.',
          'Água da torneira em bombona própria para alimento: troque a cada 6 meses.',
          'Hipoclorito 2,5%: 2 gotas por litro, espere 30 minutos.',
          'Guarde longe do sol, de produtos de limpeza e de combustível.',
          'Uma cisterna ou caixa extra para água de chuva serve para limpeza e descarga.',
        ],
      },
    ],
  },
  {
    id: 'racionamento',
    grupo: 'preparo',
    titulo: 'Racionamento',
    resumo: 'Água não se raciona. A comida pode ser dividida.',
    aviso: {
      critico: false,
      titulo: 'Água é a regra número 1',
      texto: 'Beba a água que o corpo pede. Só diminua se a Defesa Civil ou a companhia de água mandar, e nunca menos de 1 litro por dia.',
    },
    blocos: [
      {
        titulo: 'Água',
        itens: [
          'Beba o que precisar hoje e procure mais para amanhã.',
          'Economize na limpeza, não no que se bebe: use a água do banho na descarga.',
          'Fique na sombra e evite esforço. Assim o corpo pede menos água.',
          'Não troque água por refrigerante, café ou bebida alcoólica: eles dão mais sede.',
          'Água de origem duvidosa: coe, ferva 5 minutos ou use 2 gotas de hipoclorito por litro e espere 30 minutos.',
        ],
      },
      {
        titulo: 'A ordem para comer',
        itens: [
          '1º O que está na geladeira e estraga rápido.',
          '2º O que está no congelador. Se ainda tem gelo no meio, costuma durar uns 3 dias.',
          '3º Por último, a despensa: arroz, feijão, farinha e enlatados.',
        ],
      },
      {
        titulo: 'Dividir a comida',
        itens: [
          'Adultos com saúde e pouca atividade podem comer metade do normal por um tempo.',
          'Crianças e gestantes não devem comer menos.',
          'Quem tem doença ou toma remédio: pergunte no posto de saúde antes de diminuir.',
          'Com pouca água, evite comida salgada, como charque, salgadinho e embutido. Ela dá mais sede.',
          'Prefira enlatados com caldo e biscoito sem sal.',
        ],
      },
      {
        titulo: 'Fazer a conta',
        itens: [
          'Divida o que você tem pelo número de dias que precisa.',
          'Exemplo: 10 kg de arroz para 40 dias dá 250 g por dia para a casa.',
          'Separe a porção do dia em um pote. Quando acabar, só no dia seguinte.',
        ],
      },
    ],
  },
  {
    id: 'compra',
    grupo: 'preparo',
    titulo: 'Onde e como comprar',
    resumo: 'Compre aos poucos, em fardo e nas promoções.',
    blocos: [
      {
        titulo: 'Onde',
        itens: [
          'Atacarejos: o melhor preço em fardo de arroz, feijão, óleo e enlatados.',
          'Feiras livres e mercados públicos: grãos a granel, farinha, charque, castanhas.',
          'Distribuidoras de água: galões de 20 L com entrega.',
          'Farmácias e postos de saúde: hipoclorito, remédios de uso contínuo.',
          'Lojas de embalagem: bombonas, potes e baldes com tampa.',
        ],
      },
      {
        titulo: 'Como',
        itens: [
          'Leve "um a mais" de 2 ou 3 itens da lista a cada ida ao mercado.',
          'Divida com vizinhos ou parentes a compra de fardos grandes.',
          'Confira a validade na prateleira e pegue a mais longa (fica no fundo).',
          'Não compre lata amassada, estufada ou enferrujada.',
        ],
      },
    ],
  },
  {
    id: 'cuidados',
    grupo: 'preparo',
    titulo: 'Cuidados e segurança',
    resumo: 'Na dúvida, descarte.',
    aviso: {
      critico: true,
      titulo: 'Perigo',
      texto: 'Lata estufada, vazando ou com cheiro estranho ao abrir: descarte sem provar. Há risco de botulismo.',
    },
    blocos: [
      {
        titulo: 'Sinais de que estragou',
        itens: [
          'Grãos com teias, furinhos, pó ou bichinhos.',
          'Cheiro de mofo ou de ranço em óleo, castanha ou leite em pó.',
          'Leite em pó empedrado e amarelado.',
        ],
      },
      {
        titulo: 'Além da comida',
        itens: [
          'Gás de cozinha extra ou fogareiro com cartucho.',
          'Fósforos, lanterna e pilhas.',
          'Remédios de uso contínuo e kit de primeiros socorros.',
          'Abridor de latas manual.',
          'Sabão e itens de higiene.',
        ],
      },
      {
        titulo: 'Erros comuns',
        itens: [
          'Estocar comida que ninguém gosta.',
          'Esquecer água, gás e remédios.',
          'Depender de geladeira.',
          'Comprar tudo de uma vez e não fazer rodízio.',
        ],
      },
    ],
  },
  {
    id: 'deslocamento',
    grupo: 'sobrevivencia',
    telefones: true,
    titulo: 'Para onde se deslocar',
    resumo: 'Combine antes para onde ir e como se encontrar.',
    blocos: [
      {
        titulo: 'Receba os alertas',
        itens: [
          'Mande uma mensagem SMS com o seu CEP para o número 40199. É grátis.',
          'Pode cadastrar mais de um CEP, como o da casa de parentes.',
          'Defesa Civil: 199. Bombeiros: 193. SAMU: 192.',
        ],
      },
      {
        titulo: 'Plano da família',
        itens: [
          'Combine um ponto de encontro perto de casa e outro fora do bairro.',
          'Escolha uma casa de parente ou amigo em lugar com água e mais seguro.',
          'Pergunte à Defesa Civil onde ficam os abrigos e os pontos de carro-pipa.',
          'Cada pessoa deve saber de cor um telefone da família.',
        ],
      },
      {
        titulo: 'Mochila de saída',
        itens: [
          'Documentos e receitas em saco plástico fechado.',
          'Remédios de uso contínuo para 7 dias.',
          'Água, comida pronta, lanterna, carregador e dinheiro trocado.',
          'Uma muda de roupa, agasalho e itens de higiene.',
          'Deixe a mochila perto da porta.',
        ],
      },
      {
        titulo: 'Na hora de sair',
        itens: [
          'Saia cedo, de dia, assim que a Defesa Civil mandar.',
          'Feche o gás, desligue o disjuntor e tranque a casa.',
          'Avise alguém o caminho e a hora que saiu.',
          'Não atravesse rio, ponte coberta ou rua alagada, nem a pé nem de carro.',
        ],
      },
    ],
  },
  {
    id: 'fumaca',
    grupo: 'sobrevivencia',
    telefones: true,
    titulo: 'Fumaça e queimadas',
    resumo: 'Na seca, o fogo se espalha. A fumaça faz mal, mais ainda para idosos e crianças.',
    aviso: {
      critico: true,
      titulo: 'Procure ajuda',
      texto: 'Falta de ar, chiado ou aperto no peito: procure atendimento logo. Fogo perto de casa: ligue 193.',
    },
    blocos: [
      {
        titulo: 'Dentro de casa',
        itens: [
          'Com muita fumaça, fique dentro de casa.',
          'Feche portas e janelas.',
          'Não acenda fogão a lenha, vela nem lamparina dentro de casa. Não fume.',
          'Limpe a cinza com pano úmido. Não use aspirador de pó.',
        ],
      },
      {
        titulo: 'Se precisar sair',
        itens: [
          'Use máscara PFF2 ou N95, bem justa no rosto.',
          'Não faça esforço nem exercício na rua, ainda mais entre 12h e 16h.',
          'No carro, janelas fechadas e ar-condicionado no modo de recircular.',
          'Saia menos: tenha comida e remédios guardados em casa.',
        ],
      },
      {
        titulo: 'Cuide da saúde',
        itens: [
          'Beba mais água ao longo do dia.',
          'Fique atento a tosse, olhos ardendo, garganta irritada, dor de cabeça e cansaço.',
          'Idosos, crianças pequenas, grávidas e quem tem doença crônica precisam de mais cuidado.',
          'Quem tem doença crônica: tenha os remédios em casa e fale com o médico.',
        ],
      },
      {
        titulo: 'Evite o fogo',
        itens: [
          'Não jogue bituca de cigarro nem fósforo aceso no mato.',
          'Não solte balão, não solte fogos e não faça fogueira.',
          'Deixe uma faixa sem mato em volta da casa e do terreno.',
        ],
      },
      {
        titulo: 'Água perto do fogo',
        itens: [
          'Não use água de rio, poço ou nascente perto do fogo se ela tiver cor, cheiro ou cinza.',
          'Prefira água tratada. Se não tiver, ferva ou use hipoclorito, como em Purificar a água.',
        ],
      },
    ],
  },
  {
    id: 'calor',
    grupo: 'sobrevivencia',
    telefones: true,
    titulo: 'Calor forte',
    resumo: 'O El Niño traz dias muito quentes. Idosos e crianças sentem menos sede e correm mais risco.',
    aviso: {
      critico: true,
      titulo: 'Procure ajuda',
      texto: 'Tontura, fraqueza, muita sede ou dor de cabeça: vá para um lugar fresco e beba água. Se não melhorar, procure o posto. Desmaio ou confusão: ligue 192.',
    },
    blocos: [
      {
        titulo: 'Beba água',
        itens: [
          'Beba água mesmo sem sede.',
          'Ofereça água sempre a bebês, crianças, idosos e doentes. Eles podem não sentir sede.',
          'Evite bebida alcoólica e bebida com muito açúcar.',
          'Faça refeições leves, mais vezes ao dia.',
        ],
      },
      {
        titulo: 'Fuja do sol',
        itens: [
          'Evite o sol entre 10h e 16h.',
          'Use roupa leve, chapéu e protetor solar.',
          'Faça menos esforço. Descanse na sombra, em lugar fresco e ventilado.',
          'Nunca deixe criança ou animal dentro de carro fechado.',
        ],
      },
      {
        titulo: 'Casa mais fresca',
        itens: [
          'De dia, feche a cortina ou a janela do lado do sol.',
          'À noite, abra as janelas para o ar circular.',
          'Use toalha molhada ou bacia com água para o ar ficar menos seco.',
          'Durma com pouca coberta e roupa leve.',
          'Na hora mais quente, tome banho morno, nem frio nem quente.',
        ],
      },
      {
        titulo: 'Cuide de quem precisa',
        itens: [
          'Visite ou ligue todo dia para vizinhos idosos, pessoas com deficiência e quem mora sozinho.',
          'Guarde os remédios em lugar fresco, como manda a caixa.',
          'Quem tem doença crônica ou toma vários remédios: fale com o médico sobre o calor.',
        ],
      },
    ],
  },
  {
    id: 'socorros',
    grupo: 'sobrevivencia',
    curso: { id: 'socorros', titulo: 'Primeiros socorros' },
    telefones: true,
    titulo: 'Primeiros socorros',
    resumo: 'O que fazer até o socorro chegar.',
    aviso: {
      critico: true,
      titulo: 'Primeiro, ligue',
      texto: 'SAMU 192. Bombeiros 193. Diga o endereço com um ponto de referência e não desligue até mandarem.',
    },
    blocos: [
      {
        titulo: 'Desmaiou e não respira',
        itens: [
          'Ligue 192 e coloque no viva-voz.',
          'Mãos uma sobre a outra no meio do peito.',
          'Empurre forte e rápido, afundando cerca de 5 cm, 100 a 120 vezes por minuto.',
          'Não pare até o socorro chegar ou a pessoa reagir.',
        ],
      },
      {
        titulo: 'Engasgo',
        itens: [
          'Se a pessoa tosse forte, deixe tossir.',
          'Se não consegue falar nem tossir: abrace por trás, punho fechado acima do umbigo.',
          'Puxe para dentro e para cima, com força, até sair.',
          'Se desmaiar, ligue 192 e comece a massagem no peito.',
        ],
      },
      {
        titulo: 'Cortes e queimaduras',
        itens: [
          'Corte: aperte com pano limpo por 10 minutos sem tirar para olhar.',
          'Queimadura: água corrente fresca, em jato suave, de 10 a 20 minutos.',
          'Não passe pasta de dente, manteiga, borra de café nem pomada caseira.',
          'Não estoure bolhas.',
        ],
      },
      {
        titulo: 'Calor e desidratação',
        itens: [
          'Sinais: muita sede, boca seca, tontura, urina pouca e escura.',
          'Leve para a sombra, afrouxe a roupa e molhe a pele com pano úmido.',
          'Dê água aos goles. Tenha no estoque envelopes de soro de reidratação oral: são grátis no posto.',
          'Confusão, desmaio ou criança muito molinha: ligue 192.',
        ],
      },
      {
        titulo: 'Picada de cobra ou escorpião',
        itens: [
          'Lave com água e sabão e mantenha a pessoa deitada e calma.',
          'Não corte, não chupe, não amarre e não passe nada no local.',
          'Leve logo ao hospital. Se puder, fotografe o bicho de longe.',
        ],
      },
      {
        titulo: 'Caixa de primeiros socorros',
        itens: [
          'Gaze, esparadrapo, atadura e curativos.',
          'Soro fisiológico, sabão neutro e luvas descartáveis.',
          'Tesoura sem ponta, termômetro e envelopes de soro de reidratação.',
          'Remédio para dor e febre que a família já usa, com orientação médica.',
          'Faça um curso de primeiros socorros: Cruz Vermelha, SAMU e Bombeiros oferecem.',
        ],
      },
    ],
  },
]
