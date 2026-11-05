import type { ModuloCurso } from './tipos'

const EMBRAPA_HORTAS = 'Embrapa: Hortas — recomendações para cultivo (cartilha, 2024)'
const EMBRAPA_PRAGAS = 'Embrapa Hortaliças: Recomendações para o controle de pragas em hortas urbanas (Circular Técnica 80, 2009)'

export const CURSO_HORTA: ModuloCurso = {
  id: 'horta',
  area: 'oficios',
  titulo: 'Horta em casa',
  resumo: 'Preparar o canteiro, plantar e regar gastando pouca água.',
  licoes: [
    {
      id: 'horta-canteiro',
      nivel: 'facil',
      titulo: 'Preparar o canteiro e o adubo',
      objetivo: 'Escolher o lugar, montar o canteiro e adubar a terra.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Sol e água por perto',
          texto: 'Escolha um lugar plano, com sol e perto da torneira.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'sol', x: 74, y: 24, largura: 30, movimento: 'entrar' },
              { desenho: 'canteiro', x: 46, y: 70, largura: 80, movimento: 'surgir', atraso: 0.8 },
            ],
          },
        },
        {
          titulo: 'Canteiro alto',
          texto: 'De 80 cm a 1,2 m de largura e 20 a 30 cm de altura.',
          segundos: 7,
          desenho: {
            pecas: [{ desenho: 'canteiro', x: 50, y: 52, largura: 90, movimento: 'crescer' }],
            rotulos: [
              { texto: '0,8 a 1,2 m', x: 50, y: 78, tamanho: 7, atraso: 1.6 },
              { texto: '20 a 30 cm', x: 50, y: 26, tamanho: 7, atraso: 2.2, destaque: true },
            ],
          },
        },
        {
          titulo: 'Esterco curtido',
          texto: 'Misture na terra. Esterco fresco queima as sementes.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'composteira', x: 34, y: 46, largura: 46, movimento: 'entrar' },
              { desenho: 'relogio', x: 80, y: 34, largura: 22, movimento: 'entrar', atraso: 1 },
            ],
            rotulos: [{ texto: 'COMPOSTO: ~90 DIAS', x: 50, y: 86, tamanho: 6.5, atraso: 1.6 }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Escolher o lugar',
          paragrafos: [
            'Terreno plano ou pouco inclinado, que não encharque e sem pedras, com sol pelo menos parte do dia e perto de uma fonte de água boa.',
            'Em terreno inclinado, faça os canteiros atravessados na descida, para a água da chuva não levar a terra.',
          ],
        },
        {
          titulo: 'Montar o canteiro',
          passos: [
            'Revolva a terra até 25 a 30 cm de fundura e tire pedras e raízes.',
            'Levante o canteiro com 0,8 a 1,2 m de largura e 20 a 30 cm de altura, deixando 40 cm de caminho entre um e outro.',
            'Para folhas como alface e couve, misture 1,5 a 2 kg de esterco de curral curtido por metro quadrado, ou 0,7 a 1 kg de esterco de galinha.',
            'Espere pelo menos 3 dias depois de preparar a terra para semear.',
          ],
        },
        {
          titulo: 'Fazer composto em casa',
          passos: [
            'Num canto sem acúmulo de água, faça camadas: restos verdes (folhas, cascas de verdura), esterco e uma camada fina de terra.',
            'Molhe cada camada se estiver seca. A pilha pronta fica com 1 a 1,5 m de altura.',
            'Revire e molhe a pilha a cada 15 dias.',
            'Em cerca de 90 dias, quando não der mais para reconhecer os restos e a pilha esfriar, o composto está pronto.',
          ],
        },
      ],
      erros: [
        'Usar esterco fresco, mal curtido: ele esquenta e queima as sementes.',
        'Fazer a horta onde a água empoça depois da chuva.',
        'Plantar à sombra o dia inteiro.',
      ],
      teste: [
        {
          pergunta: 'Qual a altura indicada para o canteiro?',
          opcoes: ['20 a 30 cm', '1 metro', 'Rente ao chão'],
          correta: 0,
          explicacao: 'Canteiro de 20 a 30 cm deixa a terra fofa e escorre o excesso de água.',
        },
        {
          pergunta: 'Por que o esterco precisa estar curtido?',
          opcoes: ['Porque o fresco pode queimar as sementes', 'Para ter cheiro bom', 'Não precisa'],
          correta: 0,
          explicacao: 'O esterco fresco ainda esquenta ao se decompor e queima sementes e raízes.',
        },
        {
          pergunta: 'Quanto tempo leva, em média, para o composto ficar pronto?',
          opcoes: ['1 semana', 'Cerca de 90 dias', '2 anos'],
          correta: 1,
          explicacao: 'Revirando a cada 15 dias, o composto fica pronto em cerca de 3 meses.',
        },
      ],
      fontes: [EMBRAPA_HORTAS],
    },
    {
      id: 'horta-plantar',
      nivel: 'medio',
      titulo: 'Semear e transplantar mudas',
      objetivo: 'Semear na profundidade certa e passar mudas para o canteiro sem perdê-las.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Semente rasinha',
          texto: 'Sulcos de 1 cm de fundura. Cubra com terra fina.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'canteiro', x: 50, y: 62, largura: 88, movimento: 'surgir' },
              { desenho: 'semente', x: 36, y: 30, largura: 8, movimento: 'cair', atraso: 0.6 },
              { desenho: 'semente', x: 50, y: 30, largura: 8, movimento: 'cair', atraso: 0.9 },
              { desenho: 'semente', x: 64, y: 30, largura: 8, movimento: 'cair', atraso: 1.2 },
            ],
            rotulos: [{ texto: '1 cm', x: 50, y: 90, tamanho: 8, atraso: 1.8, destaque: true }],
          },
        },
        {
          titulo: 'Muda pronta',
          texto: 'Com 4 a 6 folhas e 10 a 15 cm, ela vai para o canteiro.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'broto', x: 30, y: 50, largura: 22, movimento: 'crescer' },
              { desenho: 'seta', x: 52, y: 54, largura: 14, movimento: 'surgir', atraso: 1.2 },
              { desenho: 'muda', x: 76, y: 50, largura: 26, movimento: 'entrar', atraso: 1.6 },
            ],
          },
        },
        {
          titulo: 'Plante na hora fresca',
          texto: 'De manhã cedo ou no fim da tarde, com a terra úmida.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'muda', x: 42, y: 50, largura: 34, movimento: 'deslizar', vindoDe: [0, -24] },
              { desenho: 'relogio', x: 80, y: 28, largura: 22, movimento: 'entrar', atraso: 1 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Semear direto no canteiro',
          passos: [
            'Faça sulcos de cerca de 1 cm de fundura, a 10 cm um do outro (coentro e salsa: sulcos a 15 ou 20 cm).',
            'Espalhe as sementes no sulco e cubra com terra fina.',
            'Em covas, ponha de 3 a 5 sementes no centro e cubra com uma camada fina de terra.',
            'Cubra com palha até nascer e regue de manhã e à tarde.',
          ],
        },
        {
          titulo: 'Transplantar mudas',
          passos: [
            'A muda está pronta com 4 a 6 folhas e 10 a 15 cm de altura.',
            'Molhe a muda e o canteiro antes.',
            'Plante nas horas mais frescas do dia, na mesma fundura em que a muda estava.',
            'Aperte a terra em volta com os dedos e regue.',
          ],
        },
        {
          titulo: 'O que plantar na seca',
          passos: [
            'Feijão-de-corda (caupi), mandioca e macaxeira.',
            'Batata-doce, jerimum (abóbora) e quiabo.',
            'Palma: alimenta os animais, e a palma doce também vai para a panela.',
            'Em vasos: coentro, cebolinha, pimenta e couve.',
            'Guarde sementes da colheita em garrafa PET bem seca e fechada.',
          ],
        },
        {
          titulo: 'Espaço entre as plantas',
          passos: [
            'Alface: 20 a 30 cm entre plantas e entre linhas.',
            'Cebolinha: 20 × 20 cm.',
            'Couve: 50 cm entre plantas e 1 m entre linhas.',
            'Quiabo: 50 cm entre plantas e 1 m entre linhas.',
          ],
        },
      ],
      erros: [
        'Enterrar a semente fundo demais: ela não consegue nascer.',
        'Transplantar no sol forte do meio-dia.',
        'Plantar muito junto: as plantas disputam água e ficam fracas.',
      ],
      teste: [
        {
          pergunta: 'Qual a fundura do sulco para a maioria das sementes de horta?',
          opcoes: ['Cerca de 1 cm', '10 cm', '30 cm'],
          correta: 0,
          explicacao: 'Sementes pequenas ficam rasinhas, a cerca de 1 cm.',
        },
        {
          pergunta: 'Quando a muda está pronta para o canteiro?',
          opcoes: ['Com 4 a 6 folhas e 10 a 15 cm', 'Logo que nasce', 'Quando dá flor'],
          correta: 0,
          explicacao: 'Com 4 a 6 folhas definitivas, a muda já aguenta a mudança.',
        },
        {
          pergunta: 'Qual o melhor horário para transplantar?',
          opcoes: ['Meio-dia', 'Manhã cedo ou fim da tarde', 'Qualquer hora'],
          correta: 1,
          explicacao: 'Nas horas frescas a muda perde menos água e pega melhor.',
        },
      ],
      fontes: [EMBRAPA_HORTAS],
    },
    {
      id: 'horta-pragas',
      nivel: 'medio',
      titulo: 'Pragas da horta sem veneno',
      objetivo: 'Tirar pulgões, lagartas e lesmas da horta com catação e caldas feitas em casa.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Olhe embaixo das folhas',
          texto: 'Tire a folha cheia de bichinhos e esmague.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'muda', x: 36, y: 52, largura: 34, movimento: 'surgir' },
              { desenho: 'pulgao', x: 28, y: 40, largura: 9, movimento: 'tremer', atraso: 0.8 },
              { desenho: 'pulgao', x: 44, y: 36, largura: 8, movimento: 'tremer', atraso: 1 },
              { desenho: 'mao', x: 74, y: 44, largura: 28, movimento: 'deslizar', vindoDe: [20, 0], atraso: 1.6 },
            ],
            rotulos: [{ texto: 'CATAÇÃO', x: 50, y: 88, tamanho: 7, atraso: 2.2, destaque: true }],
          },
        },
        {
          titulo: 'Calda de farinha',
          texto: '20 g de farinha de trigo em 1 litro de água. Mexa e coe.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'copo', x: 30, y: 50, largura: 24, movimento: 'entrar' },
              { desenho: 'seta', x: 52, y: 52, largura: 14, movimento: 'surgir', atraso: 1 },
              { desenho: 'borrifador', x: 76, y: 50, largura: 24, movimento: 'cair', atraso: 1.4 },
            ],
            rotulos: [{ texto: '20 g em 1 litro', x: 50, y: 88, tamanho: 7, atraso: 2, destaque: true }],
          },
        },
        {
          titulo: 'Fim da tarde, sem vento',
          texto: 'Borrife por cima e por baixo das folhas. Nunca com chuva.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'borrifador', x: 30, y: 50, largura: 24, movimento: 'balancar' },
              { desenho: 'muda', x: 64, y: 54, largura: 30, movimento: 'entrar', atraso: 0.8 },
              { desenho: 'relogio', x: 86, y: 22, largura: 18, movimento: 'entrar', atraso: 1.4 },
            ],
          },
        },
        {
          titulo: '4 dias antes de colher',
          texto: 'Pare de borrifar 96 horas antes de comer a verdura.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'relogio', x: 34, y: 46, largura: 30, movimento: 'pulsar' },
              { desenho: 'muda', x: 72, y: 52, largura: 30, movimento: 'crescer', atraso: 1 },
            ],
            rotulos: [{ texto: '96 HORAS', x: 34, y: 84, tamanho: 7, atraso: 1.6, destaque: true }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Olhar e catar',
          passos: [
            'Olhe as plantas, principalmente embaixo das folhas e nos brotos.',
            'Tire as folhas cheias de pulgões ou de lagartas e esmague.',
            'Contra pulgão, mosca-branca e tripes, pendure placas amarelas com cola ou graxa perto das plantas. Os bichinhos grudam.',
          ],
        },
        {
          titulo: 'Calda de farinha de trigo',
          paragrafos: ['Serve para pulgão, mosca-branca, cochonilha, percevejo e lagarta. A calda seca nas folhas e sufoca os insetos.'],
          passos: [
            'Ponha 20 g de farinha de trigo, aos poucos, em 1 litro de água.',
            'Mexa até misturar bem e coe.',
            'Use logo depois de pronta.',
            'Esta calda é a exceção do horário: passe de manhã, em dia quente, seco e de sol.',
          ],
        },
        {
          titulo: 'Calda de óleo de cozinha',
          paragrafos: ['Serve para pulgão, mosca-branca e outros insetos que sugam a planta, e para ácaros.'],
          passos: [
            'Misture 5 ml de óleo de soja ou de algodão e meio ml de detergente neutro.',
            'Complete com água até 1 litro.',
            'Sacuda bem antes de usar.',
          ],
        },
        {
          titulo: 'Lesmas e caracóis',
          passos: [
            'Ao anoitecer, deixe panos ou estopas molhados em cerveja ou leite no meio da horta.',
            'Bem cedo, recolha os panos com as lesmas, usando luva ou saco plástico.',
            'Enterre as lesmas longe de poço e de cisterna.',
            'Não jogue sal de cozinha na terra nem nas plantas.',
          ],
        },
        {
          titulo: 'Como borrifar',
          passos: [
            'Passe no fim da tarde, com vento fraco.',
            'Não borrife em dia de chuva nem se puder chover depois.',
            'Molhe por cima e por baixo das folhas, nos brotos e nos frutos pequenos.',
            'Se precisar, repita a cada 7 dias.',
            'Pare de borrifar 96 horas (4 dias) antes de colher para comer.',
          ],
        },
      ],
      erros: [
        'Jogar sal na terra para matar lesma: estraga o solo e as plantas.',
        'Borrifar com sol do meio-dia, com vento ou com chuva chegando.',
        'Colher e comer a verdura no dia seguinte ao que borrifou.',
        'Molhar só a parte de cima das folhas: o bichinho fica escondido embaixo.',
      ],
      teste: [
        {
          pergunta: 'Quanto de farinha de trigo vai em 1 litro de água para a calda?',
          opcoes: ['20 g', '1 kg', 'Meio pacote'],
          correta: 0,
          explicacao: 'São 20 g de farinha em 1 litro de água, misturada aos poucos e coada.',
        },
        {
          pergunta: 'Quanto tempo antes de colher é preciso parar de borrifar?',
          opcoes: ['1 hora', '96 horas, ou 4 dias', 'Não precisa parar'],
          correta: 1,
          explicacao: 'A Embrapa pede para suspender qualquer calda 96 horas antes de comer a hortaliça.',
        },
        {
          pergunta: 'Como tirar lesmas da horta?',
          opcoes: ['Jogando sal na terra', 'Com panos molhados em cerveja ou leite, recolhidos cedo', 'Regando mais'],
          correta: 1,
          explicacao: 'As lesmas se juntam nos panos à noite. Sal na terra faz mal ao solo e às plantas.',
        },
      ],
      fontes: [EMBRAPA_PRAGAS],
    },
    {
      id: 'horta-agua',
      nivel: 'facil',
      titulo: 'Regar gastando pouca água',
      objetivo: 'Manter a horta viva na seca com rega certa, palha e gotejamento.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Cedo ou no fim da tarde',
          texto: 'No sol forte, boa parte da água evapora antes de chegar à raiz.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'regador', x: 44, y: 46, largura: 56, movimento: 'balancar' },
              { desenho: 'relogio', x: 82, y: 24, largura: 20, movimento: 'entrar', atraso: 1 },
            ],
          },
        },
        {
          titulo: 'Cubra com palha',
          texto: 'A palha deixa a terra mais fresca e segura a umidade.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'canteiro', x: 50, y: 70, largura: 88, movimento: 'surgir' },
              { desenho: 'palha', x: 50, y: 60, largura: 48, movimento: 'cair', atraso: 0.8 },
              { desenho: 'sol', x: 78, y: 20, largura: 22, movimento: 'pulsar', atraso: 1.4 },
            ],
          },
        },
        {
          titulo: 'Garrafa que goteja',
          texto: 'Garrafa com furinho na tampa, enterrada de cabeça para baixo perto da planta.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'garrafa-gotejo', x: 40, y: 50, largura: 26, movimento: 'cair' },
              { desenho: 'muda', x: 72, y: 56, largura: 26, movimento: 'entrar', atraso: 1 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Quando e quanto regar',
          paragrafos: [
            'Em horta de casa, regue duas vezes por dia: ao amanhecer e no fim da tarde. Em dias muito quentes e com sol, a planta pede mais.',
            'Mudas novas e verduras de folha (alface, couve, coentro) precisam de rega todo dia. Plantas de fruto e de raiz, depois de crescidas, aguentam rega a cada 2 ou 3 dias.',
          ],
        },
        {
          titulo: 'Truques para economizar',
          passos: [
            'Cubra a terra em volta das plantas com palha, capim seco ou folhas. Isso deixa o solo mais fresco e perde menos água.',
            'Regue no pé da planta, devagar, e não em cima das folhas.',
            'Faça gotejamento com garrafa PET: fure a tampa com um prego quente, encha de água e enterre a garrafa de boca para baixo ao lado da planta.',
            'Faça sombra com tela ou palha nas horas mais quentes.',
            'Reaproveite a água de lavar verduras. Água com sabão, detergente ou água sanitária não serve para a horta.',
          ],
        },
      ],
      erros: [
        'Regar ao meio-dia, com sol forte.',
        'Deixar a terra descoberta, rachando no sol.',
        'Molhar só as folhas e deixar a raiz seca.',
      ],
      teste: [
        {
          pergunta: 'Qual o melhor horário para regar?',
          opcoes: ['Ao amanhecer e no fim da tarde', 'Meio-dia', 'Só à noite'],
          correta: 0,
          explicacao: 'Nesses horários evapora menos água e a planta aproveita mais.',
        },
        {
          pergunta: 'Para que serve a palha em cima da terra?',
          opcoes: ['Enfeitar', 'Deixar a terra mais fresca e segurar a umidade', 'Espantar passarinho'],
          correta: 1,
          explicacao: 'A cobertura protege a terra do sol e diminui a perda de água.',
        },
        {
          pergunta: 'Que água reaproveitada pode ir para a horta?',
          opcoes: ['Água de lavar verduras', 'Água com detergente', 'Água com água sanitária'],
          correta: 0,
          explicacao: 'Sabão, detergente e água sanitária fazem mal às plantas e à terra.',
        },
      ],
      fontes: [EMBRAPA_HORTAS],
    },
  ],
}
