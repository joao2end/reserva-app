import type { ModuloCurso } from './tipos'

export const CURSO_MECANICA: ModuloCurso = {
  id: 'mecanica',
  area: 'oficios',
  titulo: 'Mecânica básica',
  resumo: 'Remendar pneu de bicicleta, trocar pneu do carro, fazer a revisão de 5 minutos e deixar o carro pronto para a emergência.',
  licoes: [
    {
      id: 'mecanica-bike-pneu',
      nivel: 'medio',
      titulo: 'Pneu de bicicleta furado',
      objetivo: 'Achar o furo e remendar a câmara de ar para voltar a pedalar.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Tire o pneu com espátula',
          texto: 'Esvazie, encaixe a espátula na borda e solte o pneu do aro.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'roda-bike', x: 42, y: 50, largura: 64, movimento: 'entrar' },
              { desenho: 'espatula', x: 74, y: 26, largura: 40, giro: 40, movimento: 'deslizar', vindoDe: [20, -20], atraso: 0.8 },
            ],
          },
        },
        {
          titulo: 'Ache o furo na água',
          texto: 'Encha um pouco a câmara e mergulhe. Onde sair bolha, está o furo.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'bacia-agua', x: 50, y: 70, largura: 84, movimento: 'surgir' },
              { desenho: 'camara', x: 48, y: 46, largura: 70, movimento: 'cair', atraso: 0.6 },
            ],
            rotulos: [{ texto: 'BOLHAS = FURO', x: 50, y: 16, tamanho: 7, atraso: 2, destaque: true }],
          },
        },
        {
          titulo: 'Lixe, passe cola, espere',
          texto: 'Lixe em volta do furo, passe a cola e espere secar o tempo da embalagem.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'lixa', x: 30, y: 40, largura: 34, movimento: 'balancar' },
              { desenho: 'relogio', x: 74, y: 40, largura: 30, movimento: 'entrar', atraso: 1.2 },
            ],
            rotulos: [{ texto: 'COLA SECA AO TOQUE', x: 50, y: 80, tamanho: 6.5, atraso: 2 }],
          },
        },
        {
          titulo: 'Remendo e ar',
          texto: 'Aperte o remendo com força e encha na pressão escrita no pneu.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'remendo', x: 28, y: 40, largura: 26, movimento: 'cair' },
              { desenho: 'bomba-ar', x: 72, y: 52, largura: 26, movimento: 'surgir', atraso: 1 },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'O que ter em casa',
          paragrafos: [
            'Kit de remendo (lixa, cola e remendos), duas espátulas de plástico e uma bomba de ar. Uma câmara reserva é a solução mais rápida: o remendo é bom para voltar para casa, mas pode não durar tanto quanto uma câmara nova.',
          ],
        },
        {
          titulo: 'Passo a passo',
          passos: [
            'Vire a bicicleta de cabeça para baixo e solte a roda (porca ou blocagem rápida). Na roda de trás, passe antes a corrente para a catraca menor.',
            'Esvazie de vez a câmara pelo bico.',
            'Encaixe a espátula entre o pneu e o aro, faça alavanca e prenda no raio. Com a segunda espátula, corra em volta até soltar um lado do pneu.',
            'Tire a câmara, encha um pouco e passe numa bacia com água. Onde sair bolha, marque o furo com caneta.',
            'Seque, lixe em volta do furo e passe uma camada fina de cola, maior que o remendo.',
            'Espere a cola secar ao toque, o tempo que a embalagem manda.',
            'Cole o remendo e aperte com força por um minuto.',
            'Passe os dedos devagar por dentro do pneu para achar o espinho ou caco que furou. Tire, senão fura de novo.',
            'Ponha a câmara de volta, encaixe o pneu com as mãos e encha na pressão escrita na lateral do pneu.',
          ],
        },
      ],
      erros: [
        'Colar o remendo com a cola ainda molhada: ele descola.',
        'Não procurar o espinho dentro do pneu.',
        'Usar chave de fenda no lugar da espátula: corta a câmara.',
      ],
      teste: [
        {
          pergunta: 'Como achar um furo pequeno na câmara?',
          opcoes: ['Encher um pouco e mergulhar na água para ver bolhas', 'Apertar até estourar', 'Olhar no sol'],
          correta: 0,
          explicacao: 'O ar escapando forma bolhas bem no furo.',
        },
        {
          pergunta: 'Quando colar o remendo?',
          opcoes: ['Com a cola ainda molhada', 'Quando a cola estiver seca ao toque', 'No dia seguinte'],
          correta: 1,
          explicacao: 'A cola de remendo frio precisa secar ao toque para grudar. Siga o tempo da embalagem.',
        },
        {
          pergunta: 'Depois de remendar, o que é importante conferir?',
          opcoes: ['Se o espinho ainda está dentro do pneu', 'A cor do remendo', 'O guidão'],
          correta: 0,
          explicacao: 'Se o que furou ficar no pneu, a câmara fura de novo no primeiro quarteirão.',
        },
      ],
      fontes: ['Trek Bicycle: como montar, manter e consertar pneus'],
    },
    {
      id: 'mecanica-pneu-carro',
      nivel: 'medio',
      titulo: 'Trocar o pneu do carro',
      objetivo: 'Trocar o pneu furado pelo estepe com segurança na rua ou na estrada.',
      minutos: 7,
      cenas: [
        {
          titulo: 'Sinalize',
          texto: 'Pisca-alerta ligado e triângulo a pelo menos 30 metros.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'carro', x: 30, y: 46, largura: 50, movimento: 'entrar' },
              { desenho: 'triangulo', x: 82, y: 56, largura: 20, movimento: 'deslizar', vindoDe: [-50, 0], atraso: 0.8 },
            ],
            rotulos: [{ texto: '30 m ou mais', x: 56, y: 80, tamanho: 7, atraso: 1.8, destaque: true }],
          },
        },
        {
          titulo: 'Afrouxe antes de levantar',
          texto: 'Com a roda no chão, solte as porcas meia volta.',
          segundos: 7,
          desenho: {
            pecas: [{ desenho: 'chave-roda', x: 50, y: 44, largura: 58, movimento: 'apertar', atraso: 0.4 }],
            rotulos: [{ texto: 'RODA NO CHÃO', x: 50, y: 88, tamanho: 7, atraso: 1.4 }],
          },
        },
        {
          titulo: 'Macaco no ponto certo',
          texto: 'Use o ponto indicado no manual. Nunca fique embaixo do carro.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'carro', x: 50, y: 42, largura: 70, movimento: 'deslizar', vindoDe: [0, 6], atraso: 0.8 },
              { desenho: 'macaco', x: 50, y: 70, largura: 20, movimento: 'surgir' },
            ],
          },
        },
        {
          titulo: 'Aperte em cruz',
          texto: 'Aperte uma porca e depois a do lado oposto, até firmar todas.',
          segundos: 8,
          desenho: {
            pecas: [{ desenho: 'roda-porcas', x: 50, y: 46, largura: 62, movimento: 'entrar' }],
            rotulos: [{ texto: '1 → 2 → 3 → 4', x: 50, y: 90, tamanho: 7, atraso: 1 }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Primeiro, a segurança',
          passos: [
            'Pare em lugar plano, firme e longe do fluxo. No acostamento, saia todo mundo do carro pelo lado de dentro.',
            'Ligue o pisca-alerta.',
            'Ponha o triângulo a pelo menos 30 metros atrás do carro. Em estrada rápida, à noite ou com chuva, ponha bem mais longe.',
            'Puxe o freio de mão e engate a primeira marcha (no automático, P).',
            'Se tiver, calce com uma pedra a roda do lado oposto à que vai trocar.',
          ],
        },
        {
          titulo: 'A troca',
          passos: [
            'Tire o estepe, o macaco e a chave de roda.',
            'Com o carro ainda no chão, afrouxe cada porca meia volta, girando no sentido anti-horário.',
            'Encaixe o macaco no ponto do manual, firme na lataria, e levante até a roda sair do chão.',
            'Tire as porcas e a roda. Deixe a roda furada deitada embaixo do carro, como segurança.',
            'Encaixe o estepe e rosqueie as porcas com a mão.',
            'Aperte em cruz: uma porca e depois a do lado oposto.',
            'Desça o carro e dê o aperto final, de novo em cruz.',
            'Leve o pneu furado ao borracheiro e confira a calibragem do estepe.',
          ],
        },
      ],
      erros: [
        'Tentar soltar as porcas com o carro já levantado: a roda gira e o carro pode cair do macaco.',
        'Colocar qualquer parte do corpo embaixo do carro suspenso.',
        'Apertar as porcas em volta, uma do lado da outra: a roda fica torta.',
      ],
      teste: [
        {
          pergunta: 'Quando afrouxar as porcas?',
          opcoes: ['Com a roda ainda no chão', 'Com o carro levantado', 'Depois de tirar a roda'],
          correta: 0,
          explicacao: 'Com a roda no chão ela não gira, e o carro fica estável enquanto você faz força.',
        },
        {
          pergunta: 'A que distância colocar o triângulo, no mínimo?',
          opcoes: ['5 metros', '30 metros', 'Encostado no carro'],
          correta: 1,
          explicacao: 'A regra pede pelo menos 30 metros. Em estrada rápida, à noite ou com chuva, ponha bem mais longe.',
        },
        {
          pergunta: 'Como apertar as porcas do estepe?',
          opcoes: ['Em cruz, de uma para a oposta', 'Uma de cada vez em volta', 'Só a de cima'],
          correta: 0,
          explicacao: 'O aperto em cruz encaixa a roda reta no cubo.',
        },
      ],
      fontes: ['AutoPapo: como trocar o pneu do carro', 'Portal do Trânsito: Resolução Contran 36/98 e o uso do triângulo'],
    },
    {
      id: 'mecanica-revisao-carro',
      nivel: 'facil',
      titulo: 'Revisão de 5 minutos do carro',
      objetivo: 'Conferir óleo, água e pneus antes de viajar ou uma vez por semana.',
      minutos: 5,
      cenas: [
        {
          titulo: 'Carro no plano, motor parado',
          texto: 'Espere alguns minutos para o óleo descer ao cárter.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'carro', x: 40, y: 44, largura: 60, movimento: 'entrar' },
              { desenho: 'relogio', x: 82, y: 30, largura: 22, movimento: 'entrar', atraso: 1 },
            ],
          },
        },
        {
          titulo: 'Vareta entre MÍN e MÁX',
          texto: 'Tire, limpe com pano, ponha de novo e tire para ler.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'vareta-oleo', x: 40, y: 50, largura: 22, movimento: 'deslizar', vindoDe: [0, -30] },
              { desenho: 'certo', x: 76, y: 60, largura: 20, movimento: 'entrar', atraso: 1.8 },
            ],
          },
        },
        {
          titulo: 'Radiador só frio',
          texto: 'Nunca abra a tampa do radiador com o motor quente.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'raio', x: 34, y: 42, largura: 34, movimento: 'tremer' },
              { desenho: 'errado', x: 72, y: 42, largura: 30, movimento: 'entrar', atraso: 0.8 },
            ],
            rotulos: [{ texto: 'QUENTE = NÃO ABRA', x: 50, y: 82, tamanho: 7, atraso: 1.4, destaque: true }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Óleo do motor',
          passos: [
            'Estacione no plano e desligue o motor. Espere alguns minutos para o óleo voltar ao cárter.',
            'Puxe a vareta (normalmente tem a ponta amarela) e limpe com pano macio ou papel, sem fiapos.',
            'Ponha a vareta de volta até o fim e tire de novo.',
            'O óleo deve marcar entre as marcas de mínimo e máximo. Abaixo do mínimo, complete com o óleo que o manual indica, aos poucos, sem passar do máximo.',
          ],
        },
        {
          titulo: 'Água do radiador',
          paragrafos: [
            'Confira o nível no reservatório de expansão, com o motor frio. O líquido deve estar entre as marcas.',
            'Nunca abra a tampa com o motor quente: o líquido sai fervendo sob pressão e queima.',
          ],
        },
        {
          titulo: 'Pneus',
          paragrafos: [
            'Calibre com os pneus frios, na pressão escrita no manual ou na etiqueta da porta. Confira também o estepe.',
            'Troque o pneu quando o desgaste chegar às marcas (os ressaltos no fundo dos sulcos) ou se houver bolha ou corte na lateral.',
          ],
        },
      ],
      erros: [
        'Medir o óleo com o carro inclinado ou logo depois de desligar.',
        'Completar óleo além do máximo.',
        'Abrir o radiador com o motor quente.',
      ],
      teste: [
        {
          pergunta: 'Como deve estar o carro para medir o óleo?',
          opcoes: ['No plano e com o motor desligado há alguns minutos', 'Ligado e em subida', 'Andando'],
          correta: 0,
          explicacao: 'No plano e parado, o óleo desce todo para o cárter e a vareta mostra o nível certo.',
        },
        {
          pergunta: 'O óleo está abaixo do mínimo. O que fazer?',
          opcoes: ['Completar com o óleo do manual, sem passar do máximo', 'Pôr água', 'Ignorar'],
          correta: 0,
          explicacao: 'Use o tipo de óleo do manual e complete aos poucos, conferindo na vareta.',
        },
        {
          pergunta: 'Quando abrir a tampa do radiador?',
          opcoes: ['Com o motor frio', 'Com o motor quente, para esfriar', 'Com o carro ligado'],
          correta: 0,
          explicacao: 'Quente, o líquido está sob pressão e pode espirrar fervendo.',
        },
      ],
      fontes: ['AutoPapo: conferir o nível do óleo exige 3 cuidados'],
    },
    {
      id: 'mecanica-carro-pronto',
      nivel: 'facil',
      titulo: 'Carro pronto para sair na emergência',
      objetivo: 'Deixar o carro com combustível, revisão em dia e um kit de emergência, para sair às pressas sem ficar parado no caminho.',
      minutos: 5,
      cenas: [
        {
          titulo: 'Tanque pelo menos pela metade',
          texto: 'Nunca deixe o ponteiro baixar da metade. Em época de alerta, encha o tanque.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'marcador-tanque', x: 40, y: 44, largura: 50, movimento: 'entrar' },
              { desenho: 'certo', x: 80, y: 40, largura: 18, movimento: 'entrar', atraso: 1.4 },
            ],
            rotulos: [{ texto: 'METADE OU MAIS', x: 50, y: 84, tamanho: 7, atraso: 1.8, destaque: true }],
          },
        },
        {
          titulo: 'Kit no porta-malas',
          texto: 'Água, lanterna, caixa de primeiros socorros, cobertor e carregador de celular.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'caixa-socorro', x: 26, y: 46, largura: 30, movimento: 'cair' },
              { desenho: 'garrafa-pet', x: 54, y: 46, largura: 12, movimento: 'deslizar', vindoDe: [0, -40], atraso: 0.6 },
              { desenho: 'lanterna', x: 78, y: 46, largura: 26, movimento: 'acender', atraso: 1.2 },
            ],
          },
        },
        {
          titulo: 'Confira o estepe também',
          texto: 'Antes de viajar, calibre os pneus e o estepe e veja se o triângulo está no carro.',
          segundos: 8,
          desenho: {
            pecas: [
              { desenho: 'roda-porcas', x: 36, y: 44, largura: 36, movimento: 'girar' },
              { desenho: 'triangulo', x: 76, y: 46, largura: 28, movimento: 'surgir', atraso: 1 },
            ],
            rotulos: [{ texto: 'PNEUS E ESTEPE', x: 50, y: 86, tamanho: 7, atraso: 1.6 }],
          },
        },
      ],
      partes: [
        {
          titulo: 'Combustível',
          passos: [
            'Mantenha o tanque sempre pelo menos pela metade.',
            'Em época de alerta, encha o tanque. Pode ser preciso sair às pressas, e sem energia o posto pode não funcionar.',
          ],
        },
        {
          titulo: 'O kit do carro',
          passos: [
            'Água para beber e comida que não estraga.',
            'Lanterna com pilhas e carregador de celular para o carro.',
            'Caixa de primeiros socorros, cobertor e um apito.',
            'Cabos de chupeta, triângulo, macaco e chave de roda.',
            'Um mapa da região, luvas e um sapato bom para caminhar.',
          ],
        },
        {
          titulo: 'Calor e revisão',
          paragrafos: [
            'Dentro do carro tudo esquenta muito. Ponha só o que aguenta calor e troque a água e a comida do kit mais vezes do que as de casa.',
            'Antes de viagem, confira óleo, água e pressão dos pneus, inclusive do estepe. Peça ao mecânico para olhar bateria, freios, luzes e pisca-alerta e o limpador do para-brisa.',
          ],
        },
        {
          titulo: 'No caminho',
          passos: [
            'Rua alagada: não passe. 15 centímetros de água já podem fazer o carro perder o controle ou morrer o motor.',
            'Se ficar difícil controlar o carro, encoste, pare e puxe o freio de mão.',
            'Se um fio de energia cair em cima do carro, fique dentro até alguém treinado tirar o fio.',
          ],
        },
      ],
      erros: [
        'Andar com o tanque quase vazio e deixar para abastecer quando o alerta chegar.',
        'Esquecer o estepe vazio ou sem calibrar.',
        'Deixar a mesma água no porta-malas por meses no calor.',
        'Atravessar rua alagada achando que o carro passa.',
      ],
      teste: [
        {
          pergunta: 'Como deve ficar o tanque de combustível no dia a dia?',
          opcoes: ['Sempre pelo menos pela metade', 'Só na reserva', 'Tanto faz'],
          correta: 0,
          explicacao: 'Com meio tanque ou mais, dá para sair às pressas mesmo se os postos pararem por falta de energia.',
        },
        {
          pergunta: 'Por que trocar a água do kit do carro mais vezes?',
          opcoes: ['Porque dentro do carro tudo esquenta muito', 'Porque a água fica salgada', 'Não precisa trocar'],
          correta: 0,
          explicacao: 'O carro fica muito quente no sol. Troque a água e a comida do kit mais vezes do que as de casa.',
        },
        {
          pergunta: 'Um fio de energia caiu em cima do carro. O que fazer?',
          opcoes: ['Sair correndo do carro', 'Ficar dentro até alguém treinado tirar o fio', 'Tirar o fio com a mão'],
          correta: 1,
          explicacao: 'O fio pode estar com energia. Fique dentro e espere alguém treinado tirar o fio.',
        },
      ],
      fontes: ['Ready.gov (FEMA): Car Safety', 'Utah Division of Emergency Management: Vehicle Emergency Kit'],
    },
    {
      id: 'mecanica-ferramentas',
      nivel: 'avancado',
      titulo: 'Caixa de ferramentas e consertos de emergência',
      objetivo: 'Ter as ferramentas certas em casa e resolver cano rachado e carro sem bateria até o conserto definitivo.',
      minutos: 6,
      cenas: [
        {
          titulo: 'Monte sua caixa',
          texto: 'Chaves de fenda, alicate, martelo, chave inglesa e fitas.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'chave-fenda', x: 50, y: 24, largura: 62, movimento: 'deslizar', vindoDe: [-60, 0] },
              { desenho: 'alicate', x: 44, y: 50, largura: 52, movimento: 'deslizar', vindoDe: [60, 0], atraso: 0.5 },
              { desenho: 'chave-inglesa', x: 54, y: 76, largura: 56, movimento: 'deslizar', vindoDe: [-60, 0], atraso: 1 },
            ],
          },
        },
        {
          titulo: 'Cano rachado',
          texto: 'Seque, enrole fita larga bem esticada e prenda com abraçadeira.',
          segundos: 7,
          desenho: {
            pecas: [
              { desenho: 'fita-larga', x: 50, y: 44, largura: 70, movimento: 'entrar' },
              { desenho: 'gota', x: 82, y: 22, largura: 12, movimento: 'pingar' },
            ],
            rotulos: [{ texto: 'ATÉ TROCAR O CANO', x: 50, y: 84, tamanho: 7, atraso: 1.2, destaque: true }],
          },
        },
        {
          titulo: 'Carro sem bateria',
          texto: 'Vermelho no mais das duas baterias. Preto no menos da boa e no metal do carro parado.',
          segundos: 8,
          desenho: {
            pecas: [{ desenho: 'bateria', x: 50, y: 42, largura: 64, movimento: 'entrar' }],
            rotulos: [
              { texto: 'VERMELHO: + e +', x: 50, y: 76, tamanho: 6.5, atraso: 1 },
              { texto: 'PRETO: − e metal', x: 50, y: 88, tamanho: 6.5, atraso: 1.6, destaque: true },
            ],
          },
        },
      ],
      partes: [
        {
          titulo: 'A caixa de ferramentas',
          passos: [
            'Chave de fenda e Philips, alicate, martelo e chave inglesa.',
            'Fita isolante, fita larga (silver tape), fita veda-rosca e abraçadeiras de plástico.',
            'Arame, pregos, parafusos, cola epóxi e silicone.',
            'Lima ou pedra de amolar para faca, facão e enxada.',
          ],
        },
        {
          titulo: 'Cano rachado',
          passos: [
            'Feche o registro e seque bem o cano.',
            'Enrole fita larga bem esticada, passando alguns centímetros dos dois lados da rachadura.',
            'Prenda as pontas com abraçadeira.',
            'É um conserto provisório: troque o pedaço de cano assim que puder.',
          ],
        },
        {
          titulo: 'Carro sem bateria (chupeta)',
          passos: [
            'Os dois carros desligados, sem encostar um no outro.',
            'Cabo vermelho: uma ponta no + da bateria arriada, a outra no + da bateria boa.',
            'Cabo preto: uma ponta no − da bateria boa, a outra numa parte de metal sem pintura do carro parado, longe da bateria.',
            'Ligue o carro bom, espere alguns minutos e tente ligar o outro.',
            'Tire os cabos na ordem contrária. Em época de alerta, mantenha o tanque pela metade.',
          ],
        },
      ],
      erros: [
        'Usar fita crepe em cano rachado: ela solta com a água.',
        'Encostar as pontas dos cabos uma na outra durante a chupeta.',
        'Ligar o cabo preto no − da bateria arriada, perto dos gases dela.',
      ],
      teste: [
        {
          pergunta: 'O que fazer primeiro com um cano rachado?',
          opcoes: ['Fechar o registro e secar o cano', 'Passar fita molhado mesmo', 'Bater no cano'],
          correta: 0,
          explicacao: 'A fita só gruda no cano seco e sem água correndo.',
        },
        {
          pergunta: 'Na chupeta, onde vai o cabo vermelho?',
          opcoes: ['No + das duas baterias', 'No − das duas baterias', 'Em qualquer lugar'],
          correta: 0,
          explicacao: 'Vermelho liga os dois polos positivos (+).',
        },
        {
          pergunta: 'Onde prender a última ponta do cabo preto?',
          opcoes: ['No − da bateria arriada', 'Numa parte de metal sem pintura do carro parado', 'No para-choque de plástico'],
          correta: 1,
          explicacao: 'Longe da bateria arriada, para evitar faísca perto dos gases dela.',
        },
      ],
      fontes: ['Manual do proprietário do carro: partida com cabos auxiliares'],
    },
  ],
}
