# SBV

App Android para montar e manter um estoque de água e alimentos para a seca do El Niño. Funciona 100% offline: os dados ficam só no celular.

Identidade visual **SBV**: preto e branco, fonte Atkinson Hyperlegible (feita para baixa visão), texto mínimo de 18px e ícones Phosphor no peso *Bold*.

## Casos de uso

| Caso de uso | Onde |
| --- | --- |
| Criar e editar estoque, passo a passo | Início › Começar / Mudar pessoas ou tempo |
| Quantidade de pessoas (adultos e crianças) e período (2 semanas a 3 meses) | Assistente de criação |
| Escolher os principais alimentos, com a meta já calculada | Assistente de criação |
| Lista de compras com o que falta | Aba Compras |
| Registrar compra com data e validade | Compras › Comprei, ou Estoque › item › Comprei mais |
| Anotar o que usou e jogar fora pacotes vencidos | Estoque › item |
| Alerta do que vence em até 60 dias | Início › Use primeiro |
| Para quantos dias a água guardada dá | Início |
| Como armazenar e onde comprar cada item | Estoque › item |
| Fontes de compra (dicas e locais próprios) | Guia › Onde e como comprar / Meus locais de compra |
| Guia de armazenamento, água e cuidados | Aba Guia |
| Checklist da mochila de saída, salvo no celular | Guia › Minha mochila de saída |
| Cuidados com fumaça e queimadas na seca | Guia › Fumaça e queimadas |
| Cuidados no calor forte, com atenção a idosos e crianças | Guia › Calor forte |
| Cursos de ofícios: eletricista, encanador, mecânica básica e horta | Aba Cursos |
| Cursos de emergência: água e primeiros socorros | Aba Cursos |
| Aula em vídeo narrada em cada lição, para assistir ou baixar no celular | Aba Cursos › lição |
| Lições separadas em níveis fácil, médio e avançado | Aba Cursos › curso |
| Acervo de sobrevivência com busca: enchente, raios, ar seco, fogo no mato perto de casa, falta de energia, preso no elevador, aparelho de saúde na tomada, sinais de infarto, ir para um abrigo público, saúde, casa e comunicação | Guia › Acervo de sobrevivência |

## Vídeos narrados das lições

Cada lição vira um vídeo MP4 com narração em português, feito com motion graphics em HTML:

- `src/domain/conteudo/narracao.ts` monta o roteiro falado da aula inteira (abertura, demonstração de cada cena, cada item do passo a passo, erros comuns e encerramento) e escreve unidades e siglas por extenso.
- `video/` é a página do vídeo (1280×720, cores por curso), posicionada quadro a quadro.
- `scripts/videos/gerar_videos.py` narra com a voz Piper `pt_BR-faber-medium` (dados CC0), ajusta cada cena ao tamanho da fala, cria uma trilha original, fotografa os quadros e junta tudo com o ffmpeg.
- O workflow **Vídeos dos cursos** roda quando o conteúdo muda, gera só as lições alteradas e publica na release `videos-cursos`.
- No app, a lição mostra **Baixar vídeo**: o arquivo fica no celular, funciona sem internet e pode ser salvo ou enviado.
- Na página de cada curso, **Baixar todos os vídeos** baixa as lições que faltam, uma depois da outra, com o progresso total. Também dá para apagar todos de uma vez.

Para gerar um vídeo no computador: `python3 scripts/videos/gerar_videos.py --modelo voz/pt_BR-faber-medium.onnx --licoes rcp`.

As lições também indicam vídeos do YouTube de canais oficiais e de profissionais (`src/domain/conteudo/cursos/youtube.ts`). Eles abrem no app do YouTube; o download para ver sem internet é feito pelo próprio YouTube.

As animações das lições são cenas desenhadas em SVG: cada cena lista as peças (`src/presentation/desenhos.ts`), a posição e o movimento, em `src/domain/conteudo/cursos/`.

## Fácil para idosos

