import type { CenaVideo } from './videos'

export interface ParteLicao {
  titulo: string
  paragrafos?: string[]
  passos?: string[]
}

export interface PerguntaLicao {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

export interface LicaoCurso {
  id: string
  titulo: string
  objetivo: string
  minutos: number
  cenas: CenaVideo[]
  partes: ParteLicao[]
  erros: string[]
  teste: PerguntaLicao[]
  fontes: string[]
}

export interface ModuloCurso {
  id: string
  titulo: string
  resumo: string
  licoes: LicaoCurso[]
}

export const CURSO: ModuloCurso[] = [
  {
    id: 'agua',
    titulo: 'Água que salva',
    resumo: 'Quanto guardar, como tratar e como cuidar da cisterna.',
    licoes: [
      {
        id: 'agua-quanto',
        titulo: 'Quanto guardar e como',
        objetivo: 'Calcular a água da sua casa e guardar sem estragar.',
        minutos: 5,
        cenas: [
          {
            ilustracao: 'quatro-litros',
            titulo: '4 litros por pessoa por dia',
            texto: '2 para beber e 2 para cozinhar e para a higiene.',
            segundos: 6,
          },
          {
            ilustracao: 'conta-agua',
            titulo: 'Faça a conta',
            texto: 'Pessoas × dias × 4 litros. 3 pessoas por 14 dias = 168 litros.',
            segundos: 7,
          },
          {
            ilustracao: 'guardar-agua',
            titulo: 'Tampada e na sombra',
            texto: 'Longe de produto de limpeza e de combustível. Troque a cada 6 meses.',
            segundos: 6,
          },
        ],
        partes: [
          {
            titulo: 'Por que 4 litros',
            paragrafos: [
              'Uma pessoa precisa de cerca de 2 litros por dia só para beber. No calor forte, idosos, crianças, gestantes e doentes precisam de mais.',
              'Os outros 2 litros são para cozinhar o arroz e o feijão, escovar os dentes e lavar as mãos. Banho e descarga ficam de fora: para isso use água de chuva ou de reuso.',
            ],
          },
          {
            titulo: 'Como fazer a conta',
            passos: [
              'Conte as pessoas da casa, incluindo crianças.',
              'Escolha por quantos dias quer se preparar. Comece por 14 dias.',
              'Multiplique: pessoas × dias × 4 litros.',
              'Exemplo: 3 pessoas × 14 dias × 4 = 168 litros, ou seja, 9 galões de 20 litros.',
            ],
          },
          {
            titulo: 'Onde e como guardar',
            passos: [
              'Use galão lacrado ou bombona própria para alimento, limpa e com tampa.',
              'Nunca use vasilha que já teve produto de limpeza, veneno ou combustível.',
              'Guarde em lugar fresco, escuro e fora do chão.',
              'Escreva a data no galão. Água da torneira guardada em casa: troque a cada 6 meses.',
              'Gaste primeiro a mais antiga e reponha atrás.',
            ],
          },
        ],
        erros: [
          'Guardar só água para beber e esquecer a da comida.',
          'Deixar galão no sol: a água esquenta e cria limo.',
          'Reaproveitar garrafa de água sanitária ou de óleo.',
        ],
        teste: [
          {
            pergunta: 'Quantos litros de água guardar por pessoa, por dia?',
            opcoes: ['1 litro', '4 litros', '10 litros'],
            correta: 1,
            explicacao: '2 litros para beber e 2 para cozinhar e para a higiene mínima.',
          },
          {
            pergunta: 'Uma casa com 2 pessoas, para 14 dias, precisa de quantos litros?',
            opcoes: ['56 litros', '112 litros', '28 litros'],
            correta: 1,
            explicacao: '2 pessoas × 14 dias × 4 litros = 112 litros.',
          },
          {
            pergunta: 'Qual vasilha NÃO serve para guardar água de beber?',
            opcoes: ['Galão lacrado de água mineral', 'Bombona própria para alimento', 'Garrafa vazia de água sanitária'],
            correta: 2,
            explicacao: 'Restos de produto químico contaminam a água, mesmo depois de lavar.',
          },
        ],
        fontes: ['Ready.gov / FEMA: Managing Water', 'Secretaria da Saúde de São Paulo: uso do hipoclorito de sódio'],
      },
      {
        id: 'agua-tratar',
        titulo: 'Tratar água em casa',
        objetivo: 'Deixar própria para beber uma água de origem duvidosa, com 4 métodos.',
        minutos: 7,
        cenas: [
          {
            ilustracao: 'decantar',
            titulo: '1. Deixe descansar',
            texto: 'A sujeira desce para o fundo do balde tampado.',
            segundos: 6,
          },
          {
            ilustracao: 'coar',
            titulo: '2. Coe num pano limpo',
            texto: 'Passe só a parte de cima por pano dobrado ou filtro de café.',
            segundos: 6,
          },
          {
            ilustracao: 'ferver',
            titulo: '3. Ferva 5 minutos',
            texto: 'Depois que borbulhar. Deixe esfriar tampada.',
            segundos: 6,
          },
          {
            ilustracao: 'hipoclorito',
            titulo: 'Ou: 2 gotas por litro',
            texto: 'Hipoclorito 2,5%. Mexa e espere 30 minutos.',
            segundos: 6,
          },
          {
            ilustracao: 'sol-pet',
            titulo: 'Ou: 6 horas de sol',
            texto: 'Garrafa PET transparente de até 2 litros, deitada no sol forte.',
            segundos: 6,
          },
        ],
        partes: [
          {
            titulo: 'Primeiro: clarear',
            paragrafos: [
              'Fervura, cloro e sol funcionam bem em água clara. Em água barrenta, a sujeira protege os micróbios. Por isso o primeiro passo é sempre clarear.',
            ],
            passos: [
              'Encha um balde limpo, tampe e deixe parado por algumas horas.',
              'Com uma caneca limpa, pegue só a água de cima, sem mexer o fundo.',
              'Passe essa água por um pano limpo dobrado em várias camadas ou por filtro de papel de café.',
            ],
          },
          {
            titulo: 'Depois: escolha um jeito de desinfetar',
            passos: [
              'Ferver: espere borbulhar e conte 5 minutos. Deixe esfriar tampada. Para tirar o gosto de fervida, passe de uma vasilha limpa para outra algumas vezes.',
              'Hipoclorito 2,5% (grátis no posto de saúde): 2 gotas por litro, mexa e espere 30 minutos antes de beber.',
              'Sol (método SODIS): garrafa PET transparente e lisa, de até 2 litros, cheia de água clara. Deite no sol forte por 6 horas. Se o céu estiver mais da metade nublado, deixe 2 dias.',
              'Filtro de barro: ajuda, mas a vela precisa ser trocada no prazo. Na dúvida, filtre e depois use cloro.',
            ],
          },
          {
            titulo: 'Guardar a água tratada',
            passos: [
              'Use vasilha limpa, tampada e só para água de beber.',
              'Pegue com concha limpa ou torneirinha. Não enfie a mão nem a caneca.',
              'Água tratada com cloro: beba em até 24 horas.',
            ],
          },
          {
            titulo: 'Quando não tem jeito',
            paragrafos: [
              'Água com cheiro de combustível, de produto químico ou de esgoto forte não fica boa com nenhum desses métodos. Ferver concentra alguns venenos. Não beba e procure outra fonte.',
            ],
          },
        ],
        erros: [
          'Ferver ou clorar água barrenta sem clarear antes.',
          'Usar água sanitária perfumada ou com alvejante.',
          'Garrafa colorida ou muito arranhada no sol: a luz não passa.',
          'Beber logo depois de pingar o cloro, sem esperar os 30 minutos.',
        ],
        teste: [
          {
            pergunta: 'A água está barrenta. Qual o primeiro passo?',
            opcoes: ['Pingar o dobro de cloro', 'Deixar descansar e coar', 'Ferver na hora'],
            correta: 1,
            explicacao: 'A sujeira protege os micróbios. Clareie antes de desinfetar.',
          },
          {
            pergunta: 'Quantas gotas de hipoclorito 2,5% por litro?',
            opcoes: ['2 gotas e esperar 30 minutos', '10 gotas e beber na hora', '1 colher de sopa'],
            correta: 0,
            explicacao: '2 gotas por litro, mexer e esperar 30 minutos.',
          },
          {
            pergunta: 'No método do sol, qual garrafa usar?',
            opcoes: ['Garrafa verde de refrigerante', 'Garrafa PET transparente de até 2 litros', 'Garrafão de 5 litros'],
            correta: 1,
            explicacao: 'A luz do sol precisa atravessar a garrafa. Mais de 2 litros fica fundo demais.',
          },
        ],
        fontes: [
          'Secretaria da Saúde de São Paulo: uso do hipoclorito de sódio',
          'SSWM / Eawag: desinfecção solar (método SODIS)',
          'Ready.gov / FEMA: Managing Water',
        ],
      },
      {
        id: 'agua-cisterna',
        titulo: 'Água de chuva e cisterna',
        objetivo: 'Captar água de chuva limpa e manter a cisterna e a caixa d’água sem contaminação.',
        minutos: 6,
        cenas: [
          {
            ilustracao: 'desviar-chuva',
            titulo: 'Desvie a primeira chuva',
            texto: 'Ela lava o telhado e leva fezes de bicho, poeira e folhas.',
            segundos: 7,
          },
          {
            ilustracao: 'bomba-manual',
            titulo: 'Tire com bomba, não com balde',
            texto: 'Balde e corda levam sujeira para dentro da cisterna.',
            segundos: 6,
          },
          {
            ilustracao: 'limpar-reservatorio',
            titulo: '1 litro de água sanitária para 1.000 litros',
            texto: 'Na limpeza da caixa: espere 2 horas, esvazie e encha de novo.',
            segundos: 7,
          },
        ],
        partes: [
          {
            titulo: 'Captar água limpa',
            passos: [
              'Mantenha telhado e calhas limpos, sem folhas e sem ninhos.',
              'Use um desvio para jogar fora a primeira água de cada chuva. Ela lava o telhado.',
              'Cerque a área para galinha, cabra e outros bichos não subirem no telhado.',
              'Coloque tela fina nos canos de entrada e de respiro.',
            ],
          },
          {
            titulo: 'Usar a cisterna no dia a dia',
            passos: [
              'Mantenha a tampa sempre fechada. Ela também evita acidentes com crianças.',
              'Tire a água com bomba manual, nunca com balde e corda.',
              'Não misture água velha com água nova.',
              'Não deixe a cisterna secar de vez: ela pode rachar.',
              'Para beber, trate sempre: ferva ou use cloro.',
            ],
          },
          {
            titulo: 'Limpar a caixa d’água',
            paragrafos: ['Faça a cada 6 meses, ou logo se entrar bicho, sujeira ou se a água mudar de cor, cheiro ou gosto.'],
            passos: [
              'Feche a entrada de água e gaste até sobrar um palmo no fundo. Tampe a saída.',
              'Esfregue paredes, fundo e tampa com escova sem metal. Não use sabão nem detergente.',
              'Tire a sujeira com pá de plástico e pano limpo. Enxágue.',
              'Encha a caixa e coloque 1 litro de água sanitária 2,0% a 2,5% para cada 1.000 litros.',
              'Abra as torneiras até sair cheiro de cloro e feche. Espere 2 horas sem usar.',
              'Esvazie tudo (use essa água para lavar o chão) e encha de novo.',
              'Anote a data da limpeza na caixa.',
            ],
          },
        ],
        erros: [
          'Guardar a água da primeira chuva.',
          'Deixar a cisterna destampada.',
          'Esfregar a caixa com sabão ou escova de aço.',
          'Usar a água antes das 2 horas de desinfecção.',
        ],
        teste: [
          {
            pergunta: 'Por que jogar fora a primeira água da chuva?',
            opcoes: ['Porque é muito fria', 'Porque lava o telhado e vem suja', 'Porque tem pouco cloro'],
            correta: 1,
            explicacao: 'A primeira chuva arrasta fezes de bichos, poeira e folhas do telhado.',
          },
          {
            pergunta: 'Qual o jeito certo de tirar água da cisterna?',
            opcoes: ['Balde com corda', 'Bomba manual', 'Mergulhar a caneca'],
            correta: 1,
            explicacao: 'Balde, corda e caneca levam sujeira para dentro.',
          },
          {
            pergunta: 'Na limpeza da caixa, quanto de água sanitária para 1.000 litros?',
            opcoes: ['1 copo e usar na hora', '1 litro e esperar 2 horas', '5 litros e esperar 1 dia'],
            correta: 1,
            explicacao: '1 litro de água sanitária 2% a 2,5% por 1.000 litros, com 2 horas de espera.',
          },
        ],
        fontes: [
          'Embrapa: instruções técnicas sobre cisternas e água de chuva',
          'Secretaria da Saúde do Rio Grande do Sul: limpeza e desinfecção de caixas d’água',
        ],
      },
    ],
  },
  {
    id: 'socorros',
    titulo: 'Primeiros socorros',
    resumo: 'Parada cardíaca, engasgo, sangramento e queimadura.',
    licoes: [
      {
        id: 'rcp',
        titulo: 'Parada cardíaca: massagem no peito',
        objetivo: 'Reconhecer uma parada cardíaca e fazer a massagem no peito até o socorro chegar.',
        minutos: 6,
        cenas: [
          {
            ilustracao: 'chamar-pessoa',
            titulo: 'Chame e toque nos ombros',
            texto: 'Não responde e não respira normal? É parada.',
            segundos: 6,
          },
          {
            ilustracao: 'ligar-192',
            titulo: 'Ligue 192 no viva-voz',
            texto: 'Ou peça para alguém ligar enquanto você começa.',
            segundos: 5,
          },
          {
            ilustracao: 'maos-peito',
            titulo: 'Mãos no meio do peito',
            texto: 'Uma sobre a outra, braços retos.',
            segundos: 6,
          },
          {
            ilustracao: 'ritmo-rcp',
            titulo: 'Forte e rápido',
            texto: 'Afunde uns 5 cm, de 100 a 120 vezes por minuto. Não pare.',
            segundos: 8,
          },
        ],
        partes: [
          {
            titulo: 'Como reconhecer',
            paragrafos: [
              'A pessoa cai, não responde quando você chama alto e toca nos ombros, e não respira ou só dá suspiros fracos e esquisitos. Esses suspiros não são respiração normal.',
              'Cada minuto sem massagem diminui a chance de sobreviver. Não espere ter certeza absoluta.',
            ],
          },
          {
            titulo: 'O que fazer',
            passos: [
              'Veja se o lugar é seguro para você.',
              'Ligue 192 e coloque no viva-voz. O atendente ajuda a contar.',
              'Deite a pessoa de costas num lugar firme, como o chão.',
              'Ajoelhe ao lado. Mão sobre mão, no meio do peito, entre os mamilos.',
              'Braços retos, ombros em cima das mãos. Empurre forte, afundando uns 5 cm.',
              'Ritmo de 100 a 120 por minuto: mais ou menos 2 por segundo.',
              'Deixe o peito voltar todo entre uma empurrada e outra.',
              'Não pare até o SAMU chegar ou a pessoa reagir. Se tiver outra pessoa, troquem a cada 2 minutos.',
            ],
          },
          {
            titulo: 'Medo de machucar?',
            paragrafos: [
              'Pode quebrar uma costela, e tudo bem: sem a massagem a pessoa morre. Você não vai piorar uma parada cardíaca. A massagem só com as mãos já é o que um leigo deve fazer.',
            ],
          },
        ],
        erros: [
          'Ficar esperando a pessoa "voltar sozinha".',
          'Empurrar fraco ou devagar demais.',
          'Parar para conferir o pulso a toda hora.',
          'Fazer em cima de colchão ou sofá, que afundam.',
        ],
        teste: [
          {
            pergunta: 'A pessoa não responde e só dá suspiros fracos. O que é?',
            opcoes: ['Está dormindo pesado', 'Pode ser parada cardíaca', 'Está só cansada'],
            correta: 1,
            explicacao: 'Suspiros fracos e esquisitos não são respiração normal. Ligue 192 e comece a massagem.',
          },
          {
            pergunta: 'Qual o ritmo certo da massagem?',
            opcoes: ['20 por minuto', '60 por minuto', '100 a 120 por minuto'],
            correta: 2,
            explicacao: 'Cerca de 2 empurradas por segundo, afundando uns 5 cm.',
          },
          {
            pergunta: 'Quando parar a massagem?',
            opcoes: ['Depois de 1 minuto', 'Quando o socorro chegar ou a pessoa reagir', 'Quando cansar um pouco'],
            correta: 1,
            explicacao: 'Se cansar, troque com outra pessoa sem parar a massagem.',
          },
        ],
        fontes: ['American Heart Association: RCP somente com as mãos'],
      },
      {
        id: 'engasgo',
        titulo: 'Engasgo em adulto, criança e bebê',
        objetivo: 'Desengasgar com o método atual: 5 golpes nas costas e 5 compressões.',
        minutos: 6,
        cenas: [
          {
            ilustracao: 'tosse',
            titulo: 'Tossindo forte? Deixe tossir',
            texto: 'Não dê tapas enquanto a pessoa consegue tossir e falar.',
            segundos: 6,
          },
          {
            ilustracao: 'golpes-costas',
            titulo: '5 golpes nas costas',
            texto: 'Incline a pessoa para a frente. Bata entre as escápulas.',
            segundos: 6,
          },
          {
            ilustracao: 'compressao-abdominal',
            titulo: '5 compressões na barriga',
            texto: 'Abrace por trás, punho acima do umbigo, puxe para dentro e para cima.',
            segundos: 7,
          },
          {
            ilustracao: 'bebe-golpes',
            titulo: 'Bebê: costas e peito',
            texto: '5 tapas nas costas e 5 compressões com 2 dedos no peito. Nunca na barriga.',
            segundos: 8,
          },
        ],
        partes: [
          {
            titulo: 'Como saber que é grave',
            paragrafos: [
              'Se a pessoa tosse forte e fala, o corpo está tentando resolver: fique perto e incentive a tossir.',
              'É grave quando ela não consegue falar, tossir nem respirar, leva as mãos ao pescoço ou fica roxa. Aja na hora e peça para alguém ligar 192.',
            ],
          },
          {
            titulo: 'Adulto e criança acima de 1 ano',
            passos: [
              'Fique ao lado e um pouco atrás. Incline a pessoa para a frente, segurando o peito dela.',
              'Dê 5 golpes firmes nas costas, entre as escápulas, com a base da mão.',
              'Se não sair: abrace por trás, punho fechado um pouco acima do umbigo.',
              'Puxe com força para dentro e para cima, 5 vezes.',
              'Repita 5 golpes e 5 compressões até sair ou a pessoa desmaiar.',
              'Se desmaiar: ligue 192 e comece a massagem no peito.',
            ],
          },
          {
            titulo: 'Bebê menor de 1 ano',
            passos: [
              'Deite o bebê de bruços no seu antebraço, com a cabeça mais baixa que o corpo, segurando o queixo.',
              'Dê 5 tapas firmes nas costas, entre as escápulas.',
              'Vire o bebê de barriga para cima, ainda com a cabeça mais baixa.',
              'Faça 5 compressões com 2 dedos no meio do peito.',
              'Repita até sair ou o bebê ficar mole. Nesse caso, ligue 192.',
              'Nunca aperte a barriga do bebê.',
            ],
          },
          {
            titulo: 'Depois',
            paragrafos: ['Mesmo que o objeto saia, leve bebês e crianças para avaliação médica, principalmente se ficaram roxos ou tossiram muito.'],
          },
        ],
        erros: [
          'Dar água ou bater nas costas de quem ainda tosse forte.',
          'Enfiar o dedo na boca para tentar tirar: empurra mais para dentro.',
          'Apertar a barriga de bebê.',
          'Virar o bebê de cabeça para baixo pelos pés.',
        ],
        teste: [
          {
            pergunta: 'A pessoa engasgou, mas tosse forte e fala. O que fazer?',
            opcoes: ['Dar tapas nas costas na hora', 'Deixar tossir e ficar perto', 'Dar água'],
            correta: 1,
            explicacao: 'Tosse forte é o corpo resolvendo. Aja se ela não conseguir mais tossir, falar ou respirar.',
          },
          {
            pergunta: 'Qual a ordem para adulto que não consegue respirar?',
            opcoes: ['5 golpes nas costas e 5 compressões na barriga', 'Só água e esperar', '30 compressões no peito em pé'],
            correta: 0,
            explicacao: 'Alterne 5 golpes nas costas e 5 compressões abdominais até sair.',
          },
          {
            pergunta: 'No bebê, onde fazer as compressões?',
            opcoes: ['Na barriga', 'No meio do peito, com 2 dedos', 'Nas costas com o punho'],
            correta: 1,
            explicacao: 'No bebê: 5 tapas nas costas e 5 compressões no peito. Nunca na barriga.',
          },
        ],
        fontes: ['American Heart Association: diretrizes 2025 de engasgo'],
      },
      {
        id: 'sangramento-queimadura',
        titulo: 'Sangramento e queimadura',
        objetivo: 'Parar um sangramento e cuidar de uma queimadura nos primeiros minutos.',
        minutos: 6,
        cenas: [
          {
            ilustracao: 'pressao-ferida',
            titulo: 'Aperte com pano limpo',
            texto: 'Pressão firme e contínua, sem tirar para olhar.',
            segundos: 6,
          },
          {
            ilustracao: 'pano-por-cima',
            titulo: 'Encharcou? Ponha outro por cima',
            texto: 'Não tire o primeiro pano. Continue apertando.',
            segundos: 6,
          },
          {
            ilustracao: 'agua-queimadura',
            titulo: 'Queimadura: água corrente',
            texto: 'De 10 a 20 minutos, em jato suave e fresco. Nada de gelo.',
            segundos: 7,
          },
          {
            ilustracao: 'nada-na-queimadura',
            titulo: 'Não passe nada',
            texto: 'Nem pasta de dente, nem manteiga, nem borra de café.',
            segundos: 6,
          },
        ],
        partes: [
          {
            titulo: 'Sangramento',
            passos: [
              'Se tiver, calce luvas ou ponha a mão dentro de um saco plástico.',
              'Aperte a ferida com pano limpo ou gaze, com força e sem parar.',
              'Não tire o pano para olhar: isso desmancha o coágulo.',
              'Se encharcar de sangue, coloque outro pano por cima e continue apertando.',
              'Depois que parar, lave em volta só com água e sabão e cubra com curativo limpo.',
            ],
          },
          {
            titulo: 'Ligue 192 se',
            passos: [
              'O sangue sai em jato ou não para depois de 10 minutos apertando.',
              'A ferida é no pescoço, no peito ou na barriga.',
              'A pessoa fica pálida, gelada, confusa ou desmaia.',
            ],
          },
          {
            titulo: 'Queimadura',
            passos: [
              'Afaste a pessoa do fogo ou do que queimou.',
              'Coloque a queimadura em água corrente fresca, em jato suave, de 10 a 20 minutos.',
              'Tire anéis, relógio e roupa solta da área antes de inchar. Não arranque o que estiver grudado.',
              'Não encoste a mão na queimadura. Cubra com pano limpo e úmido, sem apertar.',
              'Não estoure as bolhas.',
              'Procure atendimento se for maior que a palma da mão da pessoa, no rosto, mãos, pés ou genitais, ou em criança e idoso.',
            ],
          },
        ],
        erros: [
          'Tirar o pano do sangramento para ver se parou.',
          'Usar álcool, iodo ou água oxigenada dentro da ferida.',
          'Colocar gelo, pasta de dente, manteiga ou pó de café na queimadura.',
          'Fazer torniquete sem treino.',
        ],
        teste: [
          {
            pergunta: 'O pano do sangramento encharcou. O que fazer?',
            opcoes: ['Tirar e trocar por um seco', 'Colocar outro por cima e continuar apertando', 'Soltar para o sangue sair'],
            correta: 1,
            explicacao: 'Tirar o pano desmancha o coágulo. Coloque outro por cima.',
          },
          {
            pergunta: 'Por quanto tempo deixar a queimadura na água corrente?',
            opcoes: ['Só 1 minuto', 'De 10 a 20 minutos', 'Não se coloca água'],
            correta: 1,
            explicacao: 'Água corrente fresca, em jato suave, de 10 a 20 minutos, diminui o estrago na pele.',
          },
          {
            pergunta: 'O que passar na queimadura?',
            opcoes: ['Pasta de dente', 'Manteiga', 'Nada: só água e cobrir com pano limpo'],
            correta: 2,
            explicacao: 'Receitas caseiras seguram o calor e trazem infecção.',
          },
        ],
        fontes: [
          'Mass General Brigham: como parar um sangramento',
          'Ministério da Saúde: primeiros socorros em queimaduras',
        ],
      },
    ],
  },
  {
    id: 'comida',
    titulo: 'Comida sem geladeira e sem gás',
    resumo: 'Salvar o que está na geladeira quando a luz cai e cozinhar gastando pouco.',
    licoes: [
      {
        id: 'sem-geladeira',
        titulo: 'Faltou energia: o que salvar da geladeira',
        objetivo: 'Fazer a geladeira e o congelador segurarem o frio e saber o que comer e o que jogar fora.',
        minutos: 5,
        cenas: [
          {
            ilustracao: 'porta-fechada',
            titulo: 'Não abra a porta',
            texto: 'Fechada, a geladeira segura o frio por cerca de 4 horas.',
            segundos: 6,
          },
          {
            ilustracao: 'congelador-cheio',
            titulo: 'Congelador cheio dura mais',
            texto: 'Cheio: cerca de 48 horas. Pela metade: cerca de 24 horas.',
            segundos: 7,
          },
          {
            ilustracao: 'cristais-gelo',
            titulo: 'Ainda tem gelo? Pode congelar de novo',
            texto: 'Se ainda tem cristais de gelo ou está gelado como na geladeira.',
            segundos: 6,
          },
          {
            ilustracao: 'nao-prove',
            titulo: 'Nunca prove para saber',
            texto: 'Cheiro, cor ou textura estranha, ou morno? Jogue fora.',
            segundos: 6,
          },
        ],
        partes: [
          {
            titulo: 'Antes de faltar luz',
            passos: [
              'Encha os espaços vazios do congelador com garrafas PET de água. Congeladas, elas seguram o frio e viram água de beber depois.',
              'Tenha um termômetro de geladeira, que é barato. A geladeira deve ficar em até 4 °C.',
              'Não deixe a geladeira lotada de comida que estraga logo. Prefira o estoque que dura fora dela.',
            ],
          },
          {
            titulo: 'Quando a luz cair',
            paragrafos: [
              'Cada vez que a porta abre, o ar frio sai e o quente entra. Por isso o mais importante é manter tudo fechado.',
            ],
            passos: [
              'Anote a hora em que a luz caiu.',
              'Não abra a geladeira nem o congelador. Fechada, a geladeira segura cerca de 4 horas.',
              'O congelador cheio segura uns 2 dias. Pela metade, 1 dia.',
              'Enquanto isso, coma o que não precisa de geladeira.',
            ],
          },
          {
            titulo: 'Quando a luz voltar',
            passos: [
              'Se a geladeira ficou mais de 4 horas sem luz, jogue fora carne, frango, peixe, ovos, leite e comida pronta.',
              'No congelador, o que ainda tem cristais de gelo, ou está gelado a 4 °C ou menos, pode ser congelado de novo.',
              'O que descongelou de vez e ficou morno vai para o lixo.',
              'Nunca prove para conferir. Cheiro, cor ou textura estranha: jogue fora.',
            ],
          },
        ],
        erros: [
          'Abrir a porta toda hora para ver se ainda está gelado.',
          'Provar um pedacinho para saber se estragou.',
          'Congelar de novo carne que já descongelou de vez e ficou morna.',
          'Achar que, se não tem cheiro, está bom: muitas bactérias não têm cheiro.',
        ],
        teste: [
          {
            pergunta: 'Com a porta fechada, por quanto tempo a geladeira segura a comida?',
            opcoes: ['Cerca de 4 horas', 'Cerca de 3 dias', 'Só 10 minutos'],
            correta: 0,
            explicacao: 'Depois de 4 horas sem luz, carne, leite, ovos e comida pronta devem ir para o lixo.',
          },
          {
            pergunta: 'Qual congelador segura o frio por mais tempo?',
            opcoes: ['O vazio', 'O cheio', 'Tanto faz'],
            correta: 1,
            explicacao: 'Cheio, segura cerca de 48 horas. Pela metade, cerca de 24.',
          },
          {
            pergunta: 'A carne do congelador ainda tem cristais de gelo. O que fazer?',
            opcoes: ['Jogar fora na hora', 'Pode congelar de novo', 'Provar para ver'],
            correta: 1,
            explicacao: 'Com cristais de gelo, ou a 4 °C ou menos, pode voltar ao congelador.',
          },
        ],
        fontes: ['FoodSafety.gov (governo dos EUA): como manter a comida segura quando falta energia'],
      },
    ],
  },
]

export const LICOES: LicaoCurso[] = CURSO.flatMap((modulo) => modulo.licoes)

export function ehLicao(valor: unknown): valor is string {
  return typeof valor === 'string' && LICOES.some((licao) => licao.id === valor)
}

export function licaoPorId(id: string): LicaoCurso | undefined {
  return LICOES.find((licao) => licao.id === id)
}

export function moduloDaLicao(id: string): ModuloCurso | undefined {
  return CURSO.find((modulo) => modulo.licoes.some((licao) => licao.id === id))
}

export function proximaLicao(id: string): LicaoCurso | undefined {
  const indice = LICOES.findIndex((licao) => licao.id === id)
  return indice >= 0 ? LICOES[indice + 1] : undefined
}
