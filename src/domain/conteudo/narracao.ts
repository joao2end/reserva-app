import type { LicaoCurso, ModuloCurso } from './cursos/tipos'

export type TipoTrecho = 'abertura' | 'cena' | 'encerramento'

export interface TrechoNarrado {
  tipo: TipoTrecho
  indiceCena?: number
  fala: string
  minimoSegundos: number
}

export const VOZ_NARRACAO = 'Voz sintética Piper (faber, dados CC0)'

const SIGLAS = ['SBV', 'DR', 'PVC', 'NBR', 'RCP', 'PET', 'ABNT']

const TROCAS: [RegExp, string][] = [
  [/(\d)\.(\d{3})\b/g, '$1$2'],
  [/×/g, ' vezes '],
  [/→/g, ', '],
  [/~\s?/g, 'cerca de '],
  [/\b1\s?L\b/g, '1 litro'],
  [/\b1\s?h\b/g, '1 hora'],
  [/\b1\s?min\b/g, '1 minuto'],
  [/(\d)\s?mm²/g, '$1 milímetros quadrados'],
  [/(\d)\s?m²/g, '$1 metros quadrados'],
  [/(\d)\s?km\/h\b/g, '$1 quilômetros por hora'],
  [/(\d)\s?cm\b/g, '$1 centímetros'],
  [/(\d)\s?mA\b/g, '$1 miliampères'],
  [/(\d)\s?mm\b/g, '$1 milímetros'],
  [/(\d)\s?kg\b/g, '$1 quilos'],
  [/(\d)\s?ml\b/gi, '$1 mililitros'],
  [/(\d)\s?L\b/g, '$1 litros'],
  [/(\d)\s?A\b/g, '$1 ampères'],
  [/(\d)\s?V\b/g, '$1 volts'],
  [/(\d)\s?W\b/g, '$1 watts'],
  [/(\d)\s?g\b/g, '$1 gramas'],
  [/(\d)\s?m\b/g, '$1 metros'],
  [/(\d)\s?h\b/g, '$1 horas'],
  [/(\d)\s?min\b/g, '$1 minutos'],
  [/(\d)\s?°C/g, '$1 graus'],
  [/(\d)\s?%/g, '$1 por cento'],
  [/\b1º/g, 'primeiro'],
  [/\b2º/g, 'segundo'],
  [/\b3º/g, 'terceiro'],
  [/\b1ª/g, 'primeira'],
  [/\b2ª/g, 'segunda'],
  [/\bC(\d)\b/g, 'C $1'],
  [/\s*\/\s*/g, ' ou '],
  [/\s+/g, ' '],
]

export function paraFala(texto: string): string {
  const comSiglas = SIGLAS.reduce(
    (frase, sigla) => frase.replace(new RegExp(`\\b${sigla}\\b`, 'g'), sigla.split('').join(' ')),
    texto,
  )
  const comTelefones = comSiglas.replace(/\b(19[0-9])\b/g, (numero) => numero.split('').join(' '))
  return TROCAS.reduce((frase, [padrao, troca]) => frase.replace(padrao, troca), comTelefones).trim()
}

function frase(texto: string): string {
  const limpo = texto.trim()
  return /[.!?:]$/.test(limpo) ? limpo : `${limpo}.`
}

export function roteiroDaLicao(licao: LicaoCurso, curso: ModuloCurso): TrechoNarrado[] {
  return [
    { tipo: 'abertura', fala: paraFala(`${curso.titulo}. ${frase(licao.titulo)} ${frase(licao.objetivo)}`), minimoSegundos: 5 },
    ...licao.cenas.map((cena, indiceCena) => ({
      tipo: 'cena' as const,
      indiceCena,
      fala: paraFala(`${frase(cena.titulo)} ${frase(cena.texto)}`),
      minimoSegundos: cena.segundos,
    })),
    {
      tipo: 'encerramento',
      fala: 'Agora é com você. Veja o passo a passo completo e faça o teste rápido no aplicativo.',
      minimoSegundos: 5,
    },
  ]
}
