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
| Como armazenar e onde comprar cada item | Estoque › item |
| Fontes de compra (dicas e locais próprios) | Guia › Onde e como comprar / Meus locais de compra |
| Guia de armazenamento, água e cuidados | Aba Guia |
| Checklist da mochila de saída, salvo no celular | Guia › Minha mochila de saída |

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
npm run test:e2e     # 22 cenários ponta a ponta (precisa de Python + Playwright e Chrome)
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
