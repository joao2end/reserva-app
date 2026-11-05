import type { DesenhoId } from '../domain/conteudo/desenho'

export interface Desenho {
  largura: number
  altura: number
  svg: string
}

const raiosLuz = (cx: number, cy: number, r1: number, r2: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const angulo = (i * Math.PI) / 4
    const x1 = cx + Math.cos(angulo) * r1
    const y1 = cy + Math.sin(angulo) * r1
    const x2 = cx + Math.cos(angulo) * r2
    const y2 = cy + Math.sin(angulo) * r2
    return `<line class="t" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`
  }).join('')

const raios = (cx: number, cy: number, total: number, r: number, comprimento: number) =>
  Array.from({ length: total }, (_, i) => {
    const angulo = (i * 2 * Math.PI) / total
    return `<line class="t fino" x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(angulo) * r).toFixed(1)}" y2="${(cy + Math.sin(angulo) * r).toFixed(1)}"/>`
  })
    .join('')
    .concat(`<circle class="t" cx="${cx}" cy="${cy}" r="${r}"/><circle class="t" cx="${cx}" cy="${cy}" r="${r + comprimento}"/>`)

const fio = (classe: string, letra: string) => ({
  largura: 120,
  altura: 40,
  svg: `<path class="fio-capa ${classe}" d="M6 20 H96"/>${classe === 'terra' ? '<path class="fio-capa terra-listra" d="M6 20 H96"/>' : ''}<path class="t fino" d="M6 13 H96 M6 27 H96"/><path class="cobre" d="M96 20 H116"/><text class="letra" x="51" y="27">${letra}</text>`,
})

