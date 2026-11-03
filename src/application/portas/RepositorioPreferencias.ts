import type { Preferencias } from '../../domain/entidades/preferencias'

export interface RepositorioPreferencias {
  carregar(): Promise<Preferencias>
  salvar(preferencias: Preferencias): Promise<void>
}
