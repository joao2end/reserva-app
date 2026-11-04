import type { ModuloCurso } from './tipos'

const MANUAL_PROCOBRE = 'Procobre, Elektro e Pirelli: Manual de Instalações Elétricas Residenciais (revisão de Hilton Moreno)'
const NBR_5410 = 'ABNT NBR 5410:2004 — Instalações elétricas de baixa tensão'

export const CURSO_ELETRICISTA: ModuloCurso = {
  id: 'eletricista',
  area: 'oficios',
  titulo: 'Eletricista da casa',
  resumo: 'Do disjuntor à tomada: consertar, instalar e planejar a luz da casa com segurança.',
  aviso:
    'Choque elétrico mata. Sempre desligue o disjuntor e teste antes de tocar em qualquer fio. A ligação com o poste, o medidor e o padrão de entrada são só com a distribuidora de energia.',
  licoes: [
    {
      id: 'eletrica-seguranca',
      titulo: 'Segurança antes de tudo',
      objetivo: 'Desligar o circuito certo e ter certeza de que não há energia antes de mexer.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Desligue no quadro',
          texto: 'Abaixe o disjuntor do circuito. Na dúvida, desligue o geral.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'quadro', x: 38, y: 42, largura: 52, movimento: 'desligar', atraso: 1.6 },
              { desenho: 'mao', x: 28, y: 22, largura: 16, giro: 180, movimento: 'deslizar', vindoDe: [-30, -30], atraso: 0.2 },
              { desenho: 'seta', x: 80, y: 40, largura: 18, giro: 90, movimento: 'surgir', atraso: 1.8 },
            ],
            rotulos: [{ texto: 'DESLIGADO', x: 50, y: 88, tamanho: 7, atraso: 2.2, destaque: true }],
          },
        },
        {
          titulo: 'Teste antes de tocar',
          texto: 'Encoste a chave de teste no metal. Se não acender, pode mexer.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'tomada', x: 30, y: 50, largura: 46, movimento: 'entrar' },
              { desenho: 'chave-teste', x: 62, y: 42, largura: 11, giro: -40, movimento: 'deslizar', vindoDe: [30, -10], atraso: 0.6 },
              { desenho: 'certo', x: 80, y: 78, largura: 22, movimento: 'entrar', atraso: 2.6 },
            ],
            rotulos: [{ texto: 'NÃO ACENDEU', x: 50, y: 90, tamanho: 6.5, atraso: 2.4 }],
          },
        },
        {
          titulo: 'Mãos e chão secos',
          texto: 'Nada de mexer com a mão molhada, descalço ou com o chão molhado.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'raio', x: 30, y: 40, largura: 40, movimento: 'pulsar' },
              { desenho: 'gota', x: 70, y: 40, largura: 22, movimento: 'cair', atraso: 0.5 },
              { desenho: 'errado', x: 70, y: 40, largura: 34, movimento: 'entrar', atraso: 1.6 },
            ],
            rotulos: [{ texto: 'ÁGUA + LUZ = PERIGO', x: 50, y: 82, tamanho: 7, atraso: 2 }],
          },
        },
        {
          titulo: 'Na dúvida, chame quem sabe',
          texto: 'Fio caído na rua, cheiro de queimado ou faísca: ligue para a distribuidora ou 193.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'eletricista', x: 36, y: 52, largura: 34, movimento: 'surgir' },
              { desenho: 'raio', x: 76, y: 34, largura: 26, movimento: 'piscar', atraso: 0.8 },
            ],
            rotulos: [{ texto: '193', x: 76, y: 70, tamanho: 13, atraso: 1.4, destaque: true }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Por que o choque é tão perigoso',
          paragrafos: [
            'A corrente elétrica passa pelo corpo procurando o chão. Se ela cruza o peito, pode parar o coração. Por isso não existe "choquinho" seguro na tomada de casa.',
            'Água, suor e pé descalço deixam a corrente passar com muito mais facilidade. É por isso que banheiro, cozinha e quintal são os lugares mais perigosos.',
          ],
        },
        {
          titulo: 'Antes de começar qualquer serviço',
          passos: [
            'Avise quem está em casa que você vai mexer na luz.',
            'No quadro, desligue o disjuntor do circuito onde vai trabalhar. Se não souber qual é, desligue o disjuntor geral.',
            'Prenda um bilhete no quadro: "NÃO LIGAR — tem gente trabalhando".',
            'Tire anel, relógio e pulseira. Use sapato fechado com sola de borracha e fique em chão seco.',
            'Use ferramentas com cabo isolado e em bom estado.',
            'Teste com a chave de teste todos os fios antes de encostar a mão.',
          ],
        },
        {
          titulo: 'Como usar a chave de teste',
          passos: [
            'Primeiro, teste a chave numa tomada que você sabe que está ligada. Se acender, a chave está funcionando.',
            'Segure pelo cabo e encoste o dedo no topo de metal da chave.',
            'Encoste a ponta no fio ou no furo da tomada. Se a luzinha acender, ali tem fase: tem energia.',
            'Depois de desligar o disjuntor, teste de novo todos os fios. Só mexa se nenhum acender.',
          ],
        },
        {
          titulo: 'O que não é serviço para fazer em casa',
          paragrafos: [
            'O ramal que vem do poste, o medidor e o padrão de entrada são da distribuidora de energia. Mexer neles é perigoso e proibido.',
            'Fio caído na rua, poste pegando fogo ou alguém grudado num fio: não toque. Ligue para a distribuidora ou para os Bombeiros (193). Para tirar alguém de um choque, desligue antes a energia.',
          ],
        },
      ],
      erros: [
        'Confiar só no interruptor desligado: o fio pode continuar com energia.',
        'Trocar o disjuntor por um maior porque "ele desarma muito". O disjuntor protege o fio; maior que o certo deixa o fio esquentar e pegar fogo.',
        'Não testar a chave de teste antes: uma chave queimada diz que não tem energia quando tem.',
        'Mexer com a mão molhada ou com uma mão apoiada em cano ou janela de metal.',
      ],
      teste: [
        {
          pergunta: 'Você vai trocar uma tomada. O que fazer primeiro?',
          opcoes: ['Desligar o disjuntor do circuito e testar os fios', 'Desligar só o interruptor da sala', 'Usar luva de lã e mexer com cuidado'],
          correta: 0,
          explicacao: 'O interruptor não corta a energia da tomada. Desligue o disjuntor e confirme com a chave de teste.',
        },
        {
          pergunta: 'A chave de teste não acendeu no fio. O que mais você precisa ter feito?',
          opcoes: ['Nada, pode mexer', 'Ter testado a chave antes numa tomada ligada', 'Esperar 1 hora'],
          correta: 1,
          explicacao: 'Se a chave estiver queimada, ela nunca acende. Teste-a antes numa tomada que você sabe que está ligada.',
        },
        {
          pergunta: 'O disjuntor do chuveiro desarma toda hora. O que fazer?',
          opcoes: ['Trocar por um disjuntor maior', 'Chamar um eletricista para ver o fio, o chuveiro e o circuito', 'Prender a alavanca com fita'],
          correta: 1,
          explicacao: 'Desarmar é um aviso de problema. Um disjuntor maior que o certo deixa o fio esquentar e pode causar incêndio.',
        },
      ],
      fontes: [MANUAL_PROCOBRE, NBR_5410, 'Corpo de Bombeiros: emergência 193'],
    },
    {
      id: 'eletrica-fios',
      titulo: 'Fios, cores e disjuntores',
      objetivo: 'Reconhecer cada fio pela cor, escolher a grossura certa e entender o que o disjuntor e o DR fazem.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Cada fio tem uma cor',
          texto: 'Neutro azul-claro. Terra verde ou verde e amarelo. Fase de outra cor.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'fio-fase', x: 38, y: 22, largura: 60, movimento: 'deslizar', vindoDe: [-80, 0] },
              { desenho: 'fio-neutro', x: 38, y: 44, largura: 60, movimento: 'deslizar', vindoDe: [-80, 0], atraso: 0.8 },
              { desenho: 'fio-terra', x: 38, y: 66, largura: 60, movimento: 'deslizar', vindoDe: [-80, 0], atraso: 1.6 },
            ],
            rotulos: [
              { texto: 'FASE', x: 84, y: 22, tamanho: 5.5, atraso: 0.6 },
              { texto: 'NEUTRO', x: 84, y: 44, tamanho: 5.5, atraso: 1.4 },
              { texto: 'TERRA', x: 84, y: 66, tamanho: 5.5, atraso: 2.2 },
              { texto: 'Azul-claro = neutro', x: 50, y: 88, tamanho: 6, atraso: 2.8, destaque: true },
            ],
          },
        },
        {
          titulo: 'A grossura conta',
          texto: 'Luz: no mínimo 1,5 mm². Tomadas: no mínimo 2,5 mm². Chuveiro: o que diz o manual.',
          segundos: 8,
          desenho: {
            pecas: [{ desenho: 'bitolas', x: 50, y: 42, largura: 86, movimento: 'entrar' }],
            rotulos: [
              { texto: 'LUZ', x: 13, y: 74, tamanho: 5.5, atraso: 1 },
              { texto: 'TOMADA', x: 32, y: 74, tamanho: 5.5, atraso: 1.4 },
              { texto: 'CHUVEIRO', x: 72, y: 74, tamanho: 5.5, atraso: 1.8 },
            ],
          },
        },
        {
          titulo: 'O disjuntor protege o fio',
          texto: 'Se passa corrente demais, ele desarma antes de o fio esquentar.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'disjuntor', x: 30, y: 46, largura: 28, movimento: 'desligar', atraso: 2 },
              { desenho: 'fio-fase', x: 72, y: 46, largura: 46, movimento: 'tremer', atraso: 0.5 },
            ],
            rotulos: [{ texto: 'DESARMOU', x: 30, y: 84, tamanho: 6.5, atraso: 2.3, destaque: true }],
          },
        },
        {
          titulo: 'O DR protege você',
          texto: 'Se a corrente fugir por uma pessoa, ele desliga em menos de um piscar de olhos.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'dr', x: 30, y: 44, largura: 34, movimento: 'entrar' },
              { desenho: 'pessoa', x: 74, y: 50, largura: 22, movimento: 'surgir', atraso: 0.6 },
              { desenho: 'certo', x: 74, y: 22, largura: 16, movimento: 'entrar', atraso: 2 },
            ],
            rotulos: [{ texto: 'Banheiro, cozinha, área e quintal', x: 50, y: 88, tamanho: 5.5, atraso: 1.6 }],
          },
        },
      ],
      partes: [
        {
          titulo: 'As cores dos fios',
          paragrafos: [
            'Pela norma brasileira, o fio neutro é sempre azul-claro, e o fio terra (de proteção) é verde ou verde e amarelo. A fase pode ser de outra cor: preto, vermelho, branco ou cinza.',
            'O retorno é o fio que sai do interruptor e vai até a lâmpada. Muitos eletricistas usam uma cor diferente para ele, para não confundir com a fase.',
            'Nunca use fio azul-claro ou verde como fase. Quem mexer depois vai achar que é seguro.',
          ],
        },
        {
          titulo: 'Qual fio usar',
          passos: [
            'Circuito de iluminação: fio de no mínimo 1,5 mm².',
            'Circuito de tomadas: fio de no mínimo 2,5 mm².',
            'Chuveiro, torneira elétrica, forno e ar-condicionado: use o fio e o disjuntor que o manual do aparelho manda. Em 127 V eles costumam pedir fio bem mais grosso que em 220 V.',
            'Use fio de cobre de marca conhecida, com a grossura (bitola) escrita no próprio fio.',
          ],
        },
        {
          titulo: 'Disjuntor e DR',
          paragrafos: [
            'O disjuntor é escolhido pela grossura do fio, e não pelo aparelho. A função dele é desligar antes que o fio esquente demais.',
            'O DR (dispositivo diferencial residual) percebe quando a corrente foge pelo corpo de alguém e desliga. A norma exige DR de no máximo 30 mA nos circuitos de banheiro, cozinha, lavanderia, área de serviço e tomadas externas.',
            'O DR tem um botão de teste (T). Aperte uma vez por mês: se ele não desarmar, está com defeito.',
          ],
        },
      ],
      erros: [
        'Usar fio de 1,5 mm² para tomadas de cozinha, onde ficam a geladeira e o micro-ondas.',
        'Usar o fio neutro como terra. São fios diferentes com funções diferentes.',
        'Achar que fio mais fino "dá conta" porque o aparelho funcionou no primeiro dia: o problema aparece no calor e com o uso.',
      ],
      teste: [
        {
          pergunta: 'Qual é a cor do fio neutro?',
          opcoes: ['Verde', 'Azul-claro', 'Preto'],
          correta: 1,
          explicacao: 'A norma brasileira manda o neutro ser azul-claro. Verde ou verde e amarelo é o terra.',
        },
        {
          pergunta: 'Qual a grossura mínima do fio das tomadas?',
          opcoes: ['1,5 mm²', '2,5 mm²', '0,5 mm²'],
          correta: 1,
          explicacao: 'Tomadas pedem no mínimo 2,5 mm². O 1,5 mm² é o mínimo para iluminação.',
        },
        {
          pergunta: 'Para que serve o DR?',
          opcoes: ['Deixar a luz mais forte', 'Desligar quando a corrente foge por uma pessoa', 'Economizar energia'],
          correta: 1,
          explicacao: 'O DR protege contra choque. É obrigatório em banheiro, cozinha, área de serviço e tomadas externas.',
        },
      ],
      fontes: [MANUAL_PROCOBRE, NBR_5410],
    },
    {
      id: 'eletrica-tomada',
      titulo: 'Trocar ou instalar uma tomada',
      objetivo: 'Ligar uma tomada de 3 pinos do jeito certo, com fase, neutro e terra.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Desligue e teste',
          texto: 'Disjuntor desligado e chave de teste sem acender.',
          segundos: 6,
          desenho: {
            pecas: [
              { desenho: 'disjuntor', x: 30, y: 46, largura: 26, movimento: 'desligar', atraso: 0.8 },
              { desenho: 'chave-teste', x: 70, y: 46, largura: 12, giro: 20, movimento: 'entrar', atraso: 1.4 },
            ],
            rotulos: [{ texto: 'SEM ENERGIA', x: 50, y: 88, tamanho: 7, atraso: 2.2, destaque: true }],
          },
        },
        {
          titulo: 'Os três fios',
          texto: 'Fase e neutro nos furos dos lados. O terra (verde) no furo do meio.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'caixa-parede', x: 30, y: 50, largura: 42, movimento: 'entrar' },
              { desenho: 'tomada', x: 74, y: 44, largura: 36, movimento: 'deslizar', vindoDe: [30, 0], atraso: 1 },
              { desenho: 'seta', x: 52, y: 44, largura: 12, movimento: 'surgir', atraso: 1.8 },
            ],
            rotulos: [{ texto: 'TERRA NO MEIO', x: 74, y: 76, tamanho: 6, atraso: 2.4 }],
          },
        },
        {
          titulo: 'Aperte bem cada parafuso',
          texto: 'Descasque 1 cm, encaixe todo o cobre e aperte firme. Puxe para conferir.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'chave-fenda', x: 54, y: 40, largura: 60, giro: -30, movimento: 'apertar', atraso: 0.3 },
              { desenho: 'fio-fase', x: 40, y: 72, largura: 46, movimento: 'surgir' },
            ],
            rotulos: [{ texto: '1 cm de cobre', x: 50, y: 90, tamanho: 6.5, atraso: 1.2 }],
          },
        },
        {
          titulo: 'Religue e teste',
          texto: 'Feche a tomada, religue o disjuntor e ligue um aparelho.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'tomada', x: 40, y: 44, largura: 42, movimento: 'entrar' },
              { desenho: 'plugue', x: 40, y: 82, largura: 22, giro: 180, movimento: 'deslizar', vindoDe: [0, 20], atraso: 0.8 },
              { desenho: 'certo', x: 80, y: 30, largura: 20, movimento: 'entrar', atraso: 2.2 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Conheça a tomada de 3 pinos',
          paragrafos: [
            'A tomada brasileira tem dois furos para a fase e o neutro e um furo para o terra, que fica no meio e um pouco mais baixo.',
            'Existem tomadas de 10 A (furos finos) e de 20 A (furos grossos). A de 20 A só pode ser usada se o fio for de 2,5 mm² ou mais e o disjuntor do circuito for compatível.',
          ],
        },
        {
          titulo: 'Passo a passo para trocar',
          passos: [
            'Desligue o disjuntor e teste a tomada com a chave de teste.',
            'Tire o espelho (a tampa) e solte os parafusos que prendem a tomada na caixa.',
            'Puxe a tomada com cuidado e teste de novo cada fio.',
            'Solte os fios da tomada velha. Se a ponta estiver escura, derretida ou quebradiça, corte e descasque de novo.',
            'Descasque cerca de 1 cm de cada fio, sem cortar o cobre.',
            'Ligue a fase e o neutro nos bornes dos lados e o terra (verde ou verde e amarelo) no borne do meio.',
            'Aperte bem e dê um puxão leve em cada fio para conferir.',
            'Dobre os fios com cuidado para dentro da caixa, prenda a tomada e o espelho.',
            'Religue o disjuntor e teste com um aparelho.',
          ],
        },
        {
          titulo: 'Instalar uma tomada nova',
          paragrafos: [
            'Tomada nova precisa de caixa na parede e de fio passado por dentro de conduíte (o cano corrugado), vindo do quadro ou de outra tomada do mesmo circuito.',
            'Nunca deixe fio solto na parede ou emendado no meio do conduíte: emenda só dentro de caixa.',
            'Se a casa não tem fio terra, o certo é instalar um. Ligar o terra no neutro é perigoso e proibido.',
          ],
        },
      ],
      erros: [
        'Usar benjamim e extensão como instalação definitiva: esquentam e derretem.',
        'Deixar cobre aparecendo para fora do borne.',
        'Tirar o pino do meio do plugue para caber na tomada velha: isso tira a proteção contra choque.',
      ],
      teste: [
        {
          pergunta: 'Onde se liga o fio terra na tomada de 3 pinos?',
          opcoes: ['No furo do meio', 'Em qualquer furo', 'Não precisa ligar'],
          correta: 0,
          explicacao: 'O terra vai no borne do meio. Ele leva para o chão a corrente que fugiria pelo seu corpo.',
        },
        {
          pergunta: 'Quanto de fio descascar para ligar na tomada?',
          opcoes: ['Cerca de 1 cm', '5 cm', 'Não precisa descascar'],
          correta: 0,
          explicacao: 'Cerca de 1 cm: o suficiente para o cobre entrar todo no borne, sem sobrar cobre para fora.',
        },
        {
          pergunta: 'Posso emendar o fio no meio da parede, dentro do conduíte?',
          opcoes: ['Sim, com fita isolante', 'Não, emenda só dentro de caixa', 'Sim, se for fio grosso'],
          correta: 1,
          explicacao: 'Emenda escondida no conduíte esquenta sem ninguém ver e é difícil de achar. Emenda só em caixa.',
        },
      ],
      fontes: [MANUAL_PROCOBRE, NBR_5410, 'ABNT NBR 14136 — Plugues e tomadas para uso doméstico'],
    },
    {
      id: 'eletrica-lampada',
      titulo: 'Ponto de luz com interruptor',
      objetivo: 'Ligar lâmpada e interruptor do jeito seguro e fazer emendas bem feitas.',
      minutos: 7,
      cenas: [
        {
          titulo: 'A fase vai ao interruptor',
          texto: 'Assim, com a luz apagada, a lâmpada fica sem energia.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'fio-fase', x: 34, y: 34, largura: 50, movimento: 'deslizar', vindoDe: [-60, 0] },
              { desenho: 'interruptor', x: 76, y: 40, largura: 26, movimento: 'entrar', atraso: 0.8 },
            ],
            rotulos: [{ texto: 'FASE → INTERRUPTOR', x: 50, y: 80, tamanho: 6.5, atraso: 1.6, destaque: true }],
          },
        },
        {
          titulo: 'O retorno vai ao centro',
          texto: 'O fio que sai do interruptor vai ao centro do bocal. O neutro, à rosca.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'bocal', x: 40, y: 46, largura: 50, movimento: 'entrar' },
              { desenho: 'fio-retorno', x: 76, y: 82, largura: 36, movimento: 'deslizar', vindoDe: [30, 0], atraso: 1 },
            ],
            rotulos: [
              { texto: 'NEUTRO', x: 18, y: 26, tamanho: 5.5, atraso: 1.6 },
              { texto: 'RETORNO', x: 76, y: 70, tamanho: 5.5, atraso: 1.8 },
            ],
          },
        },
        {
          titulo: 'Emenda firme e isolada',
          texto: 'Torça bem os fios e cubra com 3 voltas de fita isolante, ou use conector.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'emenda', x: 50, y: 40, largura: 80, movimento: 'entrar' },
              { desenho: 'fita-isolante', x: 50, y: 76, largura: 20, movimento: 'girar', atraso: 1.2 },
            ],
          },
        },
        {
          titulo: 'Acendeu!',
          texto: 'Religue o disjuntor e teste o interruptor.',
          segundos: 6,
          desenho: {
            pecas: [
              { desenho: 'lampada', x: 42, y: 44, largura: 40, movimento: 'acender', atraso: 1.2 },
              { desenho: 'interruptor', x: 82, y: 56, largura: 20, movimento: 'desligar', atraso: 0.8 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Como a lâmpada é ligada',
          paragrafos: [
            'Um ponto de luz simples usa três fios: a fase, que vai até o interruptor; o retorno, que sai do interruptor e vai até a lâmpada; e o neutro, que vai direto à lâmpada.',
            'No bocal, o retorno vai ao contato do centro e o neutro vai à parte da rosca. Assim, quem troca a lâmpada com a luz apagada não leva choque ao encostar na rosca.',
            'A norma pede pelo menos um ponto de luz no teto de cada cômodo, ligado por interruptor.',
          ],
        },
        {
          titulo: 'Passo a passo',
          passos: [
            'Desligue o disjuntor da iluminação e teste os fios.',
            'Na caixa do interruptor, ligue a fase num borne e o retorno no outro.',
            'No teto, ligue o retorno ao contato do centro do bocal e o neutro à rosca.',
            'Se precisar emendar, torça os fios juntos com alicate, em pelo menos 5 voltas bem apertadas.',
            'Cubra a emenda com fita isolante (3 voltas sobrepostas, até cobrir 1 cm da capa) ou use um conector de emenda.',
            'Acomode tudo nas caixas, rosqueie a lâmpada e religue o disjuntor.',
          ],
        },
        {
          titulo: 'Troca de lâmpada',
          paragrafos: [
            'Apague o interruptor e espere a lâmpada esfriar. Use escada firme, nunca cadeira de rodinha ou balde.',
            'Se o bocal estiver escurecido ou rachado, troque o bocal: ele esquenta e pode soltar faísca.',
          ],
        },
      ],
      erros: [
        'Ligar o neutro no interruptor: a luz apaga, mas a lâmpada continua com energia.',
        'Emendar com fita crepe ou durex. Use fita isolante ou conector.',
        'Deixar emenda solta, sem torcer bem: ela esquenta e derrete a fita.',
      ],
      teste: [
        {
          pergunta: 'Qual fio deve passar pelo interruptor?',
          opcoes: ['O neutro', 'A fase', 'O terra'],
          correta: 1,
          explicacao: 'O interruptor deve cortar a fase. Assim, com a luz apagada, a lâmpada fica sem energia.',
        },
        {
          pergunta: 'No bocal, onde vai o neutro?',
          opcoes: ['Na rosca', 'No contato do centro', 'Em qualquer lugar'],
          correta: 0,
          explicacao: 'O neutro vai à rosca e o retorno ao centro. A rosca é a parte que a mão encosta ao trocar a lâmpada.',
        },
        {
          pergunta: 'Como isolar uma emenda?',
          opcoes: ['Com fita crepe', 'Com fita isolante ou conector de emenda', 'Não precisa isolar'],
          correta: 1,
          explicacao: 'Fita isolante bem enrolada ou conector próprio. Fita crepe não isola e solta com o calor.',
        },
      ],
      fontes: [MANUAL_PROCOBRE, NBR_5410],
    },
    {
      id: 'eletrica-chuveiro',
      titulo: 'Trocar a resistência do chuveiro',
      objetivo: 'Trocar a resistência queimada sem levar choque e sem queimar a peça nova.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Desligue o disjuntor do chuveiro',
          texto: 'Só a chave do chuveiro não basta. Desligue no quadro.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'chuveiro', x: 36, y: 40, largura: 48, movimento: 'entrar' },
              { desenho: 'disjuntor', x: 80, y: 46, largura: 22, movimento: 'desligar', atraso: 1.2 },
            ],
            rotulos: [{ texto: 'DESLIGUE NO QUADRO', x: 50, y: 86, tamanho: 6.5, atraso: 1.8, destaque: true }],
          },
        },
        {
          titulo: 'Resistência igual à velha',
          texto: 'Mesma marca, modelo, potência e tensão (127 V ou 220 V).',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'chuveiro', x: 30, y: 44, largura: 36, movimento: 'surgir' },
              { desenho: 'seta', x: 54, y: 44, largura: 12, movimento: 'surgir', atraso: 0.6 },
              { desenho: 'chuveiro', x: 76, y: 44, largura: 36, movimento: 'surgir', atraso: 1.2 },
            ],
            rotulos: [{ texto: '127 V ou 220 V?', x: 50, y: 82, tamanho: 7, atraso: 1.8 }],
          },
        },
        {
          titulo: 'Primeiro a água',
          texto: 'Abra o registro e deixe a água correr. Só depois religue o disjuntor.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'registro', x: 30, y: 30, largura: 36, movimento: 'apertar' },
              { desenho: 'chuveiro', x: 70, y: 40, largura: 40, movimento: 'entrar', atraso: 0.6 },
              { desenho: 'disjuntor', x: 30, y: 72, largura: 16, movimento: 'surgir', atraso: 2.2 },
            ],
            rotulos: [
              { texto: '1º ÁGUA', x: 30, y: 52, tamanho: 6.5, atraso: 1 },
              { texto: '2º ENERGIA', x: 66, y: 76, tamanho: 6.5, atraso: 2.6, destaque: true },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Como saber se a resistência queimou',
          paragrafos: [
            'Se a água sai fria em todas as posições, mas o disjuntor está ligado, a resistência provavelmente queimou. Olhando dentro do chuveiro, dá para ver o fio da resistência partido.',
            'Se o disjuntor desarma ou o DR desliga quando abre o chuveiro, o problema pode ser outro (fio, aterramento ou circuito). Nesse caso, chame um eletricista.',
          ],
        },
        {
          titulo: 'Passo a passo',
          passos: [
            'Desligue o disjuntor do chuveiro no quadro e coloque o seletor do chuveiro em "desligado".',
            'Feche o registro.',
            'Abra a tampa do chuveiro como o manual indica (muitas giram no sentido anti-horário).',
            'Tire a resistência velha e leve-a à loja para comprar uma igual: mesma marca, modelo, potência e tensão.',
            'Encaixe a nova sem dobrar nem esticar o fio, e feche a tampa.',
            'Abra o registro e deixe a água correr por alguns segundos.',
            'Só então religue o disjuntor e escolha a temperatura.',
          ],
        },
        {
          titulo: 'Chuveiro novo pede circuito próprio',
          paragrafos: [
            'O chuveiro puxa muita corrente. Pela norma, todo aparelho acima de 10 A precisa de circuito só dele, com o fio e o disjuntor que o manual do chuveiro indica.',
            'O fio terra do chuveiro precisa ser ligado ao terra da casa. Nunca ligue o terra no neutro.',
          ],
        },
      ],
      erros: [
        'Religar o disjuntor antes de a água chegar: a resistência nova queima na hora.',
        'Comprar resistência de 220 V para chuveiro de 127 V (ou o contrário).',
        'Emendar a resistência partida: a emenda esquenta, derrete e pode dar choque.',
      ],
      teste: [
        {
          pergunta: 'Depois de trocar a resistência, o que vem primeiro?',
          opcoes: ['Ligar o disjuntor', 'Abrir a água e deixar correr', 'Ligar na posição mais quente'],
          correta: 1,
          explicacao: 'A água tem que encher o chuveiro antes. Ligada a seco, a resistência queima na hora.',
        },
        {
          pergunta: 'Que resistência comprar?',
          opcoes: ['Qualquer uma que caiba', 'Igual à velha: modelo, potência e tensão', 'A mais forte da loja'],
          correta: 1,
          explicacao: 'Leve a velha à loja. Potência ou tensão diferentes podem queimar a peça ou sobrecarregar o fio.',
        },
        {
          pergunta: 'Desligar só a chave do chuveiro é suficiente para trocar a resistência?',
          opcoes: ['Sim', 'Não, tem que desligar o disjuntor', 'Só se o chão estiver seco'],
          correta: 1,
          explicacao: 'A chave do chuveiro não corta a energia de tudo. Desligue o disjuntor do chuveiro no quadro.',
        },
      ],
      fontes: ['Lorenzetti: manual de instalação do chuveiro Advanced', MANUAL_PROCOBRE, NBR_5410],
    },
    {
      id: 'eletrica-planejar',
      titulo: 'Planejar a rede elétrica de uma casa',
      objetivo: 'Dividir a casa em circuitos e saber quantas tomadas e pontos de luz cada cômodo precisa.',
      minutos: 9,
      cenas: [
        {
          titulo: 'Desenhe a casa',
          texto: 'Marque onde vão o quadro, as luzes, as tomadas e os aparelhos grandes.',
          segundos: 8,
          desenho: {
            pecas: [{ desenho: 'planta-casa', x: 50, y: 46, largura: 88, movimento: 'entrar' }],
            rotulos: [{ texto: 'QUADRO', x: 50, y: 88, tamanho: 6, atraso: 2.6, destaque: true }],
          },
        },
        {
          titulo: 'Luz separada das tomadas',
          texto: 'Um circuito para as luzes e outros para as tomadas.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'quadro', x: 26, y: 46, largura: 34, movimento: 'entrar' },
              { desenho: 'lampada', x: 70, y: 28, largura: 18, movimento: 'acender', atraso: 0.8 },
              { desenho: 'tomada', x: 70, y: 66, largura: 22, movimento: 'entrar', atraso: 1.4 },
            ],
            rotulos: [
              { texto: 'C1', x: 50, y: 28, tamanho: 7, atraso: 1, destaque: true },
              { texto: 'C2', x: 50, y: 66, tamanho: 7, atraso: 1.6, destaque: true },
            ],
          },
        },
        {
          titulo: 'Aparelho forte, circuito próprio',
          texto: 'Chuveiro, forno e ar-condicionado: cada um no seu disjuntor.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'chuveiro', x: 32, y: 42, largura: 40, movimento: 'entrar' },
              { desenho: 'disjuntor', x: 76, y: 44, largura: 20, movimento: 'surgir', atraso: 1 },
            ],
            rotulos: [{ texto: 'SÓ DELE', x: 76, y: 80, tamanho: 7, atraso: 1.6, destaque: true }],
          },
        },
        {
          titulo: 'DR e terra',
          texto: 'DR nas áreas molhadas e fio terra em todas as tomadas.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'dr', x: 30, y: 44, largura: 30, movimento: 'entrar' },
              { desenho: 'fio-terra', x: 72, y: 44, largura: 44, movimento: 'deslizar', vindoDe: [40, 0], atraso: 0.8 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Divida a casa em circuitos',
          paragrafos: [
            'Circuito é o caminho que sai de um disjuntor e alimenta um grupo de luzes ou tomadas. Separar em vários circuitos evita sobrecarga e deixa você desligar só uma parte da casa para consertar.',
            'Exemplo para uma casa de sala, 2 quartos, cozinha, banheiro e área de serviço:',
          ],
          passos: [
            'C1 — iluminação de toda a casa (fio 1,5 mm²).',
            'C2 — tomadas da sala e dos quartos (fio 2,5 mm²).',
            'C3 — tomadas da cozinha (fio 2,5 mm², com DR).',
            'C4 — tomadas da área de serviço (fio 2,5 mm², com DR).',
            'C5 — chuveiro, com o fio e o disjuntor do manual e DR.',
            'Mais um circuito para cada aparelho acima de 10 A: forno elétrico, ar-condicionado, torneira elétrica.',
          ],
        },
        {
          titulo: 'Quantas tomadas e luzes',
          passos: [
            'Cada cômodo: pelo menos um ponto de luz no teto, ligado por interruptor.',
            'Cômodo de até 6 m²: pelo menos 1 tomada.',
            'Sala e quarto maiores que 6 m²: 1 tomada a cada 5 metros de parede (perímetro), bem espalhadas.',
            'Cozinha: 1 tomada a cada 3,5 metros de perímetro, com tomadas em cima da pia.',
            'Banheiro: pelo menos 1 tomada perto da pia, a pelo menos 60 cm do box.',
          ],
        },
        {
          titulo: 'Como passar os fios',
          paragrafos: [
            'Os fios correm dentro de conduítes (eletrodutos) embutidos na parede ou presos por fora, sempre de caixa em caixa. Emendas só dentro das caixas.',
            'O quadro de distribuição fica num lugar fácil de alcançar, com um disjuntor geral, um disjuntor para cada circuito e o DR.',
            'Antes de comprar o material, peça a um eletricista ou técnico para conferir o projeto. A ligação da casa ao poste e o padrão de entrada são pedidos à distribuidora de energia.',
          ],
        },
      ],
      erros: [
        'Pôr a casa inteira num disjuntor só: qualquer defeito apaga tudo, e o fio vive sobrecarregado.',
        'Ligar o chuveiro no mesmo circuito das tomadas.',
        'Fio solto, sem conduíte, preso com prego na parede ou passando pelo telhado sem proteção.',
      ],
      teste: [
        {
          pergunta: 'O forno elétrico puxa mais de 10 A. Como ligar?',
          opcoes: ['Num circuito só dele', 'Junto com as tomadas da sala', 'Numa extensão'],
          correta: 0,
          explicacao: 'Pela norma, aparelho acima de 10 A precisa de circuito independente.',
        },
        {
          pergunta: 'Por que separar luz e tomadas em circuitos diferentes?',
          opcoes: [
            'Para gastar mais fio',
            'Para não sobrecarregar e para consertar uma parte sem apagar tudo',
            'Porque a lâmpada não funciona junto',
          ],
          correta: 1,
          explicacao: 'Circuitos separados dividem a carga e deixam você desligar só o que vai consertar.',
        },
        {
          pergunta: 'Uma cozinha com 14 metros de perímetro precisa de pelo menos quantas tomadas?',
          opcoes: ['1', '4', '10'],
          correta: 1,
          explicacao: 'Na cozinha, 1 tomada a cada 3,5 m: 14 ÷ 3,5 = 4 tomadas.',
        },
      ],
      fontes: [MANUAL_PROCOBRE, NBR_5410, 'O Setor Elétrico: a divisão da instalação em circuitos conforme a NBR 5410'],
    },
    {
      id: 'eletrica-gerador',
      titulo: 'Gerador, energia sem rede e fio caído',
      objetivo: 'Usar gerador sem risco de morte, ter luz quando falta energia e agir certo diante de fio caído.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Gerador só do lado de fora',
          texto: 'A pelo menos 6 metros da casa, longe de portas e janelas. O gás dele mata sem cheiro.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'gerador', x: 68, y: 46, largura: 46, movimento: 'entrar' },
              { desenho: 'seta', x: 30, y: 46, largura: 22, giro: 180, movimento: 'surgir', atraso: 0.8 },
            ],
            rotulos: [{ texto: '6 METROS OU MAIS', x: 50, y: 86, tamanho: 7, atraso: 1.4, destaque: true }],
          },
        },
        {
          titulo: 'Nunca na tomada da casa',
          texto: 'A energia volta pela rede e pode matar quem conserta os fios na rua.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'gerador', x: 30, y: 44, largura: 40, movimento: 'entrar' },
              { desenho: 'tomada', x: 76, y: 44, largura: 26, movimento: 'entrar', atraso: 0.5 },
              { desenho: 'errado', x: 76, y: 44, largura: 34, movimento: 'entrar', atraso: 1.2 },
            ],
            rotulos: [{ texto: 'SÓ COM CHAVE REVERSORA', x: 50, y: 84, tamanho: 6, atraso: 1.8 }],
          },
        },
        {
          titulo: 'Luz quando falta energia',
          texto: 'Lanterna de LED, carregador portátil e placa solar pequena com bateria.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'lanterna', x: 34, y: 42, largura: 42, movimento: 'acender', atraso: 0.8 },
              { desenho: 'placa-solar', x: 74, y: 58, largura: 36, movimento: 'entrar', atraso: 0.4 },
              { desenho: 'sol', x: 82, y: 18, largura: 18, movimento: 'girar' },
            ],
          },
        },
        {
          titulo: 'Fio caído: fique longe',
          texto: 'Fique a 10 metros, mesmo que pareça desligado. Ligue para a distribuidora e para o 193.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'fio-fase', x: 50, y: 36, largura: 66, giro: 18, movimento: 'tremer' },
              { desenho: 'raio', x: 22, y: 70, largura: 22, movimento: 'piscar', atraso: 0.6 },
            ],
            rotulos: [
              { texto: '10 METROS', x: 66, y: 68, tamanho: 8, atraso: 1, destaque: true },
              { texto: '193', x: 66, y: 86, tamanho: 9, atraso: 1.6 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'Gerador sem acidente',
          passos: [
            'Use só ao ar livre, a pelo menos 6 metros da casa e longe de portas e janelas.',
            'Nunca dentro de casa ou na garagem, nem com a janela aberta: o gás que ele solta mata sem cheiro.',
            'Ligue os aparelhos direto no gerador, com extensão grossa e sem emenda.',
            'Para ligar no quadro da casa, só com chave reversora instalada por eletricista.',
            'Desligue e espere esfriar antes de pôr combustível.',
          ],
        },
        {
          titulo: 'Energia quando falta luz',
          passos: [
            'Tenha lanternas e lampiões de LED, com pilhas recarregáveis.',
            'Deixe um carregador portátil (power bank) sempre carregado para o celular.',
            'Uma placa solar pequena com controlador de carga e bateria serve para luz e celular.',
            'Vela só em pires firme, longe de cortina e de criança. Prefira LED.',
          ],
        },
        {
          titulo: 'Fio caído e alagamento',
          passos: [
            'Fique a 10 metros do fio caído, mesmo que pareça desligado.',
            'Não encoste em quem levou choque enquanto a energia não for cortada.',
            'Ligue para a distribuidora de energia e para os Bombeiros no 193.',
            'Depois de alagamento, só religue a energia depois que um eletricista olhar a casa.',
          ],
        },
      ],
      erros: [
        'Ligar o gerador numa tomada para "alimentar a casa".',
        'Deixar o gerador na garagem ou na varanda fechada.',
        'Pôr combustível com o gerador ligado ou quente.',
        'Puxar com a mão quem está levando choque.',
      ],
      teste: [
        {
          pergunta: 'Onde deixar o gerador funcionando?',
          opcoes: ['Na garagem, com a porta aberta', 'Ao ar livre, a pelo menos 6 metros da casa', 'Na cozinha, perto da janela'],
          correta: 1,
          explicacao: 'O gás do motor mata sem cheiro. Só ao ar livre e longe de portas e janelas.',
        },
        {
          pergunta: 'Pode ligar o gerador numa tomada para a energia ir para a casa toda?',
          opcoes: ['Sim, é o jeito mais fácil', 'Não, a energia volta pela rede e pode matar', 'Só à noite'],
          correta: 1,
          explicacao: 'Para ligar no quadro é preciso chave reversora instalada por eletricista.',
        },
        {
          pergunta: 'Viu um fio caído na rua. O que fazer?',
          opcoes: ['Afastar com um pedaço de pau', 'Ficar a 10 metros e ligar para a distribuidora e o 193', 'Passar por cima com cuidado'],
          correta: 1,
          explicacao: 'Mesmo parado, o fio pode estar com energia. Fique longe e chame quem sabe.',
        },
      ],
      fontes: [
        'Ready.gov (governo dos EUA): segurança com geradores portáteis',
        'Corpo de Bombeiros: emergência 193',
        MANUAL_PROCOBRE,
      ],
    },
  ],
}
