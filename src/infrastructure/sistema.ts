import type { GeradorDeId, Relogio } from '../application/portas/Relogio'

export const relogioDoSistema: Relogio = {
  agora: () => new Date(),
}

export const geradorAleatorio: GeradorDeId = {
  novo: () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
}
