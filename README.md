# ARVION Lab

Site do estúdio (fictício no código, baseado no site real `arvionlab.wuaze.com`):
preto puro e luz neon — ciano, azul, violeta e magenta. Monólito facetado na
home, pilha de três divisões em Soluções, campos de shards nas capas, e um
[guia de estilo](#guia-de-estilo) ao vivo. Todo texto e dado fica em um arquivo;
os formulários postam em rotas validadas do Worker; o estado do visitante fica
no localStorage.

## Páginas (`src/pages`, rotas em `src/App.tsx`)

| Rota | O que é |
|---|---|
| `/` | Hero com o monólito, soluções, "Por que a ARVION Lab?", processo em quatro etapas e painel de contato |
| `/solucoes` | As três divisões (Web, Solutions, Products) em um explorador com teclado, princípios e valores |
| `/projetos` | Os cinco projetos reais, com links, e o processo de desenvolvimento |
| `/sobre` | História, números, divisões, processo e valores do estúdio |
| `/planos` | Planos de sites, outros serviços, sistemas, simulação de investimento e FAQ |
| `/novidades`, `/novidades/:slug` | Publicações com filtro de categoria e newsletter; artigo com copiar link |
| `/orcamento` | Briefing em três passos (contato, projeto, revisão) com `?segment=` e recibo salvo |
| `/contato` | Assunto, nome, e-mail, mensagem; canais de WhatsApp e Instagram |
| `/guia` | Guia de estilo vivo |
| qualquer outra | 404 |

## Rodar

```sh
bun install
bun run dev        # http://localhost:5303 (Vite + o Worker no workerd)
bun run typecheck
bun run build      # dist/client (assets) + dist/fusion_energy/index.js (Worker)
```

## Editar

- `src/content.ts` guarda cada texto, preço, projeto, plano e link. Comece por ele.
- Quase toda a imagem é desenhada em código: `Monolith.tsx` (hero),
  `Core.tsx` (pilha das divisões), `Beacon.tsx` (objetos pequenos),
  `ShardField.tsx` (capas e painéis), `Skyline.tsx` e `FireStreaks.tsx`.
  Não há arquivos de foto no projeto.
- Tokens (cores, raios, sombras, animações) ficam em `src/styles.css` sob
  `@theme`; `src/lib/tokens.ts` espelha os valores para o guia.
- Componentes em `src/components`, seções da home em `src/sections`.

## Formulários e estado

O Worker (`src/worker/index.ts`) valida com as mesmas regras do navegador
(`src/lib/validate.ts`) e responde 400 para corpo inválido, 422 com erros de
campo e 200 nos demais casos. Nada é armazenado no servidor: conecte cada rota
ao seu CRM, inbox, WhatsApp ou uma tabela D1.

| Rota | Formulário |
|---|---|
| `POST /api/early-access` | Briefing de projeto |
| `POST /api/contact` | Contato |
| `POST /api/subscribe` | Newsletter |
| `GET /api/health` | `{ ok: true }`; qualquer `/api/*` desconhecida é 404 JSON |

No localStorage (`arvion:*`, `src/lib/store.ts`): briefing e recibo, canais e
mensagens, endereço da newsletter e a simulação de planos.

## Guia de estilo

`/guia` renderiza os componentes reais: amostras de cor com hex, escala
tipográfica, espaçamento, raios, sombras, animações com botão de replay e cada
componente em seus estados. Os estados são fixados com
`data-force="hover|focus|pressed"`. O site é apenas escuro.

## Acessibilidade e movimento

Link de pular, foco movido para `<main>` na navegação, anéis de foco visíveis,
menu móvel com foco preso (Esc fecha e devolve o foco), campos rotulados com
erros ligados por `aria-describedby`. Com `prefers-reduced-motion`, as faixas,
o flutuar e o pulso param e as revelações apenas aparecem.
