import type { ModuloCurso } from './tipos'

export const CURSO_ENCANADOR: ModuloCurso = {
  id: 'encanador',
  area: 'oficios',
  titulo: 'Encanador da casa',
  resumo: 'Achar vazamentos, consertar torneira e desentupir pia sem desperdiçar água.',
  licoes: [
    {
      id: 'encanador-vazamento',
      titulo: 'Fechar a água e achar vazamentos',
      objetivo: 'Saber onde fechar a água da casa e descobrir se há vazamento escondido.',
      minutos: 5,
      cenas: [
        {
          titulo: 'Ache o registro geral',
          texto: 'Fica perto do relógio da água. Feche girando para a direita.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'registro', x: 50, y: 42, largura: 60, movimento: 'apertar', atraso: 0.6 },
              { desenho: 'seta', x: 50, y: 78, largura: 22, movimento: 'surgir', atraso: 1.2 },
            ],
            rotulos: [{ texto: 'HORÁRIO = FECHA', x: 50, y: 92, tamanho: 6.5, atraso: 1.6 }],
          },
        },
        {
          titulo: 'Gota a gota enche baldes',
          texto: 'Uma torneira pingando desperdiça muita água em poucos dias.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'torneira', x: 40, y: 30, largura: 52, movimento: 'entrar' },
              { desenho: 'balde', x: 64, y: 74, largura: 30, movimento: 'surgir', atraso: 0.8 },
            ],
          },
        },
        {
          titulo: 'O teste do relógio',
          texto: 'Feche tudo, anote os números do relógio e confira depois de 1 hora.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'relogio', x: 34, y: 42, largura: 40, movimento: 'entrar' },
              { desenho: 'gota', x: 76, y: 42, largura: 18, movimento: 'pingar', atraso: 1 },
            ],
            rotulos: [{ texto: 'MUDOU? VAZAMENTO', x: 50, y: 84, tamanho: 6.5, atraso: 1.8, destaque: true }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Os registros da casa',
          paragrafos: [
            'O registro geral fica no cavalete, perto do relógio (hidrômetro), e fecha a água que vem da rua. Dentro de casa, muitos banheiros e cozinhas têm um registro só deles.',
            'Aprenda agora onde ficam: num cano estourado, cada minuto conta. A maioria dos registros fecha girando no sentido horário (para a direita).',
          ],
        },
        {
          titulo: 'Teste do hidrômetro',
          passos: [
            'Deixe aberto o registro do cavalete.',
            'Feche todas as torneiras e não use os vasos sanitários durante o teste.',
            'Feche o registro que enche a caixa d’água ou amarre a boia.',
            'Anote todos os números do visor do relógio, inclusive os vermelhos.',
            'Depois de pelo menos 1 hora, confira. Se os números mudaram, há vazamento entre o relógio e a caixa.',
          ],
        },
        {
          titulo: 'Onde mais procurar',
          paragrafos: [
            'Mancha úmida na parede ou no chão, mofo e reboco estufado mostram cano vazando por dentro.',
            'No vaso sanitário, jogue um pouco de pó de café na água do vaso. Se ele se mexer sozinho ou sumir sem dar descarga, a válvula ou a caixa acoplada estão vazando.',
          ],
        },
        {
          titulo: 'Boia da caixa d’água',
          paragrafos: [
            'Se a água escorre sem parar pelo ladrão da caixa, a boia não está fechando. Feche o registro que enche a caixa e troque a boia ou o reparo dela: é barato e acaba com o desperdício.',
          ],
        },
      ],
      erros: [
        'Só descobrir onde fica o registro na hora do cano estourado.',
        'Forçar o registro emperrado com chave grande: ele quebra e piora o vazamento.',
        'Achar que "uma gotinha" não faz diferença na seca.',
      ],
      teste: [
        {
          pergunta: 'Para que serve o registro geral?',
          opcoes: ['Fechar a água que vem da rua para a casa toda', 'Aumentar a pressão', 'Medir a água'],
          correta: 0,
          explicacao: 'Ele corta a água da casa toda. Saiba onde ele fica antes de precisar.',
        },
        {
          pergunta: 'No teste do hidrômetro, os números mudaram com tudo fechado. Isso quer dizer:',
          opcoes: ['Que o relógio está quebrado', 'Que há vazamento', 'Que choveu'],
          correta: 1,
          explicacao: 'Com tudo fechado, não deveria passar água. Se o relógio andou, a água está escapando em algum lugar.',
        },
        {
          pergunta: 'Para ver se o vaso sanitário vaza, você pode:',
          opcoes: ['Jogar pó de café na água do vaso e observar', 'Dar várias descargas seguidas', 'Pôr água sanitária'],
          correta: 0,
          explicacao: 'Se o pó se mexe ou some sem descarga, há água escorrendo da caixa para o vaso.',
        },
      ],
      fontes: ['SAAE Sorocaba: manual de orientação — teste de vazamento pelo hidrômetro'],
    },
    {
      id: 'encanador-torneira',
      titulo: 'Torneira pingando e rosca vazando',
      objetivo: 'Trocar o vedante ou o reparo da torneira e vedar roscas com fita veda-rosca.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Feche o registro',
          texto: 'Sem água chegando, dá para abrir a torneira com calma.',
          segundos: 6,
          desenho: {
            pecas: [
              { desenho: 'registro', x: 36, y: 40, largura: 50, movimento: 'apertar' },
              { desenho: 'certo', x: 78, y: 70, largura: 18, movimento: 'entrar', atraso: 1.8 },
            ],
          },
        },
        {
          titulo: 'Troque a borrachinha',
          texto: 'Tire a manopla, solte a peça com chave e troque o vedante gasto.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'torneira', x: 34, y: 34, largura: 50, movimento: 'entrar' },
              { desenho: 'chave-inglesa', x: 54, y: 66, largura: 50, giro: -20, movimento: 'apertar', atraso: 0.8 },
              { desenho: 'vedante', x: 84, y: 34, largura: 18, movimento: 'cair', atraso: 1.6 },
            ],
          },
        },
        {
          titulo: 'Fita no sentido do aperto',
          texto: 'Enrole a fita veda-rosca no mesmo sentido em que a peça vai girar.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'rosca', x: 46, y: 38, largura: 70, movimento: 'tracar' },
              { desenho: 'veda-rosca', x: 50, y: 66, largura: 18, movimento: 'girar', atraso: 0.4 },
            ],
            rotulos: [{ texto: 'SENTIDO HORÁRIO', x: 50, y: 88, tamanho: 6.5, atraso: 1.6, destaque: true }],
          },
        },
        {
          titulo: 'Abra e confira',
          texto: 'Abra o registro devagar e veja se parou de pingar.',
          segundos: 6,
          desenho: {
            pecas: [
              { desenho: 'torneira', x: 40, y: 40, largura: 54, movimento: 'surgir' },
              { desenho: 'certo', x: 78, y: 72, largura: 20, movimento: 'entrar', atraso: 1.2 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Por que a torneira pinga',
          paragrafos: [
            'Nas torneiras de rosca (que dão várias voltas), quem segura a água é uma borrachinha chamada vedante, no fim de uma peça chamada reparo ou carrapeta. Com o tempo ela gasta e a água passa.',
            'Nas torneiras de ¼ de volta, quem segura a água é um mecanismo de cerâmica. Quando pinga, troca-se o reparo inteiro.',
          ],
        },
        {
          titulo: 'Passo a passo',
          passos: [
            'Feche o registro do cômodo ou o geral e abra a torneira para sair o resto da água.',
            'Tire a tampinha da manopla e solte o parafuso no sentido anti-horário.',
            'Tire a manopla e solte o reparo com chave inglesa ou chave de boca. Proteja o metal com um pano para não riscar.',
            'Leve o reparo velho à loja para comprar igual.',
            'Troque o vedante (ou o reparo inteiro), monte tudo de volta sem apertar demais.',
            'Abra o registro devagar e confira.',
          ],
        },
        {
          titulo: 'Vedar uma rosca',
          passos: [
            'Feche a água e desrosqueie a peça. Limpe a rosca e deixe secar.',
            'Olhando para a ponta do cano, enrole a fita veda-rosca no sentido horário, o mesmo do aperto, começando pela ponta.',
            'Dê voltas esticando a fita até cobrir a rosca, sem tapar o furo do cano.',
            'Rosqueie a peça à mão e termine com a chave, sem forçar.',
          ],
        },
      ],
      erros: [
        'Apertar demais a torneira fechada para parar de pingar: isso estraga o vedante mais rápido.',
        'Enrolar a fita veda-rosca ao contrário: ela desenrola quando você rosqueia.',
        'Abrir a torneira sem fechar o registro antes.',
      ],
      teste: [
        {
          pergunta: 'A torneira de rosca pinga mesmo fechada. Qual a causa mais comum?',
          opcoes: ['Vedante (borrachinha) gasto', 'Água demais na caixa', 'Cano entupido'],
          correta: 0,
          explicacao: 'O vedante gasta com o uso. Trocar custa pouco e resolve na maioria das vezes.',
        },
        {
          pergunta: 'Em que sentido enrolar a fita veda-rosca?',
          opcoes: ['No mesmo sentido do aperto da peça', 'Ao contrário do aperto', 'Tanto faz'],
          correta: 0,
          explicacao: 'Se for ao contrário, a fita se enrola e solta quando você rosqueia a peça.',
        },
        {
          pergunta: 'O que fazer antes de desmontar a torneira?',
          opcoes: ['Fechar o registro', 'Abrir a caixa d’água', 'Nada'],
          correta: 0,
          explicacao: 'Sem fechar o registro, a água sai com força quando você solta o reparo.',
        },
      ],
      fontes: ['Loja do Mecânico: como consertar torneira pingando'],
    },
    {
      id: 'encanador-desentupir',
      titulo: 'Desentupir pia e ralo',
      objetivo: 'Desentupir sem produto perigoso, com desentupidor e limpando o sifão.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Use o desentupidor',
          texto: 'Água cobrindo a borracha, tampe o ladrão e bombeie com força.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'pia-sifao', x: 40, y: 56, largura: 60, movimento: 'entrar' },
              { desenho: 'desentupidor', x: 42, y: 26, largura: 18, movimento: 'empurrar', atraso: 0.8 },
            ],
          },
        },
        {
          titulo: 'Limpe o sifão',
          texto: 'Balde embaixo, desrosqueie o sifão à mão e tire a sujeira.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'pia-sifao', x: 40, y: 38, largura: 58, movimento: 'surgir' },
              { desenho: 'balde', x: 44, y: 82, largura: 26, movimento: 'deslizar', vindoDe: [40, 0], atraso: 0.8 },
            ],
            rotulos: [{ texto: 'BALDE', x: 80, y: 82, tamanho: 7, atraso: 1.6, destaque: true }],
          },
        },
        {
          titulo: 'Não misture produtos',
          texto: 'Soda e água sanitária juntas soltam gás e queimam a pele.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'raio', x: 50, y: 40, largura: 40, movimento: 'tremer' },
              { desenho: 'errado', x: 50, y: 40, largura: 56, movimento: 'entrar', atraso: 1 },
            ],
            rotulos: [{ texto: 'NUNCA MISTURE', x: 50, y: 86, tamanho: 7, atraso: 1.4, destaque: true }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Desentupidor de borracha',
          passos: [
            'Tire da pia a água suja que der, com uma caneca.',
            'Deixe uns 5 cm de água na pia, para cobrir a borracha.',
            'Tampe o ladrão (o furinho de cima) com um pano molhado, senão o ar escapa por ali.',
            'Encaixe o desentupidor no ralo e bombeie para cima e para baixo várias vezes, com força, sem tirar da água.',
            'Puxe de uma vez. Repita se a água ainda descer devagar.',
          ],
        },
        {
          titulo: 'Abrir e limpar o sifão',
          passos: [
            'Ponha um balde embaixo da pia e luvas nas mãos.',
            'Desrosqueie à mão as porcas do sifão (o cano em curva).',
            'Tire a sujeira, lave o sifão no tanque e confira a borrachinha de vedação.',
            'Monte de volta, apertando só com a mão, e teste com água.',
          ],
        },
        {
          titulo: 'Para não entupir de novo',
          paragrafos: [
            'Não jogue óleo de cozinha na pia: ele endurece no cano. Guarde em garrafa e entregue num ponto de coleta.',
            'Use ralinho com tela na pia e no banheiro para segurar restos de comida e cabelo.',
            'Água quente ajuda a soltar gordura, mas não jogue água fervendo em cano de plástico (PVC): ele amolece.',
          ],
        },
      ],
      erros: [
        'Misturar produtos de limpeza para "reforçar": pode soltar gás tóxico.',
        'Usar arame ou faca no ralo e furar o cano.',
        'Apertar o sifão com alicate: a rosca de plástico racha.',
      ],
      teste: [
        {
          pergunta: 'Por que tampar o ladrão ao usar o desentupidor?',
          opcoes: ['Para o ar e a força não escaparem por ali', 'Para a água não sujar', 'Não precisa'],
          correta: 0,
          explicacao: 'Com o ladrão aberto, a pressão sai por ele e não empurra a sujeira.',
        },
        {
          pergunta: 'Onde jogar o óleo de fritura usado?',
          opcoes: ['Na pia com água quente', 'Numa garrafa, para levar a um ponto de coleta', 'No vaso sanitário'],
          correta: 1,
          explicacao: 'O óleo endurece no cano e entope. Guarde em garrafa e entregue para reciclagem.',
        },
        {
          pergunta: 'Pode misturar soda cáustica com água sanitária?',
          opcoes: ['Sim, desentope mais rápido', 'Não, é perigoso', 'Só com água quente'],
          correta: 1,
          explicacao: 'Misturar produtos pode soltar gases tóxicos e causar queimaduras.',
        },
      ],
      fontes: ['Leroy Merlin: como limpar um sifão'],
    },
  ],
}
