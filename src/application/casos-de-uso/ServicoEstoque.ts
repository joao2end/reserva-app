import type { ConfiguracaoEstoque, EstadoEstoque, Lote } from '../../domain/entidades/tipos'
import { ErroNaoEncontrado } from '../../domain/entidades/erros'
import { CATALOGO, encontrarItem } from '../../domain/conteudo/catalogo'
import { arredondar } from '../../domain/regras/calculo'
import { dataIso } from '../../domain/regras/datas'
import {
  LIMITE_LOCAL,
  LIMITE_NOME,
  LIMITE_OBSERVACAO,
  LIMITE_PESSOAS,
  OPCOES_DIAS,
  exigir,
  exigirData,
  exigirInteiroEntre,
  exigirMes,
  exigirQuantidadePositiva,
  exigirTexto,
} from '../../domain/regras/validacao'
import type { RepositorioEstoque } from '../portas/RepositorioEstoque'
import type { GeradorDeId, Relogio } from '../portas/Relogio'

export interface DadosEstoque {
  nome: string
  adultos: number
  criancas: number
  dias: number
  itensSelecionados: string[]
}

export interface DadosCompra {
  itemId: string
  quantidade: number
  compradoEm: string
  validade: string
}

export interface DadosLocal {
  nome: string
  observacao: string
}

export class ServicoEstoque {
  constructor(
    private readonly repositorio: RepositorioEstoque,
    private readonly relogio: Relogio,
    private readonly ids: GeradorDeId,
  ) {}

  async obterEstado(): Promise<EstadoEstoque> {
    return this.repositorio.carregar()
  }

  async definirEstoque(dados: DadosEstoque): Promise<EstadoEstoque> {
    const nome = exigirTexto(dados.nome, LIMITE_NOME, 'o nome do estoque')
    exigirInteiroEntre(dados.adultos, 0, LIMITE_PESSOAS, 'Adultos')
    exigirInteiroEntre(dados.criancas, 0, LIMITE_PESSOAS, 'Crianças')
    exigir(dados.adultos + dados.criancas > 0, 'Informe pelo menos uma pessoa.')
    exigir((OPCOES_DIAS as readonly number[]).includes(dados.dias), 'Escolha um período válido.')
    const itensValidos = [...new Set(dados.itensSelecionados)].filter((id) => CATALOGO.some((item) => item.id === id))
    exigir(itensValidos.length > 0, 'Marque pelo menos um alimento.')

    return this.alterar((estado) => {
      const configuracao: ConfiguracaoEstoque = {
        nome,
        adultos: dados.adultos,
        criancas: dados.criancas,
        dias: dados.dias,
        itensSelecionados: itensValidos,
        criadoEm: estado.configuracao?.criadoEm ?? this.relogio.agora().toISOString(),
      }
      return { ...estado, configuracao }
    })
  }

  async registrarCompra(dados: DadosCompra): Promise<EstadoEstoque> {
    exigir(Boolean(encontrarItem(dados.itemId)), 'Item desconhecido.')
    exigirQuantidadePositiva(dados.quantidade)
    exigirData(dados.compradoEm, 'Data de compra')
    exigir(dados.compradoEm <= dataIso(this.relogio.agora()), 'A data de compra não pode estar no futuro.')
    exigirMes(dados.validade, 'Validade')

    return this.alterar((estado) => {
      exigir(Boolean(estado.configuracao), 'Crie o estoque antes de registrar compras.')
      const lote: Lote = {
        id: this.ids.novo(),
        itemId: dados.itemId,
        quantidade: arredondar(dados.quantidade),
        compradoEm: dados.compradoEm,
        validade: dados.validade,
      }
      return { ...estado, lotes: [...estado.lotes, lote] }
    })
  }

  async consumir(loteId: string, quantidade: number): Promise<EstadoEstoque> {
    exigirQuantidadePositiva(quantidade)
    return this.alterar((estado) => {
      const lote = this.buscarLote(estado, loteId)
      const restante = arredondar(lote.quantidade - quantidade)
      const lotes = restante > 0
        ? estado.lotes.map((candidato) => (candidato.id === loteId ? { ...candidato, quantidade: restante } : candidato))
        : estado.lotes.filter((candidato) => candidato.id !== loteId)
      return { ...estado, lotes }
    })
  }

  async descartar(loteId: string): Promise<EstadoEstoque> {
    return this.alterar((estado) => {
      this.buscarLote(estado, loteId)
      return { ...estado, lotes: estado.lotes.filter((lote) => lote.id !== loteId) }
    })
  }

  async adicionarLocal(dados: DadosLocal): Promise<EstadoEstoque> {
    const nome = exigirTexto(dados.nome, LIMITE_LOCAL, 'o nome do local')
    const observacao = dados.observacao.trim()
    exigir(observacao.length <= LIMITE_OBSERVACAO, `A observação pode ter no máximo ${LIMITE_OBSERVACAO} caracteres.`)
    return this.alterar((estado) => ({
      ...estado,
      locais: [...estado.locais, { id: this.ids.novo(), nome, observacao }],
    }))
  }

  async removerLocal(localId: string): Promise<EstadoEstoque> {
    return this.alterar((estado) => {
      exigir(estado.locais.some((local) => local.id === localId), 'Local não encontrado.')
      return { ...estado, locais: estado.locais.filter((local) => local.id !== localId) }
    })
  }

  async apagarTudo(): Promise<EstadoEstoque> {
    return this.alterar(() => ({ configuracao: null, lotes: [], locais: [] }))
  }

  private buscarLote(estado: EstadoEstoque, loteId: string): Lote {
    const lote = estado.lotes.find((candidato) => candidato.id === loteId)
    if (!lote) throw new ErroNaoEncontrado('Lote não encontrado.')
    return lote
  }

  private async alterar(transformar: (estado: EstadoEstoque) => EstadoEstoque): Promise<EstadoEstoque> {
    const atual = await this.repositorio.carregar()
    const novo = transformar(atual)
    await this.repositorio.salvar(novo)
    return novo
  }
}
