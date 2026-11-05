import { CURSOS_OFICIOS } from './cursos/oficios'
import type { AreaCurso, LicaoCurso, ModuloCurso, NivelLicao } from './cursos/tipos'

const CURSOS_EMERGENCIA: ModuloCurso[] = [
  {
    id: 'agua',
    area: 'emergencias',
    titulo: 'Água que salva',
    resumo: 'Quanto guardar, como tratar e como cuidar da cisterna.',
    licoes: [
      {
        id: 'agua-quanto',
        nivel: 'facil',
        titulo: 'Quanto guardar e como',
        objetivo: 'Calcular a água da sua casa e guardar sem estragar.',
        minutos: 5,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa', x: 22, y: 46, largura: 22, movimento: 'surgir' },
                { desenho: 'copo', x: 48, y: 34, largura: 14, movimento: 'entrar', atraso: 0.6 },
                { desenho: 'panela', x: 80, y: 36, largura: 28, movimento: 'entrar', atraso: 1.2 },
              ],
              rotulos: [
                { texto: '2 L beber', x: 46, y: 62, tamanho: 5.5, atraso: 1 },
                { texto: '2 L cozinhar', x: 80, y: 62, tamanho: 5.5, atraso: 1.6 },
                { texto: '4 LITROS POR DIA', x: 50, y: 86, tamanho: 7, atraso: 2.2, destaque: true },
              ],
            },
            titulo: '4 litros por pessoa por dia',
            texto: '2 para beber e 2 para cozinhar e para a higiene.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa', x: 14, y: 30, largura: 10, movimento: 'surgir' },
                { desenho: 'pessoa', x: 26, y: 30, largura: 10, movimento: 'surgir', atraso: 0.2 },
                { desenho: 'pessoa', x: 38, y: 30, largura: 10, movimento: 'surgir', atraso: 0.4 },
                { desenho: 'galao', x: 78, y: 32, largura: 26, movimento: 'entrar', atraso: 1.4 },
              ],
              rotulos: [
                { texto: '3 × 14 dias × 4 L', x: 50, y: 64, tamanho: 7, atraso: 1 },
                { texto: '= 168 litros', x: 50, y: 82, tamanho: 9, atraso: 2.2, destaque: true },
              ],
            },
            titulo: 'Faça a conta',
            texto: 'Pessoas × dias × 4 litros. 3 pessoas por 14 dias = 168 litros.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'galao', x: 30, y: 50, largura: 34, movimento: 'entrar' },
                { desenho: 'sol', x: 78, y: 24, largura: 22, movimento: 'girar', atraso: 0.6 },
                { desenho: 'errado', x: 78, y: 24, largura: 30, movimento: 'entrar', atraso: 1.4 },
              ],
              rotulos: [
                { texto: 'TAMPADA E NA SOMBRA', x: 50, y: 90, tamanho: 6.5, atraso: 2, destaque: true },
              ],
            },
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
        id: 'agua-economizar',
        nivel: 'facil',
        titulo: 'Gastar menos água na seca',
        objetivo: 'Fazer a água da casa durar mais no banho, na pia e na descarga.',
        minutos: 5,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'chuveiro', x: 28, y: 36, largura: 30, movimento: 'surgir' },
                { desenho: 'relogio', x: 74, y: 30, largura: 20, movimento: 'girar', atraso: 0.8 },
              ],
              rotulos: [
                { texto: '15 min = 135 L', x: 50, y: 70, tamanho: 6.5, atraso: 1.4 },
                { texto: '5 min = 45 L', x: 50, y: 86, tamanho: 8, atraso: 2.4, destaque: true },
              ],
            },
            titulo: 'Banho de 5 minutos',
            texto: 'Feche o chuveiro enquanto se ensaboa. O banho cai de 135 para 45 litros.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'torneira', x: 30, y: 34, largura: 30, movimento: 'entrar' },
                { desenho: 'copo', x: 74, y: 36, largura: 14, movimento: 'cair', atraso: 1 },
              ],
              rotulos: [
                { texto: 'TORNEIRA ABERTA: 12 L', x: 50, y: 70, tamanho: 6, atraso: 1.6 },
                { texto: 'COM COPO: MENOS DE 1 L', x: 50, y: 86, tamanho: 6.5, atraso: 2.4, destaque: true },
              ],
            },
            titulo: 'Escove os dentes com um copo',
            texto: 'Molhe a escova, feche a torneira e use um copo de água para enxaguar a boca.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'balde', x: 22, y: 42, largura: 24, movimento: 'deslizar' },
                { desenho: 'seta', x: 50, y: 42, largura: 16, movimento: 'empurrar', atraso: 0.8 },
                { desenho: 'vaso-sanitario', x: 78, y: 42, largura: 24, movimento: 'surgir', atraso: 1.4 },
              ],
              rotulos: [
                { texto: 'ENXÁGUE DA MÁQUINA', x: 50, y: 76, tamanho: 6, atraso: 2 },
                { texto: 'VAI PARA A DESCARGA', x: 50, y: 90, tamanho: 6.5, atraso: 2.6, destaque: true },
              ],
            },
            titulo: 'Reaproveite na descarga',
            texto: 'Cada descarga gasta de 10 a 14 litros. Use a água do enxágue da máquina de lavar.',
            segundos: 9,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'copo', x: 34, y: 40, largura: 16, movimento: 'surgir' },
                { desenho: 'errado', x: 34, y: 40, largura: 26, movimento: 'entrar', atraso: 0.8 },
                { desenho: 'balde', x: 72, y: 42, largura: 22, movimento: 'entrar', atraso: 1.4 },
                { desenho: 'tampa', x: 72, y: 29, largura: 24, movimento: 'cair', atraso: 2 },
              ],
              rotulos: [
                { texto: 'NÃO BEBER', x: 50, y: 74, tamanho: 6.5, atraso: 1.2, destaque: true },
                { texto: 'GUARDE EM BALDE TAMPADO', x: 50, y: 90, tamanho: 6, atraso: 2.4 },
              ],
            },
            titulo: 'Água reaproveitada não se bebe',
            texto: 'Nem para banho nem para regar verdura. Guarde no balde com tampa.',
            segundos: 8,
          },
        ],
        partes: [
          {
            titulo: 'No banho, na pia e na louça',
            passos: [
              'Banho: feche o chuveiro enquanto se ensaboa e termine em 5 minutos. Um banho de 15 minutos gasta 135 litros; o de 5 minutos, 45 litros.',
              'Dentes: molhe a escova e feche a torneira. Use um copo de água para enxaguar a boca. Gasta menos de 1 litro, contra 12 litros com a torneira aberta.',
              'Louça: tire os restos de comida, ensaboe tudo com a torneira fechada e enxágue de uma vez. Gasta 20 litros, contra 117 litros com a torneira aberta.',
              'Torneira pingando perde pelo menos 16 mil litros por ano. Conserte logo: veja a lição do curso Encanador da casa.',
              'Plantas: regue de manhã cedo, das 6h às 8h, ou depois das 17h, quando o sol não seca a água.',
            ],
          },
          {
            titulo: 'Reaproveitar a água',
            passos: [
              'Junte num balde a água do último enxágue da máquina de lavar e a água do banho.',
              'Use essa água na descarga, jogando direto no vaso, e para lavar o chão e o quintal.',
              'A água da lavagem de roupa muito suja fica escura e começa a cheirar mal em cerca de 12 horas. Use no mesmo dia.',
              'Guarde sempre em balde ou tambor bem tampado, para não virar criadouro do mosquito da dengue.',
            ],
          },
          {
            titulo: 'Onde ela não pode ir',
            paragrafos: [
              'Mesmo que pareça limpa, a água reaproveitada tem sabão e micróbios. Ela nunca vira água de beber nem de cozinhar.',
            ],
            passos: [
              'Não beba e não use para cozinhar.',
              'Não use para tomar banho nem para dar banho em animais.',
              'Não regue verdura, legume que se come cru, nem planta de comer.',
              'Água com água sanitária ou alvejante não vai para planta nenhuma.',
            ],
          },
        ],
        erros: [
          'Deixar o chuveiro aberto enquanto se ensaboa.',
          'Escovar os dentes com a torneira aberta.',
          'Regar a horta com a água da máquina de lavar.',
          'Deixar o balde de água reaproveitada destampado.',
        ],
        teste: [
          {
            pergunta: 'Quanto gasta um banho de 5 minutos, fechando o chuveiro para se ensaboar?',
            opcoes: ['45 litros', '135 litros', '10 litros'],
            correta: 0,
            explicacao: 'Com 15 minutos de chuveiro aberto são 135 litros. Com 5 minutos, 45 litros.',
          },
          {
            pergunta: 'Para que serve a água do enxágue da máquina de lavar?',
            opcoes: ['Para beber, se estiver clara', 'Para a descarga e para lavar o chão', 'Para regar a alface'],
            correta: 1,
            explicacao: 'Mesmo clara, ela tem sabão e micróbios. Só serve para a descarga e para a limpeza.',
          },
          {
            pergunta: 'Como guardar a água reaproveitada?',
            opcoes: ['Em balde destampado no quintal', 'Em balde bem tampado e usar logo', 'Junto com a água de beber'],
            correta: 1,
            explicacao: 'Tampada, ela não vira criadouro do mosquito da dengue. A água de roupa muito suja deve ser usada no mesmo dia.',
          },
        ],
        fontes: [
          'Copasa, pela Agência Minas (Governo de Minas Gerais): dicas de economia de água',
          'IPT (Instituto de Pesquisas Tecnológicas de São Paulo): Manual de águas cinzas',
        ],
      },
      {
        id: 'agua-tratar',
        nivel: 'medio',
        titulo: 'Tratar água em casa',
        objetivo: 'Deixar própria para beber uma água de origem duvidosa, com 4 métodos.',
        minutos: 7,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'balde', x: 44, y: 52, largura: 56, movimento: 'entrar' },
                { desenho: 'relogio', x: 84, y: 22, largura: 20, movimento: 'entrar', atraso: 0.8 },
              ],
              rotulos: [
                { texto: 'A SUJEIRA DESCE', x: 44, y: 90, tamanho: 7, atraso: 1.8 },
              ],
            },
            titulo: '1. Deixe descansar',
            texto: 'A sujeira desce para o fundo do balde tampado.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pano', x: 50, y: 30, largura: 50, movimento: 'cair' },
                { desenho: 'balde', x: 50, y: 70, largura: 40, movimento: 'surgir', atraso: 0.6 },
                { desenho: 'seta', x: 50, y: 48, largura: 14, giro: 90, movimento: 'pulsar', atraso: 1.2 },
              ],
            },
            titulo: '2. Coe num pano limpo',
            texto: 'Passe só a parte de cima por pano dobrado ou filtro de café.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'panela', x: 46, y: 46, largura: 64, movimento: 'entrar' },
                { desenho: 'relogio', x: 86, y: 20, largura: 18, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [
                { texto: '5 MINUTOS FERVENDO', x: 50, y: 90, tamanho: 6.5, atraso: 1.6, destaque: true },
              ],
            },
            titulo: '3. Ferva 5 minutos',
            texto: 'Depois que borbulhar. Deixe esfriar tampada.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'conta-gotas', x: 34, y: 32, largura: 14, movimento: 'deslizar', vindoDe: [0, -30] },
                { desenho: 'garrafa-pet', x: 62, y: 56, largura: 20, movimento: 'entrar', atraso: 0.6 },
                { desenho: 'relogio', x: 86, y: 24, largura: 16, movimento: 'entrar', atraso: 1.6 },
              ],
              rotulos: [
                { texto: '2 GOTAS POR LITRO', x: 50, y: 92, tamanho: 6.5, atraso: 1.2, destaque: true },
              ],
            },
            titulo: 'Ou: 2 gotas por litro',
            texto: 'Hipoclorito 2,5%. Mexa e espere 30 minutos.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'sol', x: 50, y: 22, largura: 30, movimento: 'girar' },
                { desenho: 'garrafa-pet', x: 50, y: 66, largura: 20, giro: 90, movimento: 'cair', atraso: 0.6 },
              ],
              rotulos: [
                { texto: '6 HORAS DE SOL', x: 50, y: 90, tamanho: 7, atraso: 1.6, destaque: true },
              ],
            },
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
        id: 'agua-carro-pipa',
        nivel: 'medio',
        titulo: 'Receber água do carro-pipa',
        objetivo: 'Conferir o caminhão, limpar a vasilha e guardar a água do carro-pipa sem sujar.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'caminhao-pipa', x: 50, y: 46, largura: 80, movimento: 'deslizar', vindoDe: [-40, 0] },
                { desenho: 'certo', x: 88, y: 18, largura: 12, movimento: 'surgir', atraso: 1.6 },
              ],
              rotulos: [
                { texto: 'ESCRITO ÁGUA POTÁVEL', x: 50, y: 90, tamanho: 6.5, atraso: 1.2, destaque: true },
              ],
            },
            titulo: 'Confira o caminhão',
            texto: 'No tanque deve estar escrito ÁGUA POTÁVEL, com o nome e o telefone do responsável.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'galao', x: 40, y: 50, largura: 30, movimento: 'balancar' },
                { desenho: 'relogio', x: 76, y: 34, largura: 20, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [
                { texto: '30 MINUTOS TAMPADA', x: 50, y: 90, tamanho: 6.5, atraso: 1.6, destaque: true },
              ],
            },
            titulo: 'Limpe a vasilha antes',
            texto: '1 litro de água com 2 colheres de sopa de água sanitária. Tampe, chacoalhe e espere 30 minutos.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'galao', x: 50, y: 52, largura: 30, movimento: 'surgir' },
                { desenho: 'tampa', x: 50, y: 18, largura: 20, movimento: 'cair', atraso: 0.8 },
              ],
              rotulos: [
                { texto: 'SÓ PARA ÁGUA DE BEBER', x: 50, y: 90, tamanho: 6.5, atraso: 1.4 },
              ],
            },
            titulo: 'Enxágue, encha e tampe',
            texto: 'Enxágue com água tratada. Encha e tampe logo.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'galao', x: 36, y: 54, largura: 28, movimento: 'entrar' },
                { desenho: 'mao', x: 72, y: 46, largura: 22, movimento: 'entrar', atraso: 0.8 },
                { desenho: 'errado', x: 72, y: 46, largura: 16, movimento: 'pulsar', atraso: 1.6 },
              ],
            },
            titulo: 'Não enfie a mão',
            texto: 'Despeje ou use torneirinha. Guarde longe do sol, de gasolina e de veneno.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'conta-gotas', x: 34, y: 32, largura: 14, movimento: 'pingar' },
                { desenho: 'galao', x: 62, y: 58, largura: 26, movimento: 'entrar', atraso: 0.6 },
              ],
              rotulos: [
                { texto: '40 GOTAS EM 20 LITROS', x: 50, y: 92, tamanho: 6.5, atraso: 1.2, destaque: true },
              ],
            },
            titulo: 'Na dúvida, trate',
            texto: 'Hipoclorito 2,5%: 2 gotas por litro. Mexa e espere 30 minutos antes de beber.',
            segundos: 8,
          },
        ],
        partes: [
          {
            titulo: 'Conferir o caminhão',
            paragrafos: [
              'O carro-pipa que leva água de beber precisa seguir regras do Ministério da Saúde. Antes de encher suas vasilhas, olhe o caminhão.',
            ],
            passos: [
              'No tanque deve estar escrito ÁGUA POTÁVEL, bem visível.',
              'No tanque também ficam o nome, o telefone e o endereço do responsável.',
              'A tampa de cima tem borracha de vedação e trava. A torneira de saída fica fechada.',
              'O tanque não pode ter furo, vazamento, amassado ou ferrugem.',
              'O motorista precisa levar a autorização da Saúde para transportar água de beber.',
            ],
          },
          {
            titulo: 'Se algo estiver errado',
            paragrafos: [
              'Caminhão sem a placa ÁGUA POTÁVEL, com vazamento ou ferrugem: não beba essa água sem tratar. Avise a vigilância sanitária da prefeitura.',
            ],
          },
          {
            titulo: 'Limpar a vasilha antes do caminhão chegar',
            passos: [
              'Use vasilha firme, com tampa, só para água de beber.',
              'Nunca use vasilha que já teve água sanitária, veneno, óleo ou gasolina.',
              'Coloque 1 litro de água e 2 colheres de sopa (30 ml) de água sanitária.',
              'Tampe e chacoalhe para molhar toda a parte de dentro.',
              'Deixe tampada por 30 minutos. Depois jogue fora e enxágue com água tratada.',
            ],
          },
          {
            titulo: 'Guardar e usar',
            passos: [
              'Encha e tampe logo. Sem tampa, cubra com prato limpo ou pano limpo.',
              'Guarde em lugar fresco, longe do sol, de gasolina e de veneno.',
              'Escreva na vasilha "água de beber" e a data.',
              'Para tirar, despeje ou use torneirinha. Não enfie a mão nem a caneca.',
              'Na dúvida, trate: 2 gotas de hipoclorito 2,5% por litro, ou 40 gotas em 20 litros. Mexa, espere 30 minutos e beba em até 24 horas.',
            ],
          },
        ],
        erros: [
          'Encher vasilha suja ou sem tampa.',
          'Reaproveitar galão de água sanitária, de óleo ou de veneno.',
          'Pegar água enfiando a mão ou a caneca na vasilha.',
          'Tratar a água de beber com água sanitária perfumada ou com alvejante.',
          'Beber sem tratar a água de caminhão sem a placa ÁGUA POTÁVEL.',
        ],
        teste: [
          {
            pergunta: 'O que deve estar escrito no tanque do carro-pipa?',
            opcoes: ['ÁGUA POTÁVEL', 'Só o nome da cidade', 'Nada, basta ser azul'],
            correta: 0,
            explicacao: 'O tanque de água de beber mostra ÁGUA POTÁVEL e o nome e o telefone do responsável.',
          },
          {
            pergunta: 'Como limpar a vasilha antes de encher?',
            opcoes: [
              'Encher direto, sem limpar',
              '1 litro de água com 2 colheres de sopa de água sanitária, tampar, chacoalhar e esperar 30 minutos',
              'Passar só um pano seco',
            ],
            correta: 1,
            explicacao: 'Depois dos 30 minutos, jogue fora e enxágue com água tratada.',
          },
          {
            pergunta: 'Quantas gotas de hipoclorito 2,5% para tratar 20 litros?',
            opcoes: ['2 gotas', '40 gotas', '1 copo cheio'],
            correta: 1,
            explicacao: '2 gotas por litro: 20 litros pedem 40 gotas. Mexa e espere 30 minutos.',
          },
        ],
        fontes: [
          'Ministério da Saúde: Cuidados com carro-pipa (desastres e emergências)',
          'Secretaria da Saúde de São Paulo (CVE): uso do hipoclorito de sódio e limpeza de recipientes',
          'CDC: Safe Water Storage',
        ],
      },
      {
        id: 'agua-cisterna',
        nivel: 'avancado',
        titulo: 'Água de chuva e cisterna',
        objetivo: 'Captar água de chuva limpa e manter a cisterna e a caixa d’água sem contaminação.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'cisterna-casa', x: 50, y: 46, largura: 90, movimento: 'entrar' },
              ],
              rotulos: [
                { texto: 'DESVIE A 1ª CHUVA', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true },
              ],
            },
            titulo: 'Desvie a primeira chuva',
            texto: 'Ela lava o telhado e leva fezes de bicho, poeira e folhas.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'balde', x: 28, y: 40, largura: 30, movimento: 'balancar' },
                { desenho: 'errado', x: 28, y: 40, largura: 34, movimento: 'entrar', atraso: 0.8 },
                { desenho: 'bomba-ar', x: 74, y: 46, largura: 22, movimento: 'surgir', atraso: 1.2 },
                { desenho: 'certo', x: 88, y: 22, largura: 14, movimento: 'entrar', atraso: 2 },
              ],
              rotulos: [
                { texto: 'BOMBA MANUAL', x: 72, y: 86, tamanho: 6.5, atraso: 2.2 },
              ],
            },
            titulo: 'Tire com bomba, não com balde',
            texto: 'Balde e corda levam sujeira para dentro da cisterna.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'caixa-dagua', x: 48, y: 46, largura: 62, movimento: 'entrar' },
                { desenho: 'relogio', x: 86, y: 24, largura: 18, movimento: 'entrar', atraso: 1.2 },
              ],
              rotulos: [
                { texto: '1 L para 1.000 L · 2 horas', x: 50, y: 88, tamanho: 6, atraso: 1.6, destaque: true },
              ],
            },
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
    area: 'emergencias',
    titulo: 'Primeiros socorros',
    resumo: 'Parada cardíaca, engasgo, derrame, sangramento, queimadura e quedas.',
    licoes: [
      {
        id: 'queda-levantar',
        nivel: 'facil',
        titulo: 'Caiu no chão: levantar sem se machucar',
        objetivo: 'Saber quando dá para levantar sozinho, levantar devagar com apoio e pedir ajuda quando não dá.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 50, y: 60, largura: 80, movimento: 'surgir' },
                { desenho: 'relogio', x: 84, y: 24, largura: 18, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'DEVAGAR', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'Calma, não levante rápido',
            texto: 'Respire. Veja se tem dor forte ou se não consegue mexer um braço ou uma perna.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 34, y: 34, largura: 50, movimento: 'balancar' },
                { desenho: 'seta', x: 50, y: 52, largura: 12, giro: 90, movimento: 'surgir', atraso: 0.8 },
                { desenho: 'pessoa-quatro-apoios', x: 60, y: 66, largura: 56, movimento: 'deslizar', vindoDe: [-16, 0], atraso: 1.4 },
              ],
              rotulos: [{ texto: 'MÃOS E JOELHOS', x: 50, y: 90, tamanho: 7, atraso: 2, destaque: true }],
            },
            titulo: 'Vire de lado e fique de quatro',
            texto: 'Role de lado e use os braços para apoiar as mãos e os joelhos no chão.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'cadeira', x: 72, y: 50, largura: 22, movimento: 'cair' },
                { desenho: 'pessoa-quatro-apoios', x: 36, y: 60, largura: 50, movimento: 'deslizar', vindoDe: [-20, 0], atraso: 0.8 },
                { desenho: 'seta', x: 56, y: 30, largura: 12, giro: -90, movimento: 'pulsar', atraso: 1.6 },
              ],
              rotulos: [{ texto: 'UM PÉ NO CHÃO', x: 50, y: 90, tamanho: 7, atraso: 2, destaque: true }],
            },
            titulo: 'Segure num móvel firme',
            texto: 'Vá até uma cadeira ou um sofá firme. Ponha um pé no chão e suba devagar.',
            segundos: 9,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 40, y: 62, largura: 64, movimento: 'surgir' },
                { desenho: 'pano', x: 46, y: 52, largura: 34, movimento: 'cair', atraso: 0.8 },
                { desenho: 'telefone', x: 84, y: 40, largura: 14, movimento: 'pulsar', atraso: 1.4 },
              ],
              rotulos: [{ texto: 'LIGUE 192', x: 50, y: 88, tamanho: 7, atraso: 2, destaque: true }],
            },
            titulo: 'Não dá para levantar? Peça ajuda',
            texto: 'Use o telefone ou bata na parede. Cubra-se e mexa o corpo enquanto espera.',
            segundos: 9,
          },
        ],
        partes: [
          {
            titulo: 'Antes de levantar',
            passos: [
              'Não se desespere. Fique parado um pouco e respire.',
              'Veja se sente dor forte ou se não consegue mexer algum braço ou perna.',
              'Se pode ter machucado a cabeça, as costas, o pescoço ou o quadril, não levante: peça ajuda.',
              'Se der, chame alguém pelo telefone ou pelo alarme.',
            ],
          },
          {
            titulo: 'Levantar com apoio',
            passos: [
              'Não tenha pressa. Não levante de uma vez.',
              'Role para o lado e use os braços para ficar de quatro, com as mãos e os joelhos no chão.',
              'Vá engatinhando até um móvel firme, como uma cadeira, um sofá ou a pia.',
              'Segure no móvel, ponha um pé no chão, bem firme, e suba devagar.',
              'Sente e descanse até se sentir bem.',
            ],
          },
          {
            titulo: 'Se não conseguir levantar',
            passos: [
              'Se o telefone ou o alarme estiver ao alcance, use para pedir ajuda.',
              'Se não estiver, grite por socorro ou bata na parede ou no chão.',
              'Cubra-se com o que alcançar: toalha, casaco, tapete ou cobertor.',
              'Mexa o corpo: role de um lado para o outro ou mexa devagar os braços e as pernas.',
              'Mude de posição mais ou menos a cada 30 minutos, para não ferir a pele.',
            ],
          },
          {
            titulo: 'Se outra pessoa caiu',
            passos: [
              'Ligue 192 se ela pode ter machucado a cabeça, as costas, o pescoço ou o quadril, ou se não consegue levantar.',
              'Deixe a pessoa confortável e aquecida enquanto espera.',
              'Só ajude a levantar se ela conseguir fazer força sozinha. Não levante a pessoa no colo.',
            ],
          },
          {
            titulo: 'Para não cair de novo',
            passos: [
              'Tire tapetes soltos e fios do caminho. No banheiro, use tapete antiderrapante.',
              'Ponha barras de apoio perto do vaso e dentro do box.',
              'Deixe um interruptor ou uma luminária perto da cama e luz noturna no corredor.',
              'Use sapato fechado, com sola antiderrapante e firme no calcanhar.',
              'Guarde o que usa todo dia na altura entre a cintura e o ombro, para não subir em banco.',
              'Ande com o celular no bolso.',
              'Se um remédio dá tontura, fale com o médico ou o farmacêutico.',
            ],
          },
        ],
        erros: [
          'Levantar de uma vez, logo depois de cair.',
          'Levantar sozinho depois de bater a cabeça, as costas, o pescoço ou o quadril.',
          'Pegar no colo ou puxar pelos braços uma pessoa que não consegue fazer força.',
          'Ficar no chão frio sem se cobrir e sem mudar de posição.',
        ],
        teste: [
          {
            pergunta: 'Você caiu e acha que não se machucou. Como levantar?',
            opcoes: ['De uma vez, bem rápido', 'De lado, de quatro, segurando num móvel firme e devagar', 'Puxando a toalha da mesa'],
            correta: 1,
            explicacao: 'Role de lado, fique de quatro, vá até um móvel firme, ponha um pé no chão e suba devagar.',
          },
          {
            pergunta: 'Você bateu o quadril e sente dor forte. O que fazer?',
            opcoes: ['Levantar logo para ver se passa', 'Não levantar e pedir ajuda pelo telefone, gritando ou batendo na parede', 'Ir andando até a cama'],
            correta: 1,
            explicacao: 'Se pode ter machucado a cabeça, as costas, o pescoço ou o quadril, fique no chão e peça ajuda. Ligue 192.',
          },
          {
            pergunta: 'Esperando ajuda no chão, o que ajuda?',
            opcoes: ['Ficar imóvel e descoberto', 'Cobrir-se e mudar de posição mais ou menos a cada 30 minutos', 'Tirar a roupa para refrescar'],
            correta: 1,
            explicacao: 'Cobrir-se mantém o corpo quente e mudar de posição protege a pele.',
          },
        ],
        fontes: [
          'NHS (serviço público de saúde do Reino Unido): o que fazer se você cair',
          'NHS 111 Wales: quedas',
          'Secretaria Municipal de Saúde de Santos (SP): cartilha de prevenção de quedas em idosos',
        ],
      },
      {
        id: 'rcp',
        nivel: 'avancado',
        titulo: 'Parada cardíaca: massagem no peito',
        objetivo: 'Reconhecer uma parada cardíaca e fazer a massagem no peito até o socorro chegar.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 50, y: 62, largura: 84, movimento: 'surgir' },
                { desenho: 'mao', x: 40, y: 34, largura: 16, giro: 180, movimento: 'empurrar', atraso: 0.6 },
              ],
              rotulos: [
                { texto: 'Você está bem?', x: 50, y: 14, tamanho: 7, atraso: 1, destaque: true },
                { texto: 'NÃO RESPONDE?', x: 50, y: 88, tamanho: 7, atraso: 2.2 },
              ],
            },
            titulo: 'Chame e toque nos ombros',
            texto: 'Não responde e não respira normal? É parada.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'telefone', x: 40, y: 44, largura: 32, movimento: 'acender', atraso: 0.6 },
              ],
              rotulos: [
                { texto: '192', x: 76, y: 44, tamanho: 16, atraso: 1, destaque: true },
                { texto: 'VIVA-VOZ', x: 50, y: 88, tamanho: 7, atraso: 1.6 },
              ],
            },
            titulo: 'Ligue 192 no viva-voz',
            texto: 'Ou peça para alguém ligar enquanto você começa.',
            segundos: 5,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 50, y: 72, largura: 84, movimento: 'surgir' },
                { desenho: 'maos-rcp', x: 52, y: 40, largura: 30, movimento: 'deslizar', vindoDe: [0, -30], atraso: 0.6 },
              ],
              rotulos: [
                { texto: 'MEIO DO PEITO', x: 50, y: 12, tamanho: 7, atraso: 1.6, destaque: true },
              ],
            },
            titulo: 'Mãos no meio do peito',
            texto: 'Uma sobre a outra, braços retos.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 50, y: 74, largura: 84 },
                { desenho: 'maos-rcp', x: 52, y: 44, largura: 30, movimento: 'empurrar', atraso: 0.3 },
              ],
              rotulos: [
                { texto: '5 cm', x: 86, y: 46, tamanho: 8, atraso: 0.6 },
                { texto: '100 a 120 por minuto', x: 50, y: 12, tamanho: 6.5, atraso: 1, destaque: true },
              ],
            },
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
        id: 'dea-desfibrilador',
        nivel: 'avancado',
        titulo: 'Usar o desfibrilador (DEA)',
        objetivo: 'Ligar o DEA, colar as pás no peito e seguir a voz do aparelho sem parar a massagem.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'telefone', x: 30, y: 46, largura: 18, movimento: 'pulsar' },
                { desenho: 'dea', x: 68, y: 46, largura: 34, movimento: 'deslizar', vindoDe: [24, 0], atraso: 0.8 },
              ],
              rotulos: [{ texto: 'BUSQUE O DEA', x: 50, y: 88, tamanho: 7.5, atraso: 1.6, destaque: true }],
            },
            titulo: 'Peça para alguém buscar o DEA',
            texto: 'Ligue 192. Você não para a massagem para ir buscar.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [{ desenho: 'dea', x: 50, y: 46, largura: 46, movimento: 'acender' }],
              rotulos: [{ texto: 'LIGUE E ESCUTE', x: 50, y: 88, tamanho: 7.5, atraso: 1.4, destaque: true }],
            },
            titulo: 'Ligue e siga a voz',
            texto: 'Aperte o botão de ligar. O aparelho fala cada passo.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [{ desenho: 'peito-pas', x: 50, y: 52, largura: 40, movimento: 'surgir' }],
              rotulos: [
                { texto: 'ALTO DO PEITO', x: 50, y: 10, tamanho: 6.5, atraso: 1.2 },
                { texto: 'ABAIXO DA AXILA', x: 50, y: 92, tamanho: 6.5, atraso: 2, destaque: true },
              ],
            },
            titulo: 'Pás no peito sem roupa',
            texto: 'Uma no alto do peito, à direita. A outra no lado esquerdo, abaixo da axila.',
            segundos: 10,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 50, y: 64, largura: 80, movimento: 'surgir' },
                { desenho: 'mao', x: 50, y: 30, largura: 14, movimento: 'tremer', atraso: 0.8 },
                { desenho: 'errado', x: 50, y: 30, largura: 20, movimento: 'surgir', atraso: 1.4 },
              ],
              rotulos: [{ texto: 'AFASTEM-SE!', x: 50, y: 90, tamanho: 8, atraso: 2, destaque: true }],
            },
            titulo: 'Ninguém encosta',
            texto: 'Enquanto o aparelho analisa e dá o choque, ninguém toca na pessoa.',
            segundos: 9,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-deitada', x: 50, y: 74, largura: 84 },
                { desenho: 'maos-rcp', x: 52, y: 44, largura: 30, movimento: 'empurrar', atraso: 0.4 },
              ],
              rotulos: [{ texto: 'VOLTE À MASSAGEM', x: 50, y: 12, tamanho: 7, atraso: 1, destaque: true }],
            },
            titulo: 'Volte a empurrar o peito',
            texto: 'Logo depois do choque, ou se o aparelho disser que não precisa, volte à massagem.',
            segundos: 9,
          },
        ],
        partes: [
          {
            titulo: 'O que é o DEA',
            paragrafos: [
              'O DEA (desfibrilador externo automático) é uma caixa com duas pás adesivas. Ele dá um choque que pode fazer o coração voltar a bater direito numa parada cardíaca.',
              'Qualquer pessoa pode usar, mesmo sem curso. Depois de ligado, ele fala o que fazer.',
              'O próprio aparelho examina o coração e só manda dar o choque se for preciso. Você não dá choque em quem não precisa.',
              'Em prédio, shopping ou estação, pergunte ao segurança ou à portaria se há um DEA.',
            ],
          },
          {
            titulo: 'Antes do aparelho chegar',
            passos: [
              'Ligue 192 no viva-voz.',
              'Comece a massagem no peito, como na lição de parada cardíaca.',
              'Peça para outra pessoa buscar o DEA. Não pare a massagem para ir procurar.',
            ],
          },
          {
            titulo: 'Usar o aparelho',
            passos: [
              'Ligue o DEA e faça o que a voz mandar.',
              'Tire a roupa do peito. Se precisar, corte a roupa ou o sutiã. Muitos estojos têm tesoura.',
              'Se o peito estiver molhado, seque. Se a pessoa estiver na água, tire-a de lá antes.',
              'Cole uma pá no alto do peito, à direita da pessoa. Cole a outra no lado esquerdo, alguns dedos abaixo da axila. O desenho na pá mostra o lugar.',
              'Se houver um adesivo de remédio no lugar da pá, tire e limpe a pele antes.',
              'Se notar um caroço de marca-passo debaixo da pele, cole a pá longe dele.',
              'Se o aparelho tiver um fio solto, encaixe na caixa.',
            ],
          },
          {
            titulo: 'Análise e choque',
            passos: [
              'Quando o aparelho disser que vai analisar, pare a massagem e não toque na pessoa.',
              'Se ele mandar dar o choque, confira que ninguém está encostando e fale alto: "Afastem-se!".',
              'Aperte o botão do choque.',
              'Logo depois do choque, ou se ele disser que não precisa, volte à massagem.',
              'Não tire as pás. O aparelho avisa quando vai analisar de novo.',
              'Só pare quando a pessoa mostrar sinal de vida, o aparelho mandar parar ou o SAMU assumir.',
            ],
          },
          {
            titulo: 'Criança',
            paragrafos: [
              'Estes passos valem para adulto e para criança de 8 anos ou mais com mais de 25 kg. Para criança menor, siga a voz do aparelho e o atendente do 192.',
            ],
          },
        ],
        erros: [
          'Parar a massagem para ir procurar o DEA.',
          'Encostar na pessoa enquanto o aparelho analisa ou dá o choque.',
          'Colar a pá por cima da roupa ou com o peito molhado.',
          'Tirar as pás depois do primeiro choque.',
          'Não usar por medo de machucar: o aparelho só dá choque se for preciso.',
        ],
        teste: [
          {
            pergunta: 'Quem pode usar o DEA?',
            opcoes: ['Só médico', 'Qualquer pessoa, seguindo a voz do aparelho', 'Só bombeiro'],
            correta: 1,
            explicacao: 'O DEA fala cada passo e só manda dar o choque se for preciso.',
          },
          {
            pergunta: 'Onde colar as pás?',
            opcoes: [
              'No peito sem roupa: alto do peito à direita e lado esquerdo abaixo da axila',
              'Por cima da camisa, na barriga',
              'Nas costas, por cima da roupa',
            ],
            correta: 0,
            explicacao: 'Pele seca e sem roupa, no lugar que o desenho da pá mostra.',
          },
          {
            pergunta: 'O aparelho deu o choque. E agora?',
            opcoes: ['Tirar as pás e esperar', 'Voltar logo à massagem no peito', 'Dar água para a pessoa'],
            correta: 1,
            explicacao: 'Volte à massagem e deixe as pás coladas. O aparelho avisa quando vai analisar de novo.',
          },
        ],
        fontes: [
          'Cruz Vermelha Americana: passos para usar o DEA',
          'Ebserh, Hospital Universitário da UFS (gov.br): Suporte Básico de Vida no Adulto (2024)',
          'British Heart Foundation: como usar um desfibrilador',
          'West Midlands Ambulance Service (NHS): desfibriladores',
        ],
      },
      {
        id: 'engasgo',
        nivel: 'medio',
        titulo: 'Engasgo em adulto, criança e bebê',
        objetivo: 'Desengasgar com o método atual: 5 golpes nas costas e 5 compressões.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa', x: 40, y: 50, largura: 26, movimento: 'tremer' },
              ],
              rotulos: [
                { texto: 'cof! cof!', x: 76, y: 30, tamanho: 8, atraso: 0.6 },
                { texto: 'DEIXE TOSSIR', x: 50, y: 90, tamanho: 7, atraso: 1.4, destaque: true },
              ],
            },
            titulo: 'Tossindo forte? Deixe tossir',
            texto: 'Não dê tapas enquanto a pessoa consegue tossir e falar.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa', x: 42, y: 54, largura: 26, giro: 20 },
                { desenho: 'mao', x: 62, y: 36, largura: 16, giro: -60, movimento: 'empurrar', atraso: 0.4 },
              ],
              rotulos: [
                { texto: '5 GOLPES', x: 50, y: 90, tamanho: 8, atraso: 1.2, destaque: true },
              ],
            },
            titulo: '5 golpes nas costas',
            texto: 'Incline a pessoa para a frente. Bata entre as escápulas.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa', x: 40, y: 52, largura: 26 },
                { desenho: 'mao', x: 56, y: 54, largura: 16, giro: -90, movimento: 'empurrar', atraso: 0.4 },
                { desenho: 'seta', x: 74, y: 40, largura: 14, giro: -45, movimento: 'surgir', atraso: 1 },
              ],
              rotulos: [
                { texto: 'PARA DENTRO E PARA CIMA', x: 50, y: 90, tamanho: 5.5, atraso: 1.4 },
              ],
            },
            titulo: '5 compressões na barriga',
            texto: 'Abrace por trás, punho acima do umbigo, puxe para dentro e para cima.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'bebe', x: 46, y: 52, largura: 54, movimento: 'surgir' },
                { desenho: 'mao', x: 50, y: 28, largura: 14, giro: 180, movimento: 'empurrar', atraso: 0.6 },
              ],
              rotulos: [
                { texto: '5 nas costas + 5 no peito', x: 50, y: 84, tamanho: 6, atraso: 1.2 },
                { texto: 'NUNCA NA BARRIGA', x: 50, y: 12, tamanho: 6.5, atraso: 2, destaque: true },
              ],
            },
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
        id: 'avc-reconhecer',
        nivel: 'medio',
        titulo: 'Derrame (AVC): reconhecer e chamar ajuda',
        objetivo: 'Fazer o teste rápido do derrame, ligar 192 na hora e cuidar da pessoa até o socorro chegar.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'rosto-torto', x: 50, y: 48, largura: 40, movimento: 'surgir' },
                { desenho: 'seta', x: 80, y: 62, largura: 12, giro: 160, movimento: 'pulsar', atraso: 1.2 },
              ],
              rotulos: [{ texto: 'SORRIA', x: 50, y: 90, tamanho: 8, atraso: 1.6, destaque: true }],
            },
            titulo: 'Peça para sorrir',
            texto: 'Um lado da boca fica caído ou torto? É sinal de derrame.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa-bracos', x: 50, y: 52, largura: 34, movimento: 'entrar' },
                { desenho: 'seta', x: 80, y: 46, largura: 12, giro: 90, movimento: 'pulsar', atraso: 1.4 },
              ],
              rotulos: [{ texto: 'LEVANTE OS 2 BRAÇOS', x: 50, y: 92, tamanho: 6.5, atraso: 1.8, destaque: true }],
            },
            titulo: 'Peça para levantar os dois braços',
            texto: 'Um braço fica fraco ou vai caindo? É sinal de derrame.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pessoa', x: 34, y: 54, largura: 22, movimento: 'balancar' },
                { desenho: 'relogio', x: 72, y: 40, largura: 24, movimento: 'deslizar', vindoDe: [16, 0], atraso: 0.8 },
              ],
              rotulos: [{ texto: 'REPITA UMA FRASE', x: 50, y: 90, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'Peça para repetir uma frase',
            texto: 'A fala sai enrolada ou estranha? Olhe o relógio e guarde a hora.',
            segundos: 9,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'telefone', x: 40, y: 50, largura: 18, movimento: 'pulsar' },
                { desenho: 'copo', x: 70, y: 52, largura: 14, movimento: 'cair', atraso: 0.8 },
                { desenho: 'errado', x: 70, y: 52, largura: 22, movimento: 'surgir', atraso: 1.4 },
              ],
              rotulos: [{ texto: 'LIGUE 192', x: 50, y: 88, tamanho: 8, atraso: 2, destaque: true }],
            },
            titulo: 'Ligue 192 na hora',
            texto: 'Um sinal só já basta. Não dê comida nem bebida enquanto espera.',
            segundos: 9,
          },
        ],
        partes: [
          {
            titulo: 'O que é o derrame',
            paragrafos: [
              'O derrame, chamado de AVC (acidente vascular cerebral), acontece quando falta sangue numa parte do cérebro.',
              'Cada minuto conta. Quanto mais rápido a pessoa recebe atendimento, maior a chance de não ficar com sequelas.',
            ],
          },
          {
            titulo: 'Os sinais aparecem de repente',
            passos: [
              'Um lado do rosto caído ou a boca torta.',
              'Fraqueza ou formigamento num braço, numa perna ou num lado do corpo.',
              'Fala enrolada, dificuldade para falar ou para entender.',
              'Perda da visão num olho ou nos dois.',
              'Tontura forte, perda do equilíbrio ou dificuldade para andar.',
              'Dor de cabeça muito forte, sem motivo.',
            ],
          },
          {
            titulo: 'O teste rápido',
            passos: [
              'Peça para a pessoa sorrir. Veja se a boca fica torta.',
              'Peça para levantar os dois braços. Veja se um fica fraco ou vai caindo.',
              'Peça para repetir uma frase simples. Veja se a fala sai enrolada ou estranha.',
              'Se tiver dificuldade em qualquer um, ligue 192 na hora. Um sinal só já basta.',
            ],
          },
          {
            titulo: 'Enquanto o socorro não chega',
            passos: [
              'Olhe o relógio e anote a hora em que os sinais começaram. Se não sabe, anote a última hora em que a pessoa estava bem.',
              'Fale essa hora para o atendente e para a equipe do socorro.',
              'Fique junto da pessoa. Deixe-a confortável, apoiada, e acalme-a.',
              'Não dê comida nem bebida: ela pode ter dificuldade para engolir.',
              'Se ela estiver acordada mas sonolenta, babando ou com dificuldade para engolir, deite-a de lado.',
              'Se ela desmaiar e não respirar, comece a massagem no peito.',
            ],
          },
          {
            titulo: 'Os sinais passaram?',
            paragrafos: [
              'Às vezes os sinais somem em poucos minutos. Isso também é grave: a pessoa tem risco muito alto de ter um derrame logo depois.',
              'Mesmo que pareça que passou, procure atendimento médico na hora.',
            ],
          },
        ],
        erros: [
          'Esperar para ver se melhora ou deixar a pessoa ir dormir.',
          'Achar que os sinais sumiram e não procurar atendimento.',
          'Dar água, café, comida ou remédio pela boca.',
          'Esquecer a hora em que os sinais começaram.',
        ],
        teste: [
          {
            pergunta: 'Quais são os três pedidos do teste rápido do derrame?',
            opcoes: ['Sorrir, levantar os dois braços e repetir uma frase', 'Andar, pular e cantar', 'Tomar água, deitar e dormir'],
            correta: 0,
            explicacao: 'Boca torta, braço fraco ou fala enrolada: qualquer um é sinal de derrame.',
          },
          {
            pergunta: 'A pessoa está com a boca torta, mas o braço e a fala estão bem. O que fazer?',
            opcoes: ['Esperar os outros sinais aparecerem', 'Ligar 192 na hora', 'Dar um copo de água com açúcar'],
            correta: 1,
            explicacao: 'Um sinal só já basta. Cada minuto conta.',
          },
          {
            pergunta: 'O que anotar para contar ao socorro?',
            opcoes: ['A hora em que os sinais começaram', 'O que a pessoa almoçou', 'Nada, eles descobrem sozinhos'],
            correta: 0,
            explicacao: 'A hora em que começou ajuda o médico a escolher o tratamento.',
          },
        ],
        fontes: [
          'Ministério da Saúde, Linhas de Cuidado: AVC no adulto (Sou paciente)',
          'Biblioteca Virtual em Saúde do Ministério da Saúde: Dia Mundial do AVC',
          'UNA-SUS: aprenda quais são os primeiros sinais de um AVC',
          'Cruz Vermelha Americana: primeiros socorros no AVC',
          'St John Ambulance (Reino Unido): primeiros socorros no AVC',
          'CDC (Centros de Controle de Doenças dos EUA): sinais e sintomas de AVC',
        ],
      },
      {
        id: 'sangramento-queimadura',
        nivel: 'facil',
        titulo: 'Sangramento e queimadura',
        objetivo: 'Parar um sangramento e cuidar de uma queimadura nos primeiros minutos.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'braco', x: 50, y: 56, largura: 90, movimento: 'surgir' },
                { desenho: 'pano', x: 40, y: 44, largura: 30, movimento: 'cair', atraso: 0.6 },
                { desenho: 'mao', x: 40, y: 26, largura: 16, giro: 180, movimento: 'empurrar', atraso: 1.4 },
              ],
              rotulos: [
                { texto: 'APERTE SEM PARAR', x: 50, y: 88, tamanho: 7, atraso: 1.8, destaque: true },
              ],
            },
            titulo: 'Aperte com pano limpo',
            texto: 'Pressão firme e contínua, sem tirar para olhar.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'braco', x: 50, y: 60, largura: 90 },
                { desenho: 'pano', x: 40, y: 48, largura: 30 },
                { desenho: 'pano', x: 42, y: 40, largura: 32, giro: 8, movimento: 'cair', atraso: 0.6 },
              ],
              rotulos: [
                { texto: 'NÃO TIRE O PRIMEIRO', x: 50, y: 88, tamanho: 6.5, atraso: 1.6, destaque: true },
              ],
            },
            titulo: 'Encharcou? Ponha outro por cima',
            texto: 'Não tire o primeiro pano. Continue apertando.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'torneira', x: 38, y: 24, largura: 44, movimento: 'entrar' },
                { desenho: 'braco', x: 56, y: 68, largura: 80, movimento: 'surgir', atraso: 0.6 },
                { desenho: 'relogio', x: 86, y: 26, largura: 16, movimento: 'entrar', atraso: 1.4 },
              ],
              rotulos: [
                { texto: '10 a 20 min', x: 50, y: 92, tamanho: 7, atraso: 1.8, destaque: true },
              ],
            },
            titulo: 'Queimadura: água corrente',
            texto: 'De 10 a 20 minutos, em jato suave e fresco. Nada de gelo.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pasta', x: 50, y: 34, largura: 54, movimento: 'entrar' },
                { desenho: 'errado', x: 50, y: 34, largura: 34, movimento: 'entrar', atraso: 1 },
                { desenho: 'braco', x: 50, y: 72, largura: 80, movimento: 'surgir', atraso: 0.4 },
              ],
              rotulos: [
                { texto: 'NADA DE CREME', x: 50, y: 92, tamanho: 7, atraso: 1.6, destaque: true },
              ],
            },
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
    area: 'emergencias',
    titulo: 'Comida sem geladeira e sem gás',
    resumo: 'Salvar o que está na geladeira quando a luz cai e cozinhar gastando pouco.',
    licoes: [
      {
        id: 'sem-geladeira',
        nivel: 'facil',
        titulo: 'Faltou energia: o que salvar da geladeira',
        objetivo: 'Fazer a geladeira e o congelador segurarem o frio e saber o que comer e o que jogar fora.',
        minutos: 5,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'geladeira', x: 38, y: 48, largura: 40, movimento: 'entrar' },
                { desenho: 'relogio', x: 78, y: 34, largura: 24, movimento: 'entrar', atraso: 0.8 },
              ],
              rotulos: [{ texto: 'FECHADA: ~4 HORAS', x: 50, y: 90, tamanho: 6.5, atraso: 1.4, destaque: true }],
            },
            titulo: 'Não abra a porta',
            texto: 'Fechada, a geladeira segura o frio por cerca de 4 horas.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'geladeira', x: 24, y: 50, largura: 32, movimento: 'entrar' },
              ],
              rotulos: [
                { texto: 'CHEIO: ~48 h', x: 70, y: 38, tamanho: 6.5, atraso: 1, destaque: true },
                { texto: 'METADE: ~24 h', x: 70, y: 58, tamanho: 6.5, atraso: 1.8 },
              ],
            },
            titulo: 'Congelador cheio dura mais',
            texto: 'Cheio: cerca de 48 horas. Pela metade: cerca de 24 horas.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'floco', x: 40, y: 42, largura: 40, movimento: 'girar' },
                { desenho: 'certo', x: 78, y: 62, largura: 22, movimento: 'entrar', atraso: 1.2 },
              ],
              rotulos: [{ texto: 'TEM GELO? PODE', x: 50, y: 88, tamanho: 7, atraso: 1.6 }],
            },
            titulo: 'Ainda tem gelo? Pode congelar de novo',
            texto: 'Se ainda tem cristais de gelo ou está gelado como na geladeira.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'copo', x: 40, y: 42, largura: 26, movimento: 'surgir' },
                { desenho: 'errado', x: 40, y: 42, largura: 44, movimento: 'entrar', atraso: 0.8 },
              ],
              rotulos: [{ texto: 'NA DÚVIDA, JOGUE FORA', x: 50, y: 88, tamanho: 6.5, atraso: 1.4, destaque: true }],
            },
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
      {
        id: 'pouco-gas',
        nivel: 'medio',
        titulo: 'Cozinhar com pouco gás e com segurança',
        objetivo: 'Fazer o botijão render mais e usar carvão e fogareiro sem risco de intoxicação.',
        minutos: 5,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'panela', x: 40, y: 50, largura: 44, movimento: 'entrar' },
                { desenho: 'tampa', x: 40, y: 34, largura: 38, movimento: 'cair', atraso: 0.7 },
                { desenho: 'certo', x: 82, y: 28, largura: 20, movimento: 'entrar', atraso: 1.4 },
              ],
              rotulos: [{ texto: 'TAMPA FECHADA', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'Cozinhe com a tampa',
            texto: 'A tampa segura o calor e a comida fica pronta mais rápido.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'panela', x: 36, y: 46, largura: 40, movimento: 'tremer' },
                { desenho: 'relogio', x: 78, y: 40, largura: 24, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'CHIOU? FOGO BAIXO', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'Panela de pressão economiza',
            texto: 'Quando começar a chiar, abaixe o fogo.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'panela', x: 40, y: 50, largura: 40, movimento: 'entrar' },
                { desenho: 'pano', x: 40, y: 30, largura: 38, movimento: 'cair', atraso: 1 },
              ],
              rotulos: [{ texto: 'FERVEU? DESLIGUE E ABAFE', x: 50, y: 88, tamanho: 6.5, atraso: 1.8, destaque: true }],
            },
            titulo: 'Arroz abafado',
            texto: 'Desligue quando a água ferver, cubra com pano e tampa e deixe terminar.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'braseiro', x: 50, y: 38, largura: 38, movimento: 'surgir' },
                { desenho: 'errado', x: 50, y: 38, largura: 52, movimento: 'entrar', atraso: 0.8 },
              ],
              rotulos: [
                { texto: 'CARVÃO E FOGAREIRO', x: 50, y: 78, tamanho: 6.5, atraso: 1.2 },
                { texto: 'NUNCA DENTRO DE CASA', x: 50, y: 90, tamanho: 6.5, atraso: 1.6, destaque: true },
              ],
            },
            titulo: 'Carvão só ao ar livre',
            texto: 'A fumaça tem um gás sem cheiro que mata. Use fora de casa, longe das janelas.',
            segundos: 7,
          },
        ],
        partes: [
          {
            titulo: 'Fazer o botijão render',
            passos: [
              'Cozinhe sempre com a panela tampada.',
              'Use a panela de pressão para feijão, carne e legumes duros. Quando chiar, abaixe o fogo.',
              'Arroz: quando a água ferver, desligue, cubra a panela com um pano de prato, tampe e deixe o calor terminar.',
              'Deixe o fogão longe de vento e de janela aberta: o vento rouba o calor.',
              'No forno, não fique abrindo a porta. Asse mais de uma coisa de uma vez.',
            ],
          },
          {
            titulo: 'Carvão, fogareiro e lampião',
            paragrafos: [
              'Carvão, fogareiro de acampamento, lampião e gerador soltam monóxido de carbono. É um gás que não tem cor nem cheiro e mata em pouco tempo, principalmente quem está dormindo.',
            ],
            passos: [
              'Nunca use carvão, braseiro, fogareiro ou lampião a gás dentro de casa, nem na garagem.',
              'Use só ao ar livre, longe de portas e janelas abertas.',
              'Nunca use o forno ou as bocas do fogão para esquentar a casa.',
              'Se não tiver onde cozinhar com segurança, peça ajuda a vizinhos ou procure um abrigo.',
            ],
          },
          {
            titulo: 'Sinais de intoxicação',
            paragrafos: ['Dor de cabeça, tontura, fraqueza, enjoo, vômito, dor no peito e confusão. Se várias pessoas da casa sentirem isso ao mesmo tempo, desconfie.'],
            passos: [
              'Saia na hora para o ar livre e leve todos com você.',
              'Ligue 192.',
              'Não volte para dentro até o lugar ser ventilado e a fonte do gás ser apagada.',
            ],
          },
          {
            titulo: 'Cheiro de gás',
            passos: [
              'Feche o botijão, abra as janelas e não acenda nada, nem a luz.',
              'Teste vazamento com espuma de sabão na mangueira e no regulador: se borbulhar, troque.',
              'Mangueira e regulador têm validade: veja a data impressa e troque quando vencer.',
            ],
          },
        ],
        erros: [
          'Fazer churrasco ou acender braseiro dentro de casa porque está chovendo.',
          'Achar que a janela aberta resolve: não resolve.',
          'Cozinhar com a panela destampada e o fogo alto o tempo todo.',
          'Deixar a panela de pressão no fogo alto depois que chia.',
        ],
        teste: [
          {
            pergunta: 'A panela de pressão começou a chiar. O que fazer?',
            opcoes: ['Aumentar o fogo', 'Abaixar o fogo', 'Abrir a panela'],
            correta: 1,
            explicacao: 'Depois que chia, o fogo baixo basta e o gás rende mais.',
          },
          {
            pergunta: 'Pode usar braseiro de carvão dentro de casa com a janela aberta?',
            opcoes: ['Pode, se a janela estiver aberta', 'Não, só ao ar livre', 'Pode, se for por pouco tempo'],
            correta: 1,
            explicacao: 'O gás do carvão não tem cheiro e mata. Use só ao ar livre, longe das janelas.',
          },
          {
            pergunta: 'Todos em casa estão com dor de cabeça e tontura perto do fogareiro aceso. O que fazer?',
            opcoes: ['Deitar para descansar', 'Sair para o ar livre e ligar 192', 'Tomar um remédio e esperar'],
            correta: 1,
            explicacao: 'São sinais de intoxicação por monóxido de carbono. Saia de casa e ligue 192.',
          },
        ],
        fontes: [
          'Idec: guia para economizar energia e gás em casa',
          'CDC (Centros de Controle de Doenças dos EUA): prevenção da intoxicação por monóxido de carbono, em português',
        ],
      },
      {
        id: 'comida-enlatados',
        nivel: 'facil',
        titulo: 'Conferir e usar os enlatados do estoque',
        objetivo: 'Saber qual lata pode comer, guardar o estoque do jeito certo e não perder a sobra quando falta geladeira.',
        minutos: 5,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'lata-estufada', x: 36, y: 46, largura: 30, movimento: 'pulsar' },
                { desenho: 'errado', x: 76, y: 42, largura: 26, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'NÃO ABRA E NÃO PROVE', x: 50, y: 88, tamanho: 6.5, atraso: 1.6, destaque: true }],
            },
            titulo: 'Lata estufada: jogue fora',
            texto: 'Estufada, vazando ou muito amassada: não abra e não prove.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'lata', x: 34, y: 46, largura: 28, movimento: 'entrar' },
                { desenho: 'sol', x: 76, y: 36, largura: 22, movimento: 'girar', atraso: 0.8 },
                { desenho: 'errado', x: 76, y: 36, largura: 16, movimento: 'entrar', atraso: 1.6 },
              ],
              rotulos: [{ texto: 'O IDEAL: ABAIXO DE 29 °C', x: 50, y: 88, tamanho: 6.5, atraso: 2, destaque: true }],
            },
            titulo: 'Lugar fresco e seco',
            texto: 'Nunca em cima ou do lado do fogão, nem embaixo da pia.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'lata', x: 30, y: 48, largura: 24, movimento: 'deslizar', vindoDe: [-40, 0] },
                { desenho: 'seta', x: 54, y: 48, largura: 18, movimento: 'entrar', atraso: 0.8 },
                { desenho: 'lata', x: 76, y: 48, largura: 24, movimento: 'surgir', atraso: 1.2 },
              ],
              rotulos: [{ texto: 'A MAIS VELHA NA FRENTE', x: 50, y: 88, tamanho: 6.5, atraso: 1.8, destaque: true }],
            },
            titulo: 'Use primeiro a mais antiga',
            texto: 'Lata nova vai para o fundo. A que vence antes fica na frente.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'lata', x: 34, y: 48, largura: 24, movimento: 'entrar' },
                { desenho: 'geladeira', x: 74, y: 46, largura: 26, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'SEM GELADEIRA: LATA PEQUENA', x: 50, y: 88, tamanho: 6, atraso: 1.6, destaque: true }],
            },
            titulo: 'Abra só o que vai comer',
            texto: 'A sobra da lata aberta precisa de geladeira.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'panela', x: 36, y: 48, largura: 36, movimento: 'entrar' },
                { desenho: 'relogio', x: 78, y: 40, largura: 22, movimento: 'pulsar', atraso: 1 },
              ],
              rotulos: [{ texto: 'PELO MENOS 15 MINUTOS', x: 50, y: 88, tamanho: 6.5, atraso: 1.6, destaque: true }],
            },
            titulo: 'Conserva caseira: ferva antes',
            texto: 'Ferva ou cozinhe a conserva feita em casa antes de comer.',
            segundos: 7,
          },
        ],
        partes: [
          {
            titulo: 'Antes de abrir, olhe a embalagem',
            paragrafos: [
              'Lata estragada pode ter a toxina do botulismo, uma intoxicação grave. Na dúvida, não prove.',
            ],
            passos: [
              'Lata estufada, com a tampa ou o fundo inchados: jogue fora sem abrir.',
              'Lata vazando ou com amassado fundo: jogue fora.',
              'Amassado pequeno, com a lata inteira e boa: pode usar.',
              'Ferrugem forte: jogue fora. Manchinha que sai passando o dedo ou papel-toalha não é problema.',
              'Vidro de conserva embaçado, embalagem rasgada ou validade vencida: não coma.',
            ],
          },
          {
            titulo: 'Guardar o estoque',
            passos: [
              'Guarde em lugar fresco e seco. O ideal é abaixo de 29 °C.',
              'Nunca em cima ou do lado do fogão, embaixo da pia, nem em garagem úmida. Calor acima de 38 °C faz mal à comida enlatada.',
              'Confira o estoque a cada poucas semanas.',
              'Use primeiro as latas que estão há mais tempo em casa. Lata nova vai para o fundo.',
            ],
          },
          {
            titulo: 'Abrir e comer',
            passos: [
              'Se a lata chiar forte ou o caldo espirrar ao abrir, jogue fora.',
              'Cheiro ruim ou aparência estranha: jogue fora sem provar.',
              'Sem geladeira, prefira latas pequenas e abra só o que vai comer naquela refeição.',
              'Com geladeira, passe a sobra para um pote limpo de vidro ou plástico, com tampa.',
              'Sobra de carne, frango, feijão, milho, ervilha ou sopa: até 3 a 4 dias na geladeira. Sobra de tomate, abacaxi, pêssego ou picles: até 5 a 7 dias.',
            ],
          },
          {
            titulo: 'Conserva caseira e sinais de alerta',
            paragrafos: [
              'Conserva feita em casa, ou comprada sem garantia de como foi feita, pede um cuidado a mais.',
            ],
            passos: [
              'Antes de comer, ferva ou cozinhe a conserva por pelo menos 15 minutos.',
              'Os sinais do botulismo aparecem de 2 horas a 10 dias depois de comer: visão turva ou dupla, pálpebra caída, dificuldade para engolir, boca seca e fraqueza.',
              'Também pode vir enjoo, vômito, diarreia e dor de barriga.',
              'Qualquer um desses sinais depois de comer conserva: procure atendimento na hora ou ligue 192.',
            ],
          },
        ],
        erros: [
          'Provar um pouquinho para ver se a lata estragou.',
          'Comprar lata estufada ou muito amassada porque está barata.',
          'Guardar o estoque do lado do fogão ou embaixo da pia.',
          'Deixar a sobra da lata aberta fora da geladeira para o dia seguinte.',
        ],
        teste: [
          {
            pergunta: 'A lata está com a tampa estufada. O que fazer?',
            opcoes: ['Abrir e cheirar', 'Jogar fora sem abrir e sem provar', 'Cozinhar bem e comer'],
            correta: 1,
            explicacao: 'Lata estufada é sinal de botulismo. Não abra e não prove.',
          },
          {
            pergunta: 'Onde guardar os enlatados?',
            opcoes: ['Em lugar fresco e seco', 'Do lado do fogão', 'Embaixo da pia'],
            correta: 0,
            explicacao: 'O calor e a umidade estragam a lata. O ideal é abaixo de 29 °C.',
          },
          {
            pergunta: 'Você está sem geladeira. Qual lata é melhor abrir?',
            opcoes: ['A maior, para sobrar para amanhã', 'Uma pequena, para comer tudo na refeição', 'Tanto faz'],
            correta: 1,
            explicacao: 'A sobra da lata aberta precisa de geladeira. Sem ela, abra só o que vai comer.',
          },
        ],
        fontes: [
          'Ministério da Saúde: Botulismo (Saúde de A a Z) e Biblioteca Virtual em Saúde',
          'Departamento de Agricultura dos EUA (USDA FSIS): segurança dos alimentos que não vão à geladeira (Shelf-Stable Food Safety)',
        ],
      },
      {
        id: 'comida-graos-sem-bicho',
        nivel: 'medio',
        titulo: 'Guardar arroz, feijão e farinha sem bicho',
        objetivo: 'Proteger os grãos e a farinha do estoque contra caruncho e mofo, e salvar o que ainda dá para salvar.',
        minutos: 6,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'pote-graos', x: 36, y: 48, largura: 30, movimento: 'entrar' },
                { desenho: 'certo', x: 76, y: 40, largura: 22, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'VIDRO COM TAMPA DE ROSCA', x: 50, y: 88, tamanho: 6, atraso: 1.6, destaque: true }],
            },
            titulo: 'Pote bem fechado',
            texto: 'Passe os grãos para vidro com tampa de rosca ou pote de plástico com tampa justa.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'caruncho', x: 36, y: 46, largura: 30, movimento: 'tremer' },
                { desenho: 'errado', x: 76, y: 42, largura: 24, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'O BICHO FURA O SACO PLÁSTICO', x: 50, y: 88, tamanho: 6, atraso: 1.6, destaque: true }],
            },
            titulo: 'Saco plástico não segura',
            texto: 'O bicho fura até saco plástico grosso.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'floco', x: 36, y: 46, largura: 28, movimento: 'girar' },
                { desenho: 'relogio', x: 76, y: 42, largura: 24, movimento: 'pulsar', atraso: 1 },
              ],
              rotulos: [{ texto: '1 SEMANA A −18 °C', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'Freezer mata o bicho',
            texto: 'Feijão com pouco bicho: 1 semana no freezer, depois peneire e confira.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'pote-graos', x: 34, y: 48, largura: 28, movimento: 'entrar' },
                { desenho: 'errado', x: 74, y: 42, largura: 24, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'MOFO: JOGUE FORA', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'Mofo vai para o lixo',
            texto: 'Feijão, amendoim ou castanha com mofo: jogue fora sem cheirar.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'balde', x: 36, y: 50, largura: 30, movimento: 'entrar' },
                { desenho: 'pano', x: 74, y: 44, largura: 30, movimento: 'balancar', atraso: 0.8 },
              ],
              rotulos: [{ texto: 'ÁGUA QUENTE E SABÃO', x: 50, y: 88, tamanho: 6.5, atraso: 1.6, destaque: true }],
            },
            titulo: 'Limpe o armário',
            texto: 'Tire tudo, varra os farelos e lave com água quente e sabão.',
            segundos: 7,
          },
        ],
        partes: [
          {
            titulo: 'Guardar do jeito certo',
            passos: [
              'Na compra, confira se o pacote não está furado e se não tem bichinho.',
              'Compre a quantidade que dá para usar logo.',
              'Em casa, passe arroz, feijão, farinha e fubá para vidro com tampa de rosca ou pote de plástico com tampa bem justa.',
              'Não confie no saco plástico: o bicho fura até saco grosso.',
              'Não deixe cair farelo no armário. Farelo atrai bicho.',
              'Use primeiro o que está há mais tempo guardado.',
            ],
          },
          {
            titulo: 'Achou bicho?',
            paragrafos: [
              'O bicho costuma começar no pacote que quase não se usa. Confira todos os potes e pacotes do armário.',
              'Comer um bichinho sem querer não faz mal. Mas o pacote cheio de bicho não se salva.',
            ],
            passos: [
              'Pacote com muito bicho: jogue fora num saco bem fechado.',
              'Pouco bicho ou na dúvida: deixe 1 semana no freezer, a −18 °C ou mais frio.',
              'Sem freezer: espalhe numa assadeira rasa e deixe pelo menos 30 minutos no forno a 68 °C.',
              'Depois, peneire ou cate os bichos mortos e confira de novo.',
              'Semente para plantar não vai ao freezer nem ao forno: ela pode não brotar mais.',
            ],
          },
          {
            titulo: 'Mofo',
            passos: [
              'Feijão, amendoim, castanha e pasta de amendoim com mofo: jogue fora inteiro.',
              'Não cheire o que está mofado: o mofo faz mal para a respiração.',
              'Guarde longe de umidade, porque umidade traz mofo.',
            ],
          },
          {
            titulo: 'Limpar o armário',
            passos: [
              'Tire toda a comida e os pacotes.',
              'Varra ou aspire os cantos e jogue o lixo fora de casa na hora.',
              'Lave as prateleiras com água quente e sabão e espere secar bem.',
              'Não borrife inseticida perto de comida nem de panela e talher.',
            ],
          },
        ],
        erros: [
          'Guardar o feijão no saquinho do mercado aberto, preso com prendedor.',
          'Achar um bicho e só tirar ele, sem olhar os outros pacotes.',
          'Lavar o armário e pôr os potes de volta com a prateleira molhada.',
          'Borrifar inseticida dentro do armário de comida.',
        ],
        teste: [
          {
            pergunta: 'Qual é o melhor lugar para guardar o feijão?',
            opcoes: ['No saco plástico do mercado', 'Em vidro com tampa de rosca', 'Numa caixa de papelão'],
            correta: 1,
            explicacao: 'O bicho fura até saco plástico grosso. Vidro com tampa de rosca segura.',
          },
          {
            pergunta: 'O feijão tem poucos bichinhos. Como salvar?',
            opcoes: ['1 semana no freezer, depois peneirar', 'Borrifar inseticida', 'Lavar e guardar molhado'],
            correta: 0,
            explicacao: 'O frio do freezer mata o bicho. Depois é só peneirar e conferir.',
          },
          {
            pergunta: 'O amendoim está com mofo. O que fazer?',
            opcoes: ['Tirar a parte mofada e comer o resto', 'Cheirar para ver se estragou', 'Jogar fora inteiro, sem cheirar'],
            correta: 2,
            explicacao: 'Mofo em amendoim, feijão e castanha pode fazer mal. Jogue fora e não cheire.',
          },
        ],
        fontes: [
          'Universidade do Arkansas, Serviço de Extensão (FSA-7024): pragas dos alimentos guardados',
          'Universidade Rutgers, Extensão em Segurança dos Alimentos: bichos no armário de comida',
          'Departamento de Agricultura dos EUA (USDA FSIS): mofo nos alimentos (Molds on Food)',
          'Embrapa, pelo Portal Agrolink (2026): como evitar perdas por caruncho no feijão guardado',
        ],
      },
      {
        id: 'comida-secar-frutas',
        nivel: 'avancado',
        titulo: 'Secar frutas no sol para guardar',
        objetivo: 'Transformar fruta madura em fruta seca que dura meses fora da geladeira, sem deixar estragar.',
        minutos: 7,
        cenas: [
          {
            desenho: {
              pecas: [
                { desenho: 'fatias-fruta', x: 36, y: 46, largura: 40, movimento: 'entrar' },
                { desenho: 'certo', x: 80, y: 40, largura: 20, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [{ texto: 'NO SOL, SÓ FRUTA', x: 50, y: 88, tamanho: 7, atraso: 1.6, destaque: true }],
            },
            titulo: 'No sol, só fruta',
            texto: 'Legume e carne não devem secar ao ar livre: estragam com facilidade.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'balde', x: 38, y: 48, largura: 34, movimento: 'entrar' },
                { desenho: 'relogio', x: 78, y: 40, largura: 22, movimento: 'entrar', atraso: 1 },
              ],
              rotulos: [
                { texto: '100 mL DE ÁGUA SANITÁRIA', x: 50, y: 80, tamanho: 6, atraso: 1.4 },
                { texto: 'EM 10 LITROS: 15 MINUTOS', x: 50, y: 91, tamanho: 6, atraso: 1.9, destaque: true },
              ],
            },
            titulo: 'Desinfete a fruta com casca',
            texto: 'Deixe de molho 15 minutos e enxágue em água de beber corrente.',
            segundos: 7,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'tela-secagem', x: 44, y: 54, largura: 56, movimento: 'deslizar' },
                { desenho: 'sol', x: 84, y: 24, largura: 22, movimento: 'girar', atraso: 0.8 },
              ],
              rotulos: [{ texto: 'TELA EMBAIXO E EM CIMA', x: 50, y: 90, tamanho: 6, atraso: 1.6, destaque: true }],
            },
            titulo: 'Tela suspensa e coberta',
            texto: 'Uma tela segura a fruta no alto e outra cobre contra inseto e passarinho.',
            segundos: 8,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'tela-secagem', x: 40, y: 52, largura: 50, movimento: 'surgir' },
                { desenho: 'relogio', x: 82, y: 34, largura: 22, movimento: 'pulsar', atraso: 0.8 },
              ],
              rotulos: [{ texto: 'À NOITE, PARA DENTRO', x: 50, y: 90, tamanho: 6.5, atraso: 1.4, destaque: true }],
            },
            titulo: 'Recolha à noite',
            texto: 'O sereno da noite molha a fruta de novo.',
            segundos: 6,
          },
          {
            desenho: {
              pecas: [
                { desenho: 'geladeira', x: 36, y: 48, largura: 34, movimento: 'entrar' },
                { desenho: 'floco', x: 76, y: 40, largura: 24, movimento: 'girar', atraso: 1 },
              ],
              rotulos: [{ texto: '48 HORAS NO CONGELADOR', x: 50, y: 90, tamanho: 6.5, atraso: 1.6, destaque: true }],
            },
            titulo: 'Mate os ovos de inseto',
            texto: 'Antes de guardar, deixe a fruta seca pelo menos 48 horas no congelador.',
            segundos: 7,
          },
        ],
        partes: [
          {
            titulo: 'Escolher e preparar',
            paragrafos: [
              'A fruta tem açúcar e acidez, e por isso pode secar ao ar livre. Legume e carne têm risco maior de estragar e não devem secar no sol.',
            ],
            passos: [
              'Escolha frutas maduras e firmes. Separe as machucadas ou doentes.',
              'Abacaxi e manga dão ótima fruta seca.',
              'Lave em água corrente com escova ou esponja usadas só para isso.',
              'Deixe a fruta com casca de molho por 15 minutos em 100 mL de água sanitária para cada 10 litros de água de beber.',
              'Use água sanitária que o rótulo permite para alimentos, sem perfume. Depois enxágue em água corrente.',
            ],
          },
          {
            titulo: 'Secar no sol',
            paragrafos: ['O melhor é dia quente, seco e com vento, com pelo menos 29 °C. Com tempo úmido ou chuva, a fruta não seca e a chuva estraga tudo. Leva alguns dias.'],
            passos: [
              'Use tela de inox ou de plástico. Não use tela de arame galvanizado, de cobre nem de alumínio.',
              'Ponha a tela em cima de tijolos ou blocos, para o ar passar por baixo. Sobre o chão de cimento o calor é maior.',
              'Cubra com outra tela ou com um pano fino tipo gaze, contra inseto e passarinho.',
              'À noite, cubra bem ou leve para dentro. O sereno molha a fruta de novo.',
            ],
          },
          {
            titulo: 'Saber se secou',
            passos: [
              'Espere esfriar e corte alguns pedaços ao meio. Não pode aparecer umidade, nem sair líquido quando apertar.',
              'A fruta pode ficar macia, mas não pode grudar. Dobrada, não gruda nela mesma.',
              'Ponha solta num vidro fechado por 7 a 10 dias. Sacuda todo dia.',
              'Se o vidro suar por dentro, a fruta não secou: volte com ela para o sol.',
            ],
          },
          {
            titulo: 'Matar os ovos de inseto e guardar',
            paragrafos: ['A fruta seca no sol precisa desse cuidado antes de ser guardada, porque insetos podem ter deixado ovos nela.'],
            passos: [
              'Feche em saco plástico de congelar e deixe pelo menos 48 horas no congelador, a −18 °C ou menos.',
              'Ou espalhe numa assadeira, uma camada só, e deixe 30 minutos no forno já quente a 71 °C.',
              'Guarde em vidro com tampa, pote de plástico próprio para alimento ou saco de congelar bem fechado.',
              'Deixe em lugar escuro, seco e fresco. A 16 °C dura cerca de 1 ano. No calor de 27 °C, cerca de 6 meses.',
              'Quer vender? Antes, converse com a vigilância sanitária da sua cidade.',
            ],
          },
        ],
        erros: [
          'Secar legume ou carne no sol: estragam com facilidade.',
          'Deixar a tela no chão, sem ar por baixo e sem cobrir.',
          'Esquecer a fruta fora à noite ou na chuva.',
          'Usar tela de arame galvanizado, de cobre ou de alumínio.',
          'Guardar sem passar pelo congelador ou pelo forno.',
        ],
        teste: [
          {
            pergunta: 'O que pode secar no sol, ao ar livre?',
            opcoes: ['Carne', 'Fruta', 'Legumes'],
            correta: 1,
            explicacao: 'A fruta tem açúcar e acidez. Legume e carne estragam com facilidade e devem secar dentro de casa, em secador.',
          },
          {
            pergunta: 'Anoiteceu e a fruta ainda não secou. O que fazer?',
            opcoes: ['Deixar no quintal', 'Cobrir bem ou levar para dentro', 'Jogar água para não ressecar'],
            correta: 1,
            explicacao: 'O sereno da noite molha a fruta de novo.',
          },
          {
            pergunta: 'A fruta secou. O que fazer antes de guardar?',
            opcoes: ['Guardar logo no pote', 'Deixar pelo menos 48 horas no congelador', 'Lavar de novo'],
            correta: 1,
            explicacao: 'Assim morrem os ovos de inseto. Também dá para deixar 30 minutos no forno a 71 °C.',
          },
        ],
        fontes: [
          'Embrapa Cerrados: Processamento de frutas e hortaliças em agroindústrias da agricultura familiar (2021)',
          'Embrapa Pantanal: Desidratação de frutas utilizando secador solar, Comunicado Técnico 98 (2015)',
          'National Center for Home Food Preservation (Universidade da Geórgia, EUA): secagem ao sol',
          'Montana State University Extension (EUA): Drying Fruits (2017)',
        ],
      },
    ],
  },
]

