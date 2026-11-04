import { Preferences } from '@capacitor/preferences'
import { ehItemMochila } from '../domain/conteudo/mochila'
import { PREFERENCIAS_PADRAO, ehTamanhoTexto, type Preferencias } from '../domain/entidades/preferencias'
import type { RepositorioPreferencias } from '../application/portas/RepositorioPreferencias'

const CHAVE = 'reserva:preferencias:v1'

export function normalizarPreferencias(bruto: string | null): Preferencias {
  try {
    const dados: unknown = bruto ? JSON.parse(bruto) : null
    const registro = typeof dados === 'object' && dados !== null ? (dados as Record<string, unknown>) : {}
    const tamanho = registro.tamanhoTexto
    const mochila = Array.isArray(registro.mochila) ? [...new Set(registro.mochila.filter(ehItemMochila))] : []
    return { tamanhoTexto: ehTamanhoTexto(tamanho) ? tamanho : PREFERENCIAS_PADRAO.tamanhoTexto, mochila }
  } catch {
    return { ...PREFERENCIAS_PADRAO, mochila: [] }
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
