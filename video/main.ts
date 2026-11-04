import { createApp } from 'vue'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import Filme from './Filme.vue'

interface DadosFilme {
  licaoId: string
  duracoes: number[]
}

declare global {
  interface Window {
    __dados?: DadosFilme
    pronto?: boolean
  }
}

const parametros = new URLSearchParams(location.search)
const dados: DadosFilme = window.__dados ?? {
  licaoId: parametros.get('licao') ?? 'eletrica-seguranca',
  duracoes: (parametros.get('duracoes') ?? '').split(',').filter(Boolean).map(Number),
}

createApp(Filme, { ...dados }).mount('#filme')
