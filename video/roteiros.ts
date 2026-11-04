import { CURSO } from '../src/domain/conteudo/curso'
import { roteiroDaLicao } from '../src/domain/conteudo/narracao'

const roteiros = CURSO.flatMap((curso) =>
  curso.licoes.map((licao) => ({
    licaoId: licao.id,
    cursoId: curso.id,
    conteudo: JSON.stringify({ licao, curso: curso.titulo }),
    trechos: roteiroDaLicao(licao, curso),
  })),
)

process.stdout.write(JSON.stringify(roteiros))
