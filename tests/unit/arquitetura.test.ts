import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const RAIZ = join(__dirname, '../../src')

function arquivos(pasta: string): string[] {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome)
    return statSync(caminho).isDirectory() ? arquivos(caminho) : [caminho]
  })
}

function importacoes(camada: string): { arquivo: string; destino: string }[] {
  return arquivos(join(RAIZ, camada)).flatMap((arquivo) =>
    [...readFileSync(arquivo, 'utf8').matchAll(/from ['"]([^'"]+)['"]/g)].map((resultado) => ({
      arquivo: relative(RAIZ, arquivo),
      destino: resultado[1],
    })),
  )
}

const PROIBIDO: Record<string, RegExp> = {
  domain: /(application|infrastructure|presentation|vue|@capacitor)/,
  application: /(infrastructure|presentation|vue|@capacitor)/,
  infrastructure: /presentation/,
}

describe('regra de dependência da Clean Architecture', () => {
  it.each(Object.keys(PROIBIDO))('a camada %s não depende de camadas externas', (camada) => {
    const violacoes = importacoes(camada).filter(({ destino }) => PROIBIDO[camada].test(destino))
    expect(violacoes).toEqual([])
  })

  it('o código não tem comentários', () => {
    const comComentario = arquivos(RAIZ)
      .filter((arquivo) => /\.(ts|vue)$/.test(arquivo))
      .filter((arquivo) => /(^|\s)\/\/(?!\/ <reference)|\/\*|<!--/m.test(readFileSync(arquivo, 'utf8')))
      .map((arquivo) => relative(RAIZ, arquivo))
    expect(comComentario).toEqual([])
  })
})
