export class ErroDeValidacao extends Error {
  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'ErroDeValidacao'
  }
}

export class ErroNaoEncontrado extends Error {
  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'ErroNaoEncontrado'
  }
}
