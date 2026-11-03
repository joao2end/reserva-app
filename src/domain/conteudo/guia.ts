export interface SecaoGuia {
  id: string
  titulo: string
  resumo: string
  blocos: { titulo: string; itens: string[] }[]
  aviso?: { critico: boolean; titulo: string; texto: string }
}

export const GUIA: SecaoGuia[] = [
  {
    id: 'el-nino',
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
]
