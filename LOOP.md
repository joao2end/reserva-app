# Loop de melhoria contínua do SBV

Instruções para cada rodada da tarefa agendada. Leia tudo antes de mexer no código.

## O app em uma frase

SBV é um app Android para idosos montarem o estoque de emergência da seca do El Niño, aprenderem ofícios e consultarem guias de sobrevivência, tudo funcionando sem internet. Vue 3, TypeScript, Tailwind 4, Capacitor 8, Clean Architecture, nenhum comentário em `src`, commits em português.

## Uma rodada = uma melhoria

Cada rodada escolhe uma única tarefa, faz bem, testa e publica. Olhe `git log -12 --oneline` e escolha o tipo feito há mais tempo, nesta ordem de prioridade quando empatar:

1. **Guia novo no acervo** (`src/domain/conteudo/acervo.ts`).
2. **Lição nova para completar os níveis** de um curso.
3. **Melhoria de qualidade dos vídeos** (`video/Filme.vue`, `CenaDesenhada.vue`, `src/presentation/desenhos.ts`). No máximo uma vez a cada 24 horas, porque mudar o motor gera de novo todos os vídeos no GitHub.

### 1. Guia novo no acervo

- Meta: 40 guias, equilibrados entre as categorias de `CATEGORIAS_ACERVO`. Pode criar uma categoria nova se fizer falta (ex.: orientação, abrigo, comida silvestre).
- Antes de escrever, pesquise com WebSearch em fontes oficiais: Defesa Civil, Ministério da Saúde, Corpo de Bombeiros, Anvisa, Embrapa, INPE, Cruz Vermelha, CDC, Ready.gov. Números só os que a fonte diz. Se a fonte não confirma, não escreva.
- Não repita o que já existe em `guia.ts`, nas lições ou em outro guia do acervo: ligue com `ligacoes`.
- Linguagem para idoso: frases curtas, uma ação por item, sem sigla sem explicar.
- Cada guia: `nivel`, 2 a 4 blocos com 2 a 5 itens, `aviso` quando houver risco de morte, e `fontes`.

### 2. Lição nova por nível

- Meta: cada curso com pelo menos 2 lições fáceis, 2 médias e 2 avançadas. Veja o que falta com `licoesPorNivel`.
- Fácil: pouca ferramenta, nenhum risco grande. Médio: ferramentas e prática. Avançado: trabalho maior, sempre dizendo quando chamar um profissional.
- Cenas sempre com `desenho` (`CenaDesenhada`), nunca `ilustracao`. Desenhos novos entram em `DESENHOS` (`src/domain/conteudo/desenho.ts`) e em `DESENHO` (`src/presentation/desenhos.ts`).
- Lição completa: `nivel`, 3 ou mais cenas (até 60 s somadas), 2 ou mais partes, erros comuns, teste de 3 perguntas, fontes. Vídeos do YouTube só de canais oficiais ou profissionais conhecidos, em `cursos/youtube.ts`.
- A lição entra no arquivo do curso. A ordem por nível é feita em `curso.ts`, não precisa reordenar.
- Ao mudar o número de lições, atualize os textos "X de N lições" em `tests/e2e/cenarios.py` (cenários 28 e 30) e o README.

### 3. Qualidade dos vídeos

O vídeo de cada lição é gerado por `scripts/videos/gerar_videos.py`: `video/Filme.vue` desenha a aula em HTML a 1280×720, o Playwright filma quadro a quadro e o ffmpeg junta com a narração (Piper, voz faber). Cada trecho do roteiro (`roteiroDaLicao` em `narracao.ts`) dura o tempo da fala.

Escreva para você mesmo um prompt de vídeo antes de mudar o código, seguindo o modelo abaixo, e só depois implemente.

#### Modelo de prompt de vídeo

```
Vídeo: aula do SBV, 1280×720, 24 quadros por segundo, duração guiada pela narração.
Público: idosos, tela de celular. Texto mínimo de 34 px, contraste AA, margem segura de 64 px.
Trecho: <tipo do trecho> — fala: "<fala exata do roteiro>"
Batidas (tempo relativo ao início do trecho):
  0,0–0,6 s  <elemento> entra: <movimento>, <curva>, <de onde para onde, em px>
  0,6–<x> s  <o que segura parado e o que continua se mexendo>
  <x>–fim    saída: <movimento>
Texto na tela, exatamente: "<texto>"
Camadas: fundo (desfoque, 0,2× de deslocamento), meio (cartão), frente (texto e destaques).
Proibido: inventar números ou passos que não estão na lição; piscar mais de 3 vezes por segundo; mexer tudo ao mesmo tempo.
```

#### Regras que vieram da pesquisa

- **Movimento, não clima.** Diga o que mexe, em que ordem, quanto e com que curva. "Fica bonito" não serve.
- **Cada segundo tem um trabalho.** O desenho mostra o que a voz está dizendo naquele momento. Se a fala dura 8 s e a ação dura 3 s, segure o resultado e dê destaque ao detalhe citado.
- **Curva diferente por tipo de elemento.** Título: mola com pequeno exagero. Cartão: desacelerar no fim. Linhas e barras de progresso: linear. Cenas seguidas não podem ter a mesma entrada.
- **Profundidade com camadas.** Fundo, meio e frente andando em velocidades diferentes, com desfoque no fundo.
- **Segurar o que chegou.** Um título que entrou fica parado pelo menos 1,5 s. Só se mexe o que está mudando.
- **Alvos absolutos.** "Brilho a 35% de opacidade", "seta de 24 px", nunca "um pouco maior".
- **Texto exato.** Todo texto na tela sai da lição, sem resumir com outras palavras.
- **Uma mudança por rodada.** Congele o que já está bom e mude uma coisa só.
- **Conferir antes de gerar tudo.** Desenhe quadros no tamanho final nos momentos com mais coisas na tela e olhe cada um: texto sobreposto, quebra de linha ruim, corte na margem, tela parada demais.

#### Como conferir

```bash
npx vite --config video/vite.config.ts --port 5180 &
```

Abra `http://localhost:5180/?licao=<id>&duracoes=<lista>` no Playwright, chame `window.posicionar(t)` nos momentos mais cheios, tire JPEG em qualidade 92 e olhe as imagens. Para um vídeo completo de teste:

```bash
python3 scripts/videos/gerar_videos.py --modelo voz/pt_BR-faber-medium.onnx --saida saida-videos --licoes <id>
```

A voz é baixada do HuggingFace pelo workflow `videos.yml`. Se a rede da sessão não alcançar o HuggingFace, confira só os quadros e deixe o GitHub gerar.

## Toda rodada termina assim

1. `npx vue-tsc --noEmit -p tsconfig.json`
2. `npx vitest run`
3. `npm run build` e `python3 tests/e2e/cenarios.py <pasta-de-telas>`. Todos os cenários precisam passar.
4. Uma linha em `MELHORIAS.md` com data e hora de Brasília, o que mudou e a fonte.
5. Commit em português explicando o que muda para quem usa o app, e `git push` na `main`. O GitHub gera o APK e os vídeos.
6. Confira com `gh run list --limit 3` que os workflows começaram. Se o build falhar, conserte na mesma rodada.

## Não faça

- Não baixe vídeos do YouTube nem de outros sites para dentro do app.
- Não use vídeos de banco de imagens: o vídeo da lição é a aula narrada.
- Não escreva comentários em `src`.
- Não apague conteúdo existente sem motivo forte.
