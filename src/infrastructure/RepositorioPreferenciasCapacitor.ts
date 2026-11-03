import { Preferences } from '@capacitor/preferences'
import { PREFERENCIAS_PADRAO, ehTamanhoTexto, type Preferencias } from '../domain/entidades/preferencias'
import type { RepositorioPreferencias } from '../application/portas/RepositorioPreferencias'

const CHAVE = 'reserva:preferencias:v1'

export function normalizarPreferencias(bruto: string | null): Preferencias {
  try {
    const dados: unknown = bruto ? JSON.parse(bruto) : null
    const tamanho = typeof dados === 'object' && dados !== null ? (dados as Record<string, unknown>).tamanhoTexto : null
    return { tamanhoTexto: ehTamanhoTexto(tamanho) ? tamanho : PREFERENCIAS_PADRAO.tamanhoTexto }
  } catch {
    return { ...PREFERENCIAS_PADRAO }
  }
}

export class RepositorioPreferenciasCapacitor implements RepositorioPreferencias {
  async carregar(): Promise<Preferencias> {
    const { value } = await Preferences.get({ key: CHAVE })
    return normalizarPreferencias(value)
  }

  async salvar(preferencias: Preferencias): Promise<void> {
    await Preferences.set({ key: CHAVE, value: JSON.stringify(preferencias) })
  }
}
