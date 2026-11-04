import { ehTamanhoTexto, type Preferencias, type TamanhoTexto } from '../../domain/entidades/preferencias'
import { ehItemMochila } from '../../domain/conteudo/mochila'
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

  async alternarItemMochila(id: string): Promise<Preferencias> {
    exigir(ehItemMochila(id), 'Item da mochila inválido.')
    const atuais = await this.repositorio.carregar()
    const mochila = atuais.mochila.includes(id) ? atuais.mochila.filter((marcado) => marcado !== id) : [...atuais.mochila, id]
    const novas = { ...atuais, mochila }
    await this.repositorio.salvar(novas)
    return novas
  }

  async esvaziarMochila(): Promise<Preferencias> {
    const novas = { ...(await this.repositorio.carregar()), mochila: [] }
    await this.repositorio.salvar(novas)
    return novas
  }
}
