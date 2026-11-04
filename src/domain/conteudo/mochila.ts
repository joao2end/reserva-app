export interface ItemMochila {
  id: string
  texto: string
}

export const ITENS_MOCHILA: ItemMochila[] = [
  { id: 'agua', texto: 'Garrafas de água para beber' },
  { id: 'comida', texto: 'Comida pronta que não estraga e abridor de lata' },
  { id: 'remedios', texto: 'Remédios de uso contínuo para 7 dias' },
  { id: 'documentos', texto: 'Documentos e receitas em saco plástico fechado' },
  { id: 'oculos', texto: 'Óculos extra, se você usa' },
  { id: 'lanterna', texto: 'Lanterna e pilhas extras' },
  { id: 'radio', texto: 'Rádio a pilha' },
  { id: 'carregador', texto: 'Carregador e bateria extra do celular' },
  { id: 'telefones', texto: 'Telefones da família anotados em papel' },
  { id: 'dinheiro', texto: 'Dinheiro trocado' },
  { id: 'socorros', texto: 'Caixa de primeiros socorros' },
  { id: 'apito', texto: 'Apito para pedir ajuda' },
  { id: 'roupa', texto: 'Uma muda de roupa e agasalho' },
  { id: 'higiene', texto: 'Sabonete, escova de dente e papel higiênico' },
]

export function ehItemMochila(valor: unknown): valor is string {
  return typeof valor === 'string' && ITENS_MOCHILA.some((item) => item.id === valor)
}
