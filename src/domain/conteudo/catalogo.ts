import { ErroNaoEncontrado } from '../entidades/erros'
import type { Categoria, ItemCatalogo } from '../entidades/tipos'

export const CATEGORIAS: Categoria[] = [
  { id: 'agua', nome: 'Água' },
  { id: 'graos', nome: 'Grãos e secos' },
  { id: 'proteinas', nome: 'Proteínas' },
  { id: 'gorduras', nome: 'Gorduras' },
  { id: 'vegetais', nome: 'Frutas e verduras' },
  { id: 'basicos', nome: 'Básicos' },
]

const SECO_EM_POTE = 'Transfira para pote ou garrafa PET seca e bem fechada. Congele 3 dias antes para matar ovos de caruncho. Ponha folhas de louro.'
const LATA = 'Lugar seco, sem empilhar alto. Escreva a validade na tampa. Descarte se estufar, vazar ou enferrujar.'
const GORDURA = 'Lugar escuro e fresco, longe do fogão. Rança com calor e luz.'

const ATACAREJO = 'Atacarejo ou supermercado: compre em fardo nas promoções.'
const FEIRA = 'Feira livre ou mercado público: costuma ser mais barato a granel.'

export const CATALOGO: ItemCatalogo[] = [
  { id: 'agua', nome: 'Água potável', categoria: 'agua', unidade: 'L', porAdultoMes: 120, validadeMeses: 6, armazenamento: 'Galões lacrados ou bombonas próprias para alimento, longe do sol e de produtos de limpeza. Troque água de torneira a cada 6 meses.', ondeComprar: 'Galões de 20 L em distribuidoras de água; bombonas em lojas de embalagem.' },
  { id: 'hipoclorito', nome: 'Hipoclorito de sódio 2,5%', categoria: 'agua', unidade: 'un', porAdultoMes: 0.5, validadeMeses: 6, armazenamento: 'Frasco fechado, escuro, longe de alimentos. Use 2 gotas por litro e espere 30 minutos.', ondeComprar: 'Farmácias e postos de saúde (gratuito em muitos).' },

  { id: 'arroz', nome: 'Arroz', categoria: 'graos', unidade: 'kg', porAdultoMes: 5, validadeMeses: 12, armazenamento: SECO_EM_POTE, ondeComprar: ATACAREJO },
  { id: 'feijao', nome: 'Feijão', categoria: 'graos', unidade: 'kg', porAdultoMes: 3, validadeMeses: 12, armazenamento: SECO_EM_POTE, ondeComprar: `${ATACAREJO} ${FEIRA}` },
  { id: 'macarrao', nome: 'Macarrão', categoria: 'graos', unidade: 'kg', porAdultoMes: 2, validadeMeses: 18, armazenamento: 'Pote fechado; a embalagem original não protege de umidade e insetos.', ondeComprar: ATACAREJO },
  { id: 'cuscuz', nome: 'Flocão de milho (cuscuz)', categoria: 'graos', unidade: 'kg', porAdultoMes: 2, validadeMeses: 6, armazenamento: SECO_EM_POTE, ondeComprar: ATACAREJO },
  { id: 'farinha', nome: 'Farinha de mandioca', categoria: 'graos', unidade: 'kg', porAdultoMes: 1, validadeMeses: 6, armazenamento: SECO_EM_POTE, ondeComprar: FEIRA },
  { id: 'aveia', nome: 'Aveia', categoria: 'graos', unidade: 'kg', porAdultoMes: 0.5, validadeMeses: 6, armazenamento: 'Pote fechado. Dura menos que arroz e feijão: priorize no rodízio.', ondeComprar: ATACAREJO },

  { id: 'sardinha', nome: 'Sardinha em lata', categoria: 'proteinas', unidade: 'un', porAdultoMes: 8, validadeMeses: 36, armazenamento: LATA, ondeComprar: ATACAREJO },
  { id: 'atum', nome: 'Atum em lata', categoria: 'proteinas', unidade: 'un', porAdultoMes: 4, validadeMeses: 24, armazenamento: LATA, ondeComprar: ATACAREJO },
  { id: 'carne-lata', nome: 'Carne em lata', categoria: 'proteinas', unidade: 'un', porAdultoMes: 2, validadeMeses: 24, armazenamento: LATA, ondeComprar: ATACAREJO },
  { id: 'leite-po', nome: 'Leite em pó', categoria: 'proteinas', unidade: 'kg', porAdultoMes: 0.8, validadeMeses: 12, armazenamento: 'Lata original fechada, lugar escuro. Depois de aberto, consuma em poucas semanas.', ondeComprar: ATACAREJO },
  { id: 'pts', nome: 'Proteína de soja (PTS)', categoria: 'proteinas', unidade: 'kg', porAdultoMes: 0.5, validadeMeses: 12, armazenamento: SECO_EM_POTE, ondeComprar: `${ATACAREJO} Lojas de produtos naturais a granel.` },
  { id: 'lentilha', nome: 'Lentilha', categoria: 'proteinas', unidade: 'kg', porAdultoMes: 0.5, validadeMeses: 12, armazenamento: SECO_EM_POTE, ondeComprar: ATACAREJO },
  { id: 'charque', nome: 'Charque', categoria: 'proteinas', unidade: 'kg', porAdultoMes: 0.5, validadeMeses: 4, armazenamento: 'Embalagem a vácuo, lugar fresco e seco. Dessalgue antes de cozinhar.', ondeComprar: FEIRA },

  { id: 'oleo', nome: 'Óleo de cozinha', categoria: 'gorduras', unidade: 'L', porAdultoMes: 1, validadeMeses: 12, armazenamento: GORDURA, ondeComprar: ATACAREJO },
  { id: 'amendoim', nome: 'Amendoim / castanhas', categoria: 'gorduras', unidade: 'kg', porAdultoMes: 0.3, validadeMeses: 6, armazenamento: GORDURA, ondeComprar: FEIRA },

  { id: 'milho-lata', nome: 'Milho / ervilha em lata', categoria: 'vegetais', unidade: 'un', porAdultoMes: 3, validadeMeses: 24, armazenamento: LATA, ondeComprar: ATACAREJO },
  { id: 'extrato', nome: 'Extrato de tomate', categoria: 'vegetais', unidade: 'un', porAdultoMes: 2, validadeMeses: 24, armazenamento: LATA, ondeComprar: ATACAREJO },
  { id: 'fruta-seca', nome: 'Frutas secas / doce em lata', categoria: 'vegetais', unidade: 'kg', porAdultoMes: 0.5, validadeMeses: 12, armazenamento: 'Pote fechado, lugar fresco.', ondeComprar: FEIRA },

  { id: 'acucar', nome: 'Açúcar', categoria: 'basicos', unidade: 'kg', porAdultoMes: 1, validadeMeses: 24, armazenamento: 'Pote fechado contra formigas e umidade.', ondeComprar: ATACAREJO },
  { id: 'sal', nome: 'Sal', categoria: 'basicos', unidade: 'kg', porAdultoMes: 0.25, validadeMeses: 60, armazenamento: 'Pote fechado. Praticamente não vence.', ondeComprar: ATACAREJO },
  { id: 'cafe', nome: 'Café', categoria: 'basicos', unidade: 'kg', porAdultoMes: 0.5, validadeMeses: 12, armazenamento: 'Embalagem a vácuo fechada; depois de aberto, pote bem fechado.', ondeComprar: ATACAREJO },
]

export const ITENS_PADRAO = CATALOGO.filter((item) => item.id !== 'charque' && item.id !== 'aveia').map((item) => item.id)

export function encontrarItem(id: string): ItemCatalogo | undefined {
  return CATALOGO.find((candidato) => candidato.id === id)
}

export function buscarItem(id: string): ItemCatalogo {
  const item = encontrarItem(id)
  if (!item) throw new ErroNaoEncontrado(`Item desconhecido: ${id}`)
  return item
}
