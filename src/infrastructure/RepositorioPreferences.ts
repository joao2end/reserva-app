import { Preferences } from '@capacitor/preferences'
import type { EstadoEstoque } from '../domain/entidades/tipos'
import type { RepositorioEstoque } from '../application/portas/RepositorioEstoque'
import { normalizarEstado } from './normalizarEstado'

const CHAVE = 'reserva:estado:v1'

export class RepositorioPreferences implements RepositorioEstoque {
  private cache: EstadoEstoque | null = null

  async carregar(): Promise<EstadoEstoque> {
    if (this.cache) return this.cache
    const { value } = await Preferences.get({ key: CHAVE })
    this.cache = normalizarEstado(value)
    return this.cache
  }

  async salvar(estado: EstadoEstoque): Promise<void> {
    this.cache = estado
    await Preferences.set({ key: CHAVE, value: JSON.stringify(estado) })
  }
}
