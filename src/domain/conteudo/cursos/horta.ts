import type { ModuloCurso } from './tipos'

const EMBRAPA_HORTAS = 'Embrapa: Hortas — recomendações para cultivo (cartilha, 2024)'

export const CURSO_HORTA: ModuloCurso = {
  id: 'horta',
  area: 'oficios',
  titulo: 'Horta em casa',
  resumo: 'Preparar o canteiro, plantar e regar gastando pouca água.',
  licoes: [
    {
      id: 'horta-canteiro',
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
      videosReais: [
        {
          arquivo: 'videos/plantar-mudas.mp4',
          titulo: 'Plantando mudas de alface',
          legenda: 'Mudas em fileiras, na mesma fundura em que estavam na bandeja.',
          autor: 'Andi Farruku',
          licenca: 'Licença Pexels',
          origem: 'https://www.pexels.com/video/person-planting-lettuce-5766086/',
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
      id: 'horta-agua',
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
      videosReais: [
        {
          arquivo: 'videos/cobertura-palha.mp4',
          titulo: 'Cobrindo o canteiro',
          legenda: 'Uma camada de palha ou folhas secas em volta das plantas.',
          autor: 'K',
          licenca: 'Licença Pexels',
          origem: 'https://www.pexels.com/video/gardener-spreading-mulch-on-garden-bed-31145883/',
        },
        {
          arquivo: 'videos/regar.mp4',
          titulo: 'Regando junto ao pé',
          legenda: 'Regue perto do pé da planta, devagar, para a água entrar na terra.',
          autor: 'Kaboompics',
          licenca: 'Licença Pexels',
          origem: 'https://www.pexels.com/video/person-watering-plants-4238308/',
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
