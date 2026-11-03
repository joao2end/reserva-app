import { ESTADO_VAZIO, type EstadoEstoque } from '../domain/entidades/tipos'
import type { RepositorioEstoque } from '../application/portas/RepositorioEstoque'

export class RepositorioMemoria implements RepositorioEstoque {
  private estado: EstadoEstoque

  constructor(inicial: EstadoEstoque = ESTADO_VAZIO) {
    this.estado = structuredClone(inicial)
  }

  async carregar(): Promise<EstadoEstoque> {
    return structuredClone(this.estado)
  }

  async salvar(estado: EstadoEstoque): Promise<void> {
    this.estado = structuredClone(estado)
  }
}