export const AREAS_CURSO: { id: AreaCurso; titulo: string; resumo: string }[] = [
  { id: 'oficios', titulo: 'Ofícios e consertos', resumo: 'Aprenda a fazer e consertar as coisas da casa com as próprias mãos.' },
  { id: 'emergencias', titulo: 'Emergências', resumo: 'Água, primeiros socorros e o que fazer quando tudo para.' },
]

export const NIVEIS: { id: NivelLicao; titulo: string; resumo: string }[] = [
  { id: 'facil', titulo: 'Fácil', resumo: 'Para começar. Pouca ferramenta e nenhum risco grande.' },
  { id: 'medio', titulo: 'Médio', resumo: 'Pede algumas ferramentas, atenção e um pouco de prática.' },
  { id: 'avancado', titulo: 'Avançado', resumo: 'Trabalho maior. Faça com calma, com ajuda, ou chame um profissional.' },
]

const ORDEM_NIVEL: Record<NivelLicao, number> = { facil: 0, medio: 1, avancado: 2 }

export function nomeDoNivel(nivel: NivelLicao): string {
  return NIVEIS.find((item) => item.id === nivel)?.titulo ?? ''
}

function emOrdemDeNivel(modulo: ModuloCurso): ModuloCurso {
  return { ...modulo, licoes: [...modulo.licoes].sort((a, b) => ORDEM_NIVEL[a.nivel] - ORDEM_NIVEL[b.nivel]) }
}

export const CURSO: ModuloCurso[] = [...CURSOS_OFICIOS, ...CURSOS_EMERGENCIA].map(emOrdemDeNivel)

export function licoesPorNivel(modulo: ModuloCurso): { nivel: (typeof NIVEIS)[number]; licoes: LicaoCurso[] }[] {
  return NIVEIS.map((nivel) => ({ nivel, licoes: modulo.licoes.filter((licao) => licao.nivel === nivel.id) })).filter(
    (grupo) => grupo.licoes.length > 0,
  )
}

export const LICOES: LicaoCurso[] = CURSO.flatMap((modulo) => modulo.licoes)

export function cursoPorId(id: string): ModuloCurso | undefined {
  return CURSO.find((modulo) => modulo.id === id)
}

export function cursosDaArea(area: AreaCurso): ModuloCurso[] {
  return CURSO.filter((modulo) => modulo.area === area)
}

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
  const licoes = moduloDaLicao(id)?.licoes ?? []
  const indice = licoes.findIndex((licao) => licao.id === id)
  return indice >= 0 ? licoes[indice + 1] : undefined
}

export type { AreaCurso, LicaoCurso, ModuloCurso, NivelLicao, ParteLicao, PerguntaLicao } from './cursos/tipos'
