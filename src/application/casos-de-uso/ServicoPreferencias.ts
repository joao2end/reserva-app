import { ehTamanhoTexto, type Preferencias, type TamanhoTexto } from '../../domain/entidades/preferencias'
import { exigir } from '../../domain/regras/validacao'
import type { RepositorioPreferencias } from '../portas/RepositorioPreferencias'

export class ServicoPreferencias {
  constructor(private readonly repositorio: RepositorioPreferencias) {}

  async obter(): Promise<Preferencias> {
    return this.repositorio.carregar()
  }

  async definirTamanhoTexto(tamanho: TamanhoTexto): Promise<Preferencias> {
    exigir(ehTamanhoTexto(tamanho), 'Tamanho de letra inválido.')
    const novas = { ...(await this.repositorio.carregar()), tamanhoTexto: tamanho }
    await this.repositorio.salvar(novas)
    return novas
  }
}