- Uma pergunta por tela na criação, com "Passo X de 4" e botões grandes de Próximo e Voltar.
- Números mudam com botões + e −. Não é preciso digitar.
- A validade é escolhida com Mês e Ano por extenso, sem calendário.
- "Comprado hoje" já vem marcado.
- Toda ação mostra um aviso claro de sucesso. Apagar algo sempre pede confirmação em uma janela grande.
- Tamanho da letra Normal, Grande ou Muito grande (Início), salvo no celular.
- Linguagem simples: Tenho / Preciso / Falta, Use primeiro, Pacotes guardados, Jogar fora.
- Ícones sempre acompanhados de texto, áreas de toque de no mínimo 56px e contraste 21:1.

## Arquitetura

O código segue a Clean Architecture. As dependências apontam sempre para dentro:

```
presentation  →  application  →  domain
      ↓                ↑
infrastructure ────────┘
```

| Camada | Pasta | Responsabilidade |
| --- | --- | --- |
| Domínio | `src/domain` | Entidades (estoque e preferências), erros, regras puras (cálculo de metas, validade, validação) e o conteúdo (catálogo e guia). Não conhece Vue nem Capacitor. |
| Aplicação | `src/application` | Casos de uso (`ServicoEstoque`, `ServicoPreferencias`), consultas (resumo, lista de compras, detalhe do item) e as portas `RepositorioEstoque`, `RepositorioPreferencias`, `Relogio` e `GeradorDeId`. |
| Infraestrutura | `src/infrastructure` | Adaptadores: `RepositorioPreferences` e `RepositorioPreferenciasCapacitor` (Capacitor), `RepositorioMemoria` (testes), normalização de dados salvos e o `container` que monta tudo. |
| Apresentação | `src/presentation` | Vue 3: telas, componentes, roteador, ícones, formatação e o composable `useEstoque`, que chama os casos de uso. |

A regra de dependência é verificada automaticamente em `tests/unit/arquitetura.test.ts`. O mesmo teste garante a política de código sem comentários.

## Comandos

```bash
npm install
npm run dev          # roda no navegador em http://localhost:5173
npm test             # testes unitários (domínio, casos de uso, consultas, arquitetura)
npm run test:e2e     # 25 cenários ponta a ponta (precisa de Python + Playwright e Chrome)
```

## Gerar o APK

Pré-requisitos: [Android Studio](https://developer.android.com/studio) com o Android SDK e o JDK 17.

```bash
npm install
npm run android      # build web + sincroniza + abre no Android Studio
```

No Android Studio:

- Para testar no celular, ative a "Depuração USB", conecte o aparelho e clique em ▶ Run.
- Para gerar um APK instalável, use **Build › Build App Bundle(s) / APK(s) › Build APK(s)**. O arquivo sai em `android/app/build/outputs/apk/debug/app-debug.apk`.
- Para publicar, use **Build › Generate Signed App Bundle / APK** com a sua chave.

Depois de mudar o código web, rode `npm run build && npx cap sync android` antes de compilar de novo.

O ícone e a tela de abertura são gerados por `python3 scripts/gerar_icones.py` a partir do ícone Phosphor *package-bold*.

## Vídeos com o MoneyPrinterTurbo

O workflow **Vídeos MoneyPrinterTurbo** gera uma segunda versão do vídeo de cada lição com o [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo): a narração exata da lição, cenas reais do Pexels escolhidas pelos termos de `scripts/videos/termos_moneyprinter.json`, voz pt-BR do Edge TTS, legendas e trilha original. Publica na release `videos-moneyprinter`. Precisa do secret `PEXELS_API_KEY`. O app ainda mostra a aula narrada; a troca depende de comparar as duas versões.

## Loop de melhoria

Uma tarefa agendada roda de hora em hora e segue `LOOP.md`: amplia o acervo, completa os níveis dos cursos e melhora os vídeos, uma mudança por rodada, sempre com testes.