export const DESENHO: Record<DesenhoId, Desenho> = {
  quadro: {
    largura: 100,
    altura: 120,
    svg: `<rect class="r" x="4" y="4" width="92" height="112" rx="6"/><rect class="c" x="14" y="22" width="72" height="62" rx="3"/>
      ${[0, 1, 2, 3].map((i) => `<g class="${i === 0 ? 'alavanca' : ''}" style="transform-origin:${23 + i * 18}px 53px"><rect class="c" x="${17 + i * 18}" y="30" width="12" height="46" rx="2"/><rect class="f" x="${19 + i * 18}" y="34" width="8" height="16" rx="1"/></g>`).join('')}
      <text class="letra-p" x="50" y="104">QUADRO DE LUZ</text>`,
  },
  disjuntor: {
    largura: 60,
    altura: 100,
    svg: `<rect class="c" x="8" y="6" width="44" height="88" rx="4"/><text class="letra-p" x="30" y="22">LIGA</text><text class="letra-p" x="30" y="88">DESL.</text>
      <rect class="r" x="20" y="30" width="20" height="40" rx="3"/><g class="alavanca" style="transform-origin:30px 50px"><rect class="f" x="22" y="30" width="16" height="22" rx="3"/></g>`,
  },
  dr: {
    largura: 80,
    altura: 100,
    svg: `<rect class="c" x="6" y="6" width="68" height="88" rx="4"/><rect class="r" x="16" y="18" width="18" height="34" rx="3"/><rect class="f" x="18" y="20" width="14" height="14" rx="2"/>
      <circle class="c" cx="56" cy="30" r="9"/><text class="letra" x="56" y="35">T</text><text class="letra" x="40" y="74">DR</text><text class="letra-p" x="40" y="86">30 mA</text>`,
  },
  'chave-teste': {
    largura: 36,
    altura: 120,
    svg: `<g class="luz"><circle class="brilho" cx="18" cy="30" r="16"/></g><rect class="c" x="9" y="8" width="18" height="58" rx="8"/><circle class="r" cx="18" cy="30" r="5"/>
      <path class="c" d="M14 66 H22 V108 L18 116 L14 108 Z"/><rect class="f" x="14" y="10" width="8" height="5" rx="2"/>`,
  },
  tomada: {
    largura: 100,
    altura: 100,
    svg: `<rect class="c" x="6" y="6" width="88" height="88" rx="10"/><path class="r" d="M50 20 L74 33 V67 L50 80 L26 67 V33 Z"/>
      <circle class="f" cx="38" cy="50" r="5"/><circle class="f" cx="62" cy="50" r="5"/><circle class="f" cx="50" cy="64" r="5"/>`,
  },
  plugue: {
    largura: 80,
    altura: 110,
    svg: `<path class="t" d="M40 76 C40 90 40 100 40 108"/><rect class="c" x="14" y="30" width="52" height="48" rx="12"/>
      <rect class="f" x="25" y="8" width="7" height="24" rx="3"/><rect class="f" x="48" y="8" width="7" height="24" rx="3"/><rect class="f" x="36.5" y="14" width="7" height="18" rx="3"/>`,
  },
  interruptor: {
    largura: 70,
    altura: 100,
    svg: `<rect class="c" x="5" y="5" width="60" height="90" rx="8"/><rect class="r" x="20" y="22" width="30" height="56" rx="4"/>
      <g class="alavanca" style="transform-origin:35px 50px"><path class="f" d="M23 26 H47 V50 H23 Z"/></g>`,
  },
  lampada: {
    largura: 80,
    altura: 110,
    svg: `<g class="luz">${raiosLuz(40, 38, 36, 44)}</g><path class="c" d="M40 6 C58 6 70 20 70 36 C70 50 58 58 56 72 H24 C22 58 10 50 10 36 C10 20 22 6 40 6 Z"/>
      <path class="t fino" d="M32 72 L34 46 L40 52 L46 46 L48 72"/><rect class="r" x="24" y="72" width="32" height="10"/><rect class="r" x="26" y="82" width="28" height="10"/><path class="f" d="M32 92 H48 L44 100 H36 Z"/>`,
  },
  bocal: {
    largura: 90,
    altura: 100,
    svg: `<rect class="r" x="22" y="10" width="46" height="60" rx="6"/><path class="t fino" d="M26 30 H64 M26 42 H64 M26 54 H64"/><circle class="f" cx="45" cy="74" r="6"/>
      <path class="fio-capa fase" d="M45 80 V96"/><path class="fio-capa neutro" d="M22 40 H4"/>`,
  },
  'fio-fase': fio('fase', 'F'),
  'fio-neutro': fio('neutro', 'N'),
  'fio-terra': fio('terra', 'T'),
  'fio-retorno': fio('retorno', 'R'),
  alicate: {
    largura: 120,
    altura: 70,
    svg: `<path class="c" d="M8 30 L50 32 L56 26 L8 22 Z"/><path class="c" d="M8 40 L50 38 L56 44 L8 48 Z"/><circle class="c" cx="60" cy="35" r="8"/>
      <path class="r" d="M66 30 C84 22 100 14 114 10 L116 18 C102 24 86 32 70 38 Z"/><path class="r" d="M66 40 C84 48 100 56 114 60 L116 52 C102 46 86 38 70 32 Z"/>`,
  },
  'chave-fenda': {
    largura: 130,
    altura: 30,
    svg: `<rect class="r" x="4" y="5" width="50" height="20" rx="8"/><path class="t fino" d="M14 9 V21 M24 9 V21 M34 9 V21 M44 9 V21"/><rect class="c" x="54" y="11" width="62" height="8"/><path class="f" d="M116 10 H126 V20 H116 Z"/>`,
  },
  emenda: {
    largura: 140,
    altura: 50,
    svg: `<path class="fio-capa fase" d="M4 25 H44"/><path class="fio-capa fase" d="M136 25 H96"/>
      <path class="cobre" d="M44 25 C52 15 58 35 66 25 C74 15 80 35 88 25 C92 20 94 25 96 25"/><path class="cobre" d="M44 25 C52 35 58 15 66 25 C74 35 80 15 88 25"/>
      <g class="fita"><rect class="f" x="40" y="12" width="60" height="26" rx="5"/><path class="t-p fino" d="M52 12 V38 M64 12 V38 M76 12 V38 M88 12 V38"/></g>`,
  },
  'fita-isolante': {
    largura: 90,
    altura: 90,
    svg: `<circle class="f" cx="45" cy="45" r="40"/><circle class="c" cx="45" cy="45" r="20"/><path class="f" d="M85 45 H100 V55 H84 Z"/>`,
  },
  'caixa-parede': {
    largura: 100,
    altura: 110,
    svg: `<rect class="r" x="18" y="10" width="64" height="90" rx="3"/><rect class="c" x="26" y="18" width="48" height="74" rx="2"/><circle class="f" cx="50" cy="26" r="3"/><circle class="f" cx="50" cy="84" r="3"/>
      <path class="fio-capa fase" d="M40 110 C40 80 36 60 40 50"/><path class="fio-capa neutro" d="M50 110 C50 80 50 62 50 52"/><path class="fio-capa terra" d="M60 110 C60 80 64 60 60 50"/><path class="fio-capa terra-listra" d="M60 110 C60 80 64 60 60 50"/>`,
  },
  chuveiro: {
    largura: 100,
    altura: 110,
    svg: `<path class="t" d="M8 10 H40 V26"/><path class="c" d="M18 26 H62 C70 26 76 32 76 40 V44 H4 V40 C4 32 10 26 18 26 Z"/>
      <path class="fio-capa fase" d="M60 26 V8 H96"/><path class="fio-capa neutro" d="M66 28 V14 H96"/>
      ${[12, 24, 36, 48, 60, 70].map((x, i) => `<path class="gota-cai" style="animation-delay:${(i * 0.17).toFixed(2)}s" d="M${x} 52 q3 6 0 9 q-3 -3 0 -9 Z"/>`).join('')}`,
  },
  'planta-casa': {
    largura: 140,
    altura: 110,
    svg: `<rect class="c grosso" x="4" y="4" width="132" height="102"/><path class="t" d="M70 4 V60 M4 60 H136 M56 60 V106 M96 60 V106"/>
      <text class="letra-p" x="37" y="34">SALA</text><text class="letra-p" x="103" y="34">QUARTO</text><text class="letra-p" x="30" y="96">COZINHA</text><text class="letra-p" x="76" y="96">BANHO</text><text class="letra-p" x="116" y="96">QUARTO</text>
      <rect class="f" x="58" y="64" width="24" height="12"/>
      <path class="traco circuito" d="M66 64 V44 H30"/><path class="traco circuito" style="animation-delay:.5s" d="M74 64 V44 H110"/><path class="traco circuito" style="animation-delay:1s" d="M60 72 H30 V84"/><path class="traco circuito" style="animation-delay:1.5s" d="M70 76 V84"/><path class="traco circuito" style="animation-delay:2s" d="M82 70 H116 V84"/>`,
  },
  bitolas: {
    largura: 164,
    altura: 82,
    svg: `${[
      [18, 11, '1,5'],
      [56, 14, '2,5'],
      [98, 17, '4'],
      [140, 20, '6'],
    ]
      .map(([x, r, t]) => `<circle class="f" cx="${x}" cy="26" r="${r}"/><circle class="cobre-cheio" cx="${x}" cy="26" r="${Number(r) - 4}"/><text class="letra" style="font-size:15px" x="${x}" y="66">${t}</text><text class="letra-p" x="${x}" y="78">mm²</text>`)
      .join('')}`,
  },
  raio: {
    largura: 100,
    altura: 90,
    svg: `<path class="c grosso" d="M50 6 L96 84 H4 Z"/><path class="f" d="M54 26 L36 58 H50 L44 76 L66 44 H52 Z"/>`,
  },
  mao: {
    largura: 90,
    altura: 110,
    svg: `<path class="c" d="M30 106 C20 92 12 78 10 66 C8 58 16 54 22 60 L30 70 V20 C30 12 42 12 42 20 V52 V40 C42 32 54 32 54 40 V54 V44 C54 36 66 36 66 44 V58 V50 C66 42 78 42 78 50 V76 C78 92 70 100 66 106 Z"/>`,
  },
  torneira: {
    largura: 120,
    altura: 100,
    svg: `<rect class="r" x="2" y="30" width="18" height="30" rx="2"/><path class="c" d="M20 36 H70 C88 36 96 46 96 60 V70 H82 V62 C82 54 78 52 70 52 H20 Z"/>
      <rect class="c" x="40" y="22" width="14" height="14"/><g class="manopla" style="transform-origin:47px 16px"><path class="c" d="M26 12 H68 V20 H26 Z"/><circle class="f" cx="47" cy="16" r="4"/></g>
      <path class="gota-cai" d="M89 74 q5 9 0 13 q-5 -4 0 -13 Z"/>`,
  },
  gota: {
    largura: 60,
    altura: 80,
    svg: `<path class="c" d="M30 6 C40 26 54 40 54 54 C54 68 43 76 30 76 C17 76 6 68 6 54 C6 40 20 26 30 6 Z"/><path class="t fino" d="M18 56 C18 64 24 68 30 68"/>`,
  },
  registro: {
    largura: 120,
    altura: 80,
    svg: `<rect class="r" x="4" y="44" width="112" height="20"/><rect class="c" x="44" y="36" width="32" height="36" rx="4"/><rect class="c" x="55" y="22" width="10" height="14"/>
      <g class="manopla" style="transform-origin:60px 16px"><ellipse class="c" cx="60" cy="16" rx="26" ry="10"/><circle class="f" cx="60" cy="16" r="4"/></g>`,
  },
  'chave-inglesa': {
    largura: 140,
    altura: 60,
    svg: `<path class="c" d="M40 22 H128 C134 22 136 26 136 30 C136 34 134 38 128 38 H40 Z"/>
      <path class="c" d="M6 8 H34 L44 18 V42 L34 52 H6 V40 H26 V20 H6 Z"/><path class="t fino" d="M60 30 H84"/><circle class="t fino" cx="122" cy="30" r="4"/>`,
  },
  vedante: {
    largura: 80,
    altura: 80,
    svg: `<circle class="f" cx="40" cy="40" r="34"/><circle class="c" cx="40" cy="40" r="12"/><path class="t-p fino" d="M18 26 C24 18 32 14 40 14"/>`,
  },
  rosca: {
    largura: 140,
    altura: 70,
    svg: `<rect class="r" x="4" y="18" width="70" height="34"/><rect class="c" x="74" y="22" width="56" height="26"/>
      ${[80, 88, 96, 104, 112, 120].map((x) => `<path class="t fino" d="M${x} 22 L${x + 6} 48"/>`).join('')}
      <path class="traco fita-rosca" d="M80 21 L86 49 M88 21 L94 49 M96 21 L102 49 M104 21 L110 49 M112 21 L118 49"/>
      <path class="t" d="M100 64 C116 64 126 60 132 56"/><path class="f" d="M134 50 L136 60 L126 58 Z"/>`,
  },
  'veda-rosca': {
    largura: 90,
    altura: 70,
    svg: `<ellipse class="c" cx="40" cy="35" rx="34" ry="30"/><ellipse class="r" cx="40" cy="35" rx="14" ry="12"/><path class="c" d="M74 35 H88 V44 H72 Z"/>`,
  },
  'pia-sifao': {
    largura: 130,
    altura: 130,
    svg: `<path class="c" d="M4 10 H126 V22 H4 Z"/><path class="c" d="M26 22 H104 L96 52 H34 Z"/><rect class="f" x="60" y="52" width="10" height="14"/>
      <path class="r" d="M58 66 H72 V92 C72 104 88 104 88 92 V80 H120 V92 H100 C100 116 58 120 58 92 Z"/>
      <path class="t fino" d="M56 70 H74 M56 76 H74"/>`,
  },
  desentupidor: {
    largura: 70,
    altura: 130,
    svg: `<rect class="r" x="30" y="4" width="10" height="84" rx="4"/><path class="f" d="M8 124 C8 98 20 88 35 88 C50 88 62 98 62 124 Z"/>`,
  },
  balde: {
    largura: 100,
    altura: 90,
    svg: `<path class="t" d="M14 24 C14 -2 86 -2 86 24"/><path class="c" d="M10 24 H90 L80 86 H20 Z"/><path class="t fino" d="M14 38 H86"/>`,
  },
  'caixa-dagua': {
    largura: 130,
    altura: 110,
    svg: `<path class="c" d="M14 26 H116 L108 104 H22 Z"/><path class="c" d="M8 14 C40 4 90 4 122 14 V26 H8 Z"/><path class="agua" d="M18 52 H112 L108 100 H22 Z"/>
      <path class="t fino" d="M40 30 V46 H70"/><circle class="c" cx="78" cy="48" r="8"/><path class="t" d="M116 34 H128"/>`,
  },
  'roda-bike': {
    largura: 110,
    altura: 110,
    svg: `<g class="gira-dentro" style="transform-origin:55px 55px">${raios(55, 55, 16, 44, 6)}<circle class="f" cx="55" cy="55" r="6"/></g><circle class="t grosso" cx="55" cy="55" r="50"/>`,
  },
  camara: {
    largura: 140,
    altura: 90,
    svg: `<ellipse class="t camara-tubo" cx="70" cy="45" rx="62" ry="34"/><ellipse class="t fino" cx="70" cy="45" rx="62" ry="34"/>
      <rect class="f" x="66" y="76" width="8" height="12"/><circle class="f" cx="122" cy="34" r="3"/>
      ${[0, 1, 2].map((i) => `<circle class="bolha-sobe" style="animation-delay:${i * 0.5}s" cx="${124 + i * 4}" cy="26" r="${3 + i}"/>`).join('')}`,
  },
  remendo: {
    largura: 80,
    altura: 80,
    svg: `<rect class="f" x="8" y="8" width="64" height="64" rx="14"/><rect class="r" x="20" y="20" width="40" height="40" rx="8"/>`,
  },
  lixa: {
    largura: 90,
    altura: 70,
    svg: `<rect class="r" x="6" y="8" width="78" height="54" rx="4"/>${Array.from({ length: 30 }, (_, i) => `<circle class="f" cx="${14 + (i % 10) * 7}" cy="${18 + Math.floor(i / 10) * 16 + (i % 2) * 5}" r="1.6"/>`).join('')}`,
  },
  espatula: {
    largura: 130,
    altura: 40,
    svg: `<path class="c" d="M6 14 H104 C112 14 118 8 124 8 V20 C118 22 112 26 104 26 H6 C4 26 2 24 2 20 C2 16 4 14 6 14 Z"/><circle class="t fino" cx="16" cy="20" r="4"/>`,
  },
  'bomba-ar': {
    largura: 80,
    altura: 130,
    svg: `<g class="empurra-dentro"><rect class="c" x="16" y="6" width="48" height="10" rx="4"/><rect class="r" x="36" y="16" width="8" height="40"/></g>
      <rect class="c" x="28" y="40" width="24" height="76" rx="4"/><path class="c" d="M10 116 H70 V124 H10 Z"/><path class="t" d="M52 100 C70 100 76 80 76 60"/><circle class="c" cx="40" cy="70" r="8"/>`,
  },
  'bacia-agua': {
    largura: 140,
    altura: 70,
    svg: `<path class="agua" d="M10 24 H130 L118 64 H22 Z"/><path class="t" d="M6 20 H134 L120 66 H20 Z"/><path class="t fino onda" d="M20 34 C30 30 40 38 50 34 C60 30 70 38 80 34 C90 30 100 38 110 34 C116 32 120 34 122 34"/>`,
  },
  carro: {
    largura: 160,
    altura: 80,
    svg: `<path class="c" d="M8 54 V40 C8 34 12 32 18 31 L40 28 L58 12 C62 8 66 8 72 8 H106 C112 8 116 10 120 14 L136 30 L148 32 C154 34 156 38 156 44 V54 Z"/>
      <path class="r" d="M62 14 H86 V30 H46 Z"/><path class="r" d="M92 14 H108 L124 30 H92 Z"/><circle class="c" cx="40" cy="58" r="16"/><circle class="f" cx="40" cy="58" r="6"/><circle class="c" cx="124" cy="58" r="16"/><circle class="f" cx="124" cy="58" r="6"/>`,
  },
  macaco: {
    largura: 100,
    altura: 90,
    svg: `<path class="c" d="M10 82 H90 V88 H10 Z"/><path class="t grosso" d="M30 82 L50 50 L70 82 M30 18 L50 50 L70 18"/><rect class="c" x="24" y="8" width="52" height="12" rx="2"/><path class="t" d="M50 50 H96"/><circle class="f" cx="50" cy="50" r="5"/>`,
  },
  'chave-roda': {
    largura: 110,
    altura: 110,
    svg: `<path class="t grosso" d="M10 55 H100 M55 10 V100"/><rect class="c" x="2" y="47" width="16" height="16" rx="3"/><rect class="c" x="92" y="47" width="16" height="16" rx="3"/><rect class="c" x="47" y="2" width="16" height="16" rx="3"/><rect class="c" x="47" y="92" width="16" height="16" rx="3"/>`,
  },
  'roda-porcas': {
    largura: 110,
    altura: 110,
    svg: `<circle class="f" cx="55" cy="55" r="52"/><circle class="c" cx="55" cy="55" r="34"/><circle class="r" cx="55" cy="55" r="10"/>
      ${[
        [55, 31, '1'],
        [79, 55, '3'],
        [55, 79, '2'],
        [31, 55, '4'],
      ]
        .map(([x, y, n], i) => `<g class="porca" style="animation-delay:${(i * 0.6).toFixed(1)}s"><circle class="c" cx="${x}" cy="${y}" r="8"/><text class="letra-p" x="${x}" y="${Number(y) + 3.5}">${n}</text></g>`)
        .join('')}`,
  },
  'vareta-oleo': {
    largura: 60,
    altura: 140,
    svg: `<circle class="c" cx="30" cy="14" r="10"/><rect class="c" x="24" y="24" width="12" height="110" rx="3"/><rect class="f oleo" x="24" y="106" width="12" height="28" rx="3"/>
      <path class="t fino" d="M16 96 H44 M16 120 H44"/><text class="letra-p" x="52" y="99">MÁX</text><text class="letra-p" x="52" y="123">MÍN</text>`,
  },
  triangulo: {
    largura: 100,
    altura: 92,
    svg: `<path class="f" d="M50 4 L98 86 H2 Z"/><path class="p" d="M50 28 L76 74 H24 Z"/><path class="t fino" d="M36 86 L28 92 M64 86 L72 92"/>`,
  },
  canteiro: {
    largura: 160,
    altura: 70,
    svg: `<path class="r" d="M4 66 H156 V60 C130 58 120 30 110 28 H50 C40 30 30 58 4 60 Z"/><path class="t fino" d="M60 40 h4 M80 46 h4 M100 40 h4 M70 54 h4 M92 56 h4"/>
      <path class="t" d="M2 66 H158"/>`,
  },
  semente: {
    largura: 50,
    altura: 40,
    svg: `<ellipse class="f" cx="25" cy="20" rx="20" ry="14"/><path class="t-p fino" d="M14 16 C20 10 30 10 36 16"/>`,
  },
  broto: {
    largura: 80,
    altura: 100,
    svg: `<g class="cresce-dentro" style="transform-origin:40px 96px"><path class="t" d="M40 96 V40"/><path class="c" d="M40 58 C24 58 10 48 8 30 C26 30 38 40 40 58 Z"/><path class="c" d="M40 46 C56 46 70 36 72 18 C54 18 42 28 40 46 Z"/></g>`,
  },
  muda: {
    largura: 90,
    altura: 120,
    svg: `<path class="c" d="M45 70 C30 66 14 54 10 36 C28 34 40 46 45 62 Z"/><path class="c" d="M45 66 C58 58 76 50 82 30 C64 30 50 42 45 60 Z"/><path class="c" d="M45 58 C40 40 42 22 50 8 C58 22 54 42 45 58 Z"/>
      <path class="t" d="M45 70 V84"/><path class="r" d="M24 84 H66 C66 104 58 114 45 114 C32 114 24 104 24 84 Z"/>`,
  },
  regador: {
    largura: 140,
    altura: 100,
    svg: `<path class="t grosso" d="M30 30 C30 6 74 6 74 30"/><path class="c" d="M20 30 H84 V88 H20 Z"/><path class="c" d="M84 50 L124 22 L130 30 L88 64 Z"/><rect class="c" x="120" y="14" width="16" height="22" rx="3" transform="rotate(-36 128 25)"/>
      ${[0, 1, 2, 3].map((i) => `<path class="gota-cai longe" style="animation-delay:${(i * 0.22).toFixed(2)}s" d="M${130 + i * 3} 44 q3 6 0 9 q-3 -3 0 -9 Z"/>`).join('')}`,
  },
  'garrafa-gotejo': {
    largura: 80,
    altura: 140,
    svg: `<path class="c" d="M18 8 H62 V86 C62 94 52 98 46 104 V112 H34 V104 C28 98 18 94 18 86 Z"/><path class="agua" d="M21 34 H59 V86 C59 92 50 96 44 102 V108 H36 V102 C30 96 21 92 21 86 Z"/>
      <path class="r" d="M2 112 H78 V138 H2 Z"/><path class="gota-cai" d="M40 116 q3 6 0 9 q-3 -3 0 -9 Z"/>`,
  },
  palha: {
    largura: 160,
    altura: 40,
    svg: `${Array.from({ length: 22 }, (_, i) => `<path class="t fino" d="M${4 + i * 7} ${30 - (i % 3) * 6} L${18 + i * 7} ${16 + (i % 4) * 5}"/>`).join('')}<path class="t" d="M2 36 H158"/>`,
  },
  composteira: {
    largura: 120,
    altura: 110,
    svg: `<path class="c" d="M8 104 L20 20 H100 L112 104 Z"/><path class="f" d="M12 80 L14 66 H106 L108 80 Z"/><path class="r" d="M15 62 L17 48 H103 L105 62 Z"/><path class="f" d="M18 44 L19 34 H101 L102 44 Z"/>
      <text class="letra-p" x="60" y="98">TERRA</text><text class="letra-p" x="60" y="30">PALHA</text>`,
  },
  sol: {
    largura: 100,
    altura: 100,
    svg: `<g class="gira-dentro" style="transform-origin:50px 50px">${raiosLuz(50, 50, 30, 46)}</g><circle class="c grosso" cx="50" cy="50" r="22"/>`,
  },
  pessoa: {
    largura: 70,
    altura: 130,
    svg: `<circle class="c" cx="35" cy="18" r="14"/><path class="c" d="M14 40 H56 C62 40 64 44 64 50 V80 H54 V124 H40 V86 H30 V124 H16 V80 H6 V50 C6 44 8 40 14 40 Z"/>`,
  },
  eletricista: {
    largura: 80,
    altura: 130,
    svg: `<circle class="c" cx="40" cy="22" r="14"/><path class="f" d="M22 18 C22 4 58 4 58 18 H64 V22 H16 V18 Z"/><path class="c" d="M18 44 H62 C68 44 70 48 70 54 V84 H60 V126 H46 V90 H34 V126 H20 V84 H10 V54 C10 48 12 44 18 44 Z"/>
      <rect class="r" x="26" y="60" width="28" height="12"/><path class="t fino" d="M32 60 V72 M40 60 V72 M48 60 V72"/>`,
  },
  certo: {
    largura: 100,
    altura: 100,
    svg: `<circle class="f" cx="50" cy="50" r="46"/><path class="t-p grosso traco" d="M28 52 L44 68 L74 34"/>`,
  },
  errado: {
    largura: 100,
    altura: 100,
    svg: `<circle class="t grosso" cx="50" cy="50" r="44"/><path class="t grosso traco" d="M30 30 L70 70 M70 30 L30 70"/>`,
  },
  seta: {
    largura: 100,
    altura: 50,
    svg: `<path class="f" d="M4 18 H66 V4 L96 25 L66 46 V32 H4 Z"/>`,
  },
  relogio: {
    largura: 100,
    altura: 100,
    svg: `<circle class="c grosso" cx="50" cy="50" r="44"/><path class="t" d="M50 50 V24"/><g class="gira-dentro lento" style="transform-origin:50px 50px"><path class="t grosso" d="M50 50 L70 60"/></g><circle class="f" cx="50" cy="50" r="5"/>`,
  },
  galao: {
    largura: 100,
    altura: 130,
    svg: `<rect class="c" x="38" y="6" width="24" height="12" rx="3"/><path class="c" d="M30 18 H70 L76 34 H24 Z"/><rect class="c" x="12" y="34" width="76" height="90" rx="14"/>
      <path class="agua" d="M16 60 H84 V110 C84 116 80 120 74 120 H26 C20 120 16 116 16 110 Z"/><path class="t fino onda" d="M16 60 C30 54 44 66 58 60 C68 56 78 60 84 60"/><path class="t fino" d="M12 80 H88 M12 100 H88"/>`,
  },
  'garrafa-pet': {
    largura: 50,
    altura: 130,
    svg: `<rect class="f" x="17" y="4" width="16" height="10" rx="2"/><path class="c" d="M19 14 H31 V24 C40 32 44 40 44 50 V118 C44 124 40 126 34 126 H16 C10 126 6 124 6 118 V50 C6 40 10 32 19 24 Z"/>
      <path class="agua" d="M9 54 H41 V117 C41 121 39 123 34 123 H16 C11 123 9 121 9 117 Z"/><path class="t fino" d="M6 70 H44 M6 96 H44"/>`,
  },
  panela: {
    largura: 130,
    altura: 120,
    svg: `<g class="chama"><path class="f" d="M40 116 C30 104 38 96 44 88 C46 98 52 98 52 92 C58 100 62 108 56 116 Z"/><path class="f" d="M74 116 C64 104 72 96 78 88 C80 98 86 98 86 92 C92 100 96 108 90 116 Z"/></g>
      <path class="c" d="M14 36 H116 V74 C116 82 110 86 102 86 H28 C20 86 14 82 14 74 Z"/><path class="t" d="M4 40 H14 M116 40 H126"/><path class="agua" d="M18 46 H112 V72 C112 78 108 82 102 82 H28 C22 82 18 78 18 72 Z"/>
      ${[30, 52, 74, 96].map((x, i) => `<circle class="bolha-sobe" style="animation-delay:${(i * 0.35).toFixed(2)}s" cx="${x}" cy="40" r="${4 + (i % 2) * 2}"/>`).join('')}`,
  },
  tampa: {
    largura: 120,
    altura: 40,
    svg: `<path class="c" d="M8 34 Q60 6 112 34 Z"/><rect class="f" x="48" y="8" width="24" height="9" rx="3"/><path class="t" d="M4 34 H116"/>`,
  },
  braseiro: {
    largura: 120,
    altura: 124,
    svg: `<path class="t fino" d="M40 26 C34 18 46 12 40 4 M64 26 C58 18 70 12 64 4 M88 26 C82 18 94 12 88 4"/>
      ${[30, 50, 70, 90].map((x, i) => `<circle class="f" cx="${x}" cy="${36 + (i % 2) * 3}" r="9"/>`).join('')}
      <path class="c" d="M8 44 H112 C112 76 90 90 60 90 C30 90 8 76 8 44 Z"/><path class="t" d="M4 44 H116"/>
      <path class="t" d="M38 86 L26 120 M82 86 L94 120 M60 90 V120"/>`,
  },
  pano: {
    largura: 110,
    altura: 70,
    svg: `<path class="c" d="M6 18 L94 8 L104 52 L16 62 Z"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path class="t fino" d="M${20 + i * 14} 15 L${28 + i * 14} 58"/>`).join('')}<path class="t" d="M6 18 L16 62"/>`,
  },
  'conta-gotas': {
    largura: 50,
    altura: 140,
    svg: `<path class="f" d="M15 6 C15 0 35 0 35 6 V34 H15 Z"/><rect class="c" x="13" y="34" width="24" height="60" rx="4"/><path class="agua" d="M16 60 H34 V90 H16 Z"/><path class="c" d="M19 94 H31 L27 116 H23 Z"/>
      <path class="gota-cai" d="M25 120 q4 7 0 11 q-4 -4 0 -11 Z"/>`,
  },
  'cisterna-casa': {
    largura: 170,
    altura: 130,
    svg: `<path class="c" d="M6 50 L56 10 L106 50 Z"/><rect class="c" x="14" y="50" width="84" height="76"/><rect class="r" x="46" y="86" width="20" height="40"/>
      <path class="t grosso" d="M100 52 H116 V72"/><path class="c" d="M110 72 H122 V110 H110 Z"/><text class="letra-p" x="116" y="122" style="font-size:7px">DESVIO</text>
      <path class="t grosso" d="M116 72 H140 V84"/><rect class="c" x="126" y="84" width="40" height="40" rx="4"/><path class="agua" d="M129 100 H163 V120 H129 Z"/>
      ${[0, 1, 2].map((i) => `<path class="gota-cai" style="animation-delay:${(i * 0.3).toFixed(1)}s" d="M${64 + i * 14} 2 q3 6 0 9 q-3 -3 0 -9 Z"/>`).join('')}`,
  },
  'pessoa-deitada': {
    largura: 170,
    altura: 60,
    svg: `<circle class="c" cx="22" cy="30" r="14"/><path class="c" d="M40 18 H120 L160 22 C166 23 166 29 160 30 L120 32 V42 H40 C36 42 36 18 40 18 Z"/><path class="t" d="M4 54 H166"/>`,
  },
  'maos-rcp': {
    largura: 110,
    altura: 110,
    svg: `<path class="t grosso" d="M42 4 L50 56 M72 4 L64 56"/><rect class="c" x="24" y="66" width="64" height="16" rx="8"/>
      <path class="c" d="M28 68 C28 54 40 50 57 50 C74 50 86 56 86 68 Z"/><path class="t fino" d="M40 68 V76 M50 68 V78 M62 68 V78 M74 68 V76"/>
      <path class="t" d="M4 100 C30 90 82 90 106 100"/>`,
  },
  telefone: {
    largura: 80,
    altura: 120,
    svg: `<rect class="c" x="14" y="6" width="52" height="108" rx="8"/><rect class="r" x="20" y="18" width="40" height="70" rx="2"/><circle class="f" cx="40" cy="100" r="5"/>
      <g class="luz"><path class="t" d="M70 30 C78 38 78 52 70 60 M76 22 C88 36 88 54 76 68"/></g>`,
  },
  bebe: {
    largura: 100,
    altura: 80,
    svg: `<circle class="c" cx="24" cy="36" r="18"/><path class="c" d="M42 28 H78 C88 28 94 34 94 40 C94 46 88 52 78 52 H42 Z"/><path class="t fino" d="M18 34 h2 M28 34 h2 M20 44 C24 46 26 46 30 44"/><path class="t" d="M2 70 H98"/>`,
  },
  braco: {
    largura: 170,
    altura: 70,
    svg: `<path class="c" d="M4 22 H110 C118 22 124 16 132 14 L156 12 C164 12 166 18 160 22 L150 26 L166 30 C168 36 164 38 156 38 L132 40 C124 40 118 48 110 48 H4 Z"/>
      <path class="f" d="M50 30 L70 28 L66 34 L48 36 Z"/>`,
  },
  pasta: {
    largura: 140,
    altura: 60,
    svg: `<path class="c" d="M10 14 H100 L120 22 V38 L100 46 H10 C6 46 4 44 4 40 V20 C4 16 6 14 10 14 Z"/><rect class="f" x="120" y="24" width="14" height="12" rx="2"/><path class="t fino" d="M14 14 V46"/>`,
  },
  copo: {
    largura: 70,
    altura: 90,
    svg: `<path class="c" d="M8 8 H62 L54 84 H16 Z"/><path class="agua" d="M13 30 H57 L52 80 H18 Z"/>`,
  },
  geladeira: {
    largura: 80,
    altura: 130,
    svg: `<rect class="c" x="6" y="4" width="68" height="122" rx="6"/><path class="t" d="M6 44 H74"/><rect class="f" x="60" y="16" width="5" height="18" rx="2"/><rect class="f" x="60" y="56" width="5" height="28" rx="2"/>
      <path class="t fino" d="M18 18 l8 8 M26 18 l-8 8 M22 16 V28 M16 22 H28"/>`,
  },
  floco: {
    largura: 100,
    altura: 100,
    svg: `<path class="t grosso" d="M50 6 V94 M12 28 L88 72 M12 72 L88 28"/><path class="t" d="M40 14 L50 24 L60 14 M40 86 L50 76 L60 86 M14 40 L26 36 L22 24 M86 60 L74 64 L78 76 M14 60 L26 64 L22 76 M86 40 L74 36 L78 24"/>`,
  },
  gerador: {
    largura: 140,
    altura: 110,
    svg: `<rect class="r" x="14" y="24" width="112" height="62" rx="8"/><rect class="c" x="26" y="36" width="54" height="38" rx="4"/><path class="t fino" d="M34 46 H72 M34 56 H72 M34 66 H72"/>
      <circle class="c" cx="104" cy="46" r="8"/><circle class="f" cx="104" cy="66" r="4"/><path class="t" d="M20 24 V12 H120 V24"/><circle class="c" cx="34" cy="96" r="10"/><circle class="c" cx="106" cy="96" r="10"/>
      <path class="t" d="M126 34 H134 V20"/>${[0, 1, 2].map((i) => `<circle class="bolha-sobe" style="animation-delay:${i * 0.5}s" cx="${134 + i * 2}" cy="14" r="${3 + i}"/>`).join('')}`,
  },
  'placa-solar': {
    largura: 140,
    altura: 110,
    svg: `<path class="c" d="M10 70 L40 10 H130 L100 70 Z"/><path class="t fino" d="M32 26 H122 M24 42 H114 M17 56 H107 M64 10 L34 70 M88 10 L58 70 M112 10 L82 70"/><path class="t" d="M70 70 V100 M50 100 H90"/>`,
  },
  lanterna: {
    largura: 130,
    altura: 70,
    svg: `<g class="luz"><path class="brilho" d="M96 20 L130 4 V66 L96 50 Z"/></g><rect class="c" x="6" y="22" width="64" height="26" rx="6"/><path class="c" d="M70 16 H96 V54 H70 Z"/><rect class="f" x="26" y="30" width="14" height="10" rx="2"/>`,
  },
  bateria: {
    largura: 140,
    altura: 100,
    svg: `<rect class="c" x="10" y="30" width="120" height="64" rx="6"/><rect class="f" x="28" y="18" width="18" height="12" rx="2"/><rect class="f" x="94" y="18" width="18" height="12" rx="2"/>
      <text class="letra" x="37" y="70">+</text><text class="letra" x="103" y="70">−</text><path class="t grosso" d="M37 18 C37 4 20 4 14 10"/><path class="t" d="M103 18 C103 4 120 4 126 10"/>`,
  },
  'fita-larga': {
    largura: 130,
    altura: 80,
    svg: `<rect class="r" x="4" y="28" width="122" height="24"/><path class="t fino" d="M4 40 H126"/><rect class="c" x="44" y="18" width="42" height="44" rx="4"/><path class="t fino" d="M50 18 V62 M58 18 V62 M66 18 V62 M74 18 V62 M80 18 V62"/>`,
  },
  'cano-furado': {
    largura: 160,
    altura: 60,
    svg: `<rect class="r" x="4" y="20" width="152" height="20"/><path class="t fino" d="M4 26 H156"/><path class="f" d="M76 22 L82 30 L78 34 L84 38 L80 40 L74 34 L78 30 Z"/>
      <rect class="f" x="50" y="8" width="4" height="44" rx="2"/><rect class="f" x="106" y="8" width="4" height="44" rx="2"/>`,
  },
  'cano-luva': {
    largura: 160,
    altura: 60,
    svg: `<rect class="r" x="4" y="22" width="152" height="16"/><path class="t fino" d="M4 27 H156"/><rect class="c" x="58" y="22" width="44" height="16"/>
      <rect class="f" x="34" y="14" width="34" height="32" rx="4"/><rect class="f" x="92" y="14" width="34" height="32" rx="4"/><path class="t fino" d="M40 14 V46 M120 14 V46"/>`,
  },
  pulgao: {
    largura: 60,
    altura: 50,
    svg: `<ellipse class="f" cx="30" cy="28" rx="18" ry="13"/><circle class="f" cx="48" cy="22" r="7"/><path class="t fino" d="M52 16 L58 6 M50 15 L52 4 M18 38 L10 46 M28 40 L24 48 M38 39 L40 48"/>`,
  },
  borrifador: {
    largura: 90,
    altura: 140,
    svg: `<path class="c" d="M30 8 H62 V20 H76 L86 28 L82 32 L70 26 H62 V36 H30 Z"/><path class="f" d="M30 22 H14 V30 H30 Z"/>
      <rect class="c" x="34" y="36" width="24" height="14"/><path class="c" d="M22 50 H70 V128 C70 134 66 136 60 136 H32 C26 136 22 134 22 128 Z"/>
      <path class="agua" d="M25 74 H67 V127 C67 131 64 133 60 133 H32 C28 133 25 131 25 127 Z"/>
      ${[0, 1, 2].map((i) => `<path class="gota-cai longe" style="animation-delay:${(i * 0.3).toFixed(2)}s" d="M${10 - i * 3} ${24 + i * 5} q3 6 0 9 q-3 -3 0 -9 Z"/>`).join('')}`,
  },
  'pessoa-quatro-apoios': {
    largura: 170,
    altura: 100,
    svg: `<circle class="c" cx="150" cy="34" r="13"/><path class="c" d="M44 28 H132 C138 28 140 32 140 38 V44 C140 50 138 54 132 54 H44 C38 54 36 50 36 44 V38 C36 32 38 28 44 28 Z"/>
      <rect class="c" x="120" y="50" width="12" height="44" rx="4"/><rect class="c" x="40" y="50" width="16" height="34" rx="4"/><rect class="c" x="10" y="80" width="46" height="14" rx="5"/><path class="t" d="M4 96 H166"/>`,
  },
  cadeira: {
    largura: 100,
    altura: 140,
    svg: `<rect class="c" x="66" y="6" width="12" height="70" rx="3"/><rect class="c" x="14" y="66" width="72" height="12" rx="3"/><path class="t grosso" d="M20 78 V134 M80 78 V134"/><path class="t" d="M20 108 H80"/>`,
  },
  'vaso-sanitario': {
    largura: 100,
    altura: 130,
    svg: `<rect class="c" x="58" y="6" width="36" height="56" rx="5"/><rect class="r" x="66" y="14" width="18" height="6" rx="2"/>
      <path class="c" d="M8 62 H94 C94 84 80 96 62 98 L66 124 H30 L34 98 C18 94 8 82 8 62 Z"/><path class="agua" d="M18 66 H84 C82 78 72 86 52 86 C32 86 22 78 18 66 Z"/><path class="t" d="M4 126 H98"/>`,
  },
  tomate: {
    largura: 110,
    altura: 110,
    svg: `<path class="t" d="M55 14 V4 M55 14 L40 8 M55 14 L70 8 M55 14 L44 22 M55 14 L66 22"/><circle class="f" cx="55" cy="62" r="44"/><circle class="c" cx="55" cy="62" r="32"/>
      <path class="t fino" d="M55 30 V94 M23 62 H87"/>${[
        [40, 48],
        [70, 48],
        [40, 76],
        [70, 76],
        [46, 56],
        [64, 70],
      ]
        .map(([x, y]) => `<ellipse class="r" cx="${x}" cy="${y}" rx="4" ry="2.6"/>`)
        .join('')}`,
  },
  'pote-sementes': {
    largura: 100,
    altura: 130,
    svg: `<rect class="f" x="22" y="6" width="56" height="18" rx="4"/><path class="c" d="M18 28 H82 V116 C82 122 78 126 72 126 H28 C22 126 18 122 18 116 Z"/>
      ${Array.from({ length: 12 }, (_, i) => `<ellipse class="r" cx="${28 + (i % 6) * 9}" cy="${112 - Math.floor(i / 6) * 8}" rx="4" ry="2.6"/>`).join('')}
      <rect class="r" x="26" y="50" width="48" height="36" rx="3"/><text class="letra-p" x="50" y="64">TOMATE</text><path class="t fino" d="M32 76 H68"/>`,
  },
  'rosto-torto': {
    largura: 120,
    altura: 130,
    svg: `<ellipse class="c" cx="60" cy="66" rx="46" ry="58"/><path class="t fino" d="M60 22 V110"/>
      <circle class="f" cx="42" cy="52" r="6"/><path class="f" d="M72 50 H86 C86 56 82 58 79 58 C76 58 72 56 72 50 Z"/>
      <path class="t" d="M58 64 L56 80 H62"/><path class="t grosso" d="M34 90 C42 98 52 98 60 96 C68 96 76 100 84 106"/>`,
  },
  'fatias-fruta': {
    largura: 140,
    altura: 100,
    svg: `${[
      [34, 40],
      [76, 34],
      [110, 58],
      [56, 72],
    ]
      .map(([x, y]) => `<circle class="f" cx="${x}" cy="${y}" r="24"/><circle class="c" cx="${x}" cy="${y}" r="18"/><circle class="r" cx="${x}" cy="${y}" r="4"/>`)
      .join('')}`,
  },
  'tela-secagem': {
    largura: 180,
    altura: 110,
    svg: `<rect class="r" x="14" y="76" width="22" height="26" rx="2"/><rect class="r" x="144" y="76" width="22" height="26" rx="2"/>
      <rect class="c" x="6" y="64" width="168" height="12" rx="3"/>${Array.from({ length: 4 }, (_, i) => `<ellipse class="f" cx="${36 + i * 36}" cy="58" rx="14" ry="6"/>`).join('')}
      <path class="t fino" d="M8 30 H172 M8 30 V64 M172 30 V64"/>${Array.from({ length: 11 }, (_, i) => `<path class="t fino" d="M${18 + i * 15} 30 V64"/>`).join('')}<path class="t" d="M2 104 H178"/>`,
  },
  'pessoa-bracos': {
    largura: 130,
    altura: 140,
    svg: `<circle class="c" cx="65" cy="22" r="14"/><path class="c" d="M48 42 H82 C88 42 90 46 90 52 V88 H80 V134 H68 V96 H62 V134 H50 V88 H40 V52 C40 46 42 42 48 42 Z"/>
      <rect class="c" x="24" y="6" width="14" height="50" rx="6" transform="rotate(-14 40 50)"/><rect class="c" x="88" y="44" width="14" height="48" rx="6" transform="rotate(-30 95 48)"/>`,
  },
}
