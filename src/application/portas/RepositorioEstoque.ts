import type { EstadoEstoque } from '../../domain/entidades/tipos'

export interface RepositorioEstoque {
  carregar(): Promise<EstadoEstoque>
  salvar(estado: EstadoEstoque): Promise<void>
}
