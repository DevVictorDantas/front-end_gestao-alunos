# Portal de Gestão Escolar — Frontend (trabalho do Módulo II)

Frontend do sistema de **gestão escolar**, em **React + TypeScript** (Vite).
Este repositório é um **template de estudo em forma de esqueleto**: o projeto
sobe e roda, mas **não existe nenhum componente** — a pasta
`src/components/` está vazia de propósito, e `types.ts`, `mock.ts` e `api.ts`
têm só comentários `TODO`/`DICA` indicando **onde cada coisa vai**.

Você constrói o frontend **inteiro**: os componentes, os estados (`useState`),
os efeitos (`useEffect`) e o formulário controlado. É aprender construindo de
verdade — a estrutura te guia, o código é seu.

> 👉 **Novo por aqui? Comece pelo [COMECE_AQUI.md](docs/COMECE_AQUI.md)** — o
> roteiro do começo ao fim (preparar → entender → construir → conferir →
> entregar).

> **Como usar este template:** no GitHub, clique em **"Use this template" →
> "Create a new repository"** para gerar o *seu* repositório a partir deste.
> Depois siga o [guia de instalação](docs/INSTALACAO.md).

## O contrato: fixo nos dados, livre no resto

O **formato dos dados** é o da API de gestão escolar do **Módulo I** (FastAPI +
PostgreSQL) e está especificado em **[CONTRATO_API.md](docs/CONTRATO_API.md)**.
Seguir esse contrato é obrigatório: no **Módulo III** este frontend vai consumir
aquela API de verdade, e a integração deve ser apenas **trocar o mock por
`fetch`** dentro do `src/api.ts` — sem tocar em nenhum componente.

| Fixo (avaliado) | Livre (é onde você aparece) |
|---|---|
| Campos e tipos dos dados (o contrato) | Layout, navegação, cores, tipografia |
| Props tipadas, `useState`, `useEffect`, `.map()` com `key`, formulário controlado | Cards, tabela ou lista |
| Componentes **não** importam o `mock.ts` | Nomes dos componentes e arquivos |
| `npm run build` passando | Ícones, animações, textos, extras |

**Você não precisa da API rodando** para fazer este trabalho: os dados vêm do
`src/mock.ts`, que você mesmo preenche.

## O que vem no template

- O projeto **Vite + React + TypeScript** configurado e rodando.
- Os arquivos de `src/` com comentários **`TODO`/`DICA`** guiando o que fazer.
- O **contrato de dados** ([CONTRATO_API.md](docs/CONTRATO_API.md)) — sua
  especificação.
- O **enunciado com rubrica** ([DESAFIOS.md](docs/DESAFIOS.md)) e o **roteiro do
  aluno** ([COMECE_AQUI.md](docs/COMECE_AQUI.md)).
- Um reset de CSS e algumas variáveis para você começar o **seu** tema.
- Uma tela provisória, só para provar que o ambiente funciona (você a apaga na
  Etapa 0).

Nenhum componente vem pronto — isso é com você.

## O que VOCÊ implementa

Roteiro completo (com critérios de aceitação e rubrica) em
**[DESAFIOS.md](docs/DESAFIOS.md)**. Em resumo:

| Etapa | Onde | O que fazer |
|---|---|---|
| **0 — Fundação** | `types.ts` · `mock.ts` · `components/` | Interfaces fiéis ao contrato, dados de mentira, cabeçalho e card com **props tipadas** |
| **1 — Lista + efeito** | `api.ts` · seus componentes | `listarAlunos()`, **`useEffect` com `[]`**, `.map()` com `key`, estados de carregando/erro/vazio |
| **2 — Filtros** | `api.ts` · seus componentes | Os 3 filtros da API (`q`, `idade_minima`, `media_minima`), combináveis, com **`useState`** |
| **3 — Formulário** | `api.ts` · seus componentes | Cadastro **controlado** (`value` + `onChange`), validações, matrícula duplicada, exclusão |
| **4 — Visual e UX** | `index.css` | Tema próprio, responsividade, feedback de interação (**vale nota**) |

**Como validar:** `npm run build` tem que passar, o console do navegador tem que
estar limpo, e os **checklists** de cada etapa do `DESAFIOS.md` têm que fechar.

## Estrutura

```
.
├── index.html              # a "casca" do Vite (pronta)
├── src/
│   ├── main.tsx            # ponto de entrada (pronto — não mexa)
│   ├── App.tsx             # ESQUELETO — compõe a tela (+ tela provisória p/ apagar)
│   ├── types.ts            # ESQUELETO — interfaces dos dados (siga o contrato)
│   ├── mock.ts             # ESQUELETO — dados de mentira (você preenche)
│   ├── api.ts              # ESQUELETO — a fronteira com o backend (vira fetch no Módulo III)
│   ├── index.css           # reset + variáveis; o tema é seu
│   └── components/         # VAZIO — seus componentes moram aqui
├── package.json · vite.config.ts · tsconfig*.json
└── docs/
    ├── COMECE_AQUI.md      # roteiro do aluno (leia primeiro)
    ├── CONTRATO_API.md     # o formato dos dados — sua especificação
    ├── DESAFIOS.md         # enunciado + critérios + rubrica
    └── INSTALACAO.md       # tutorial de instalação, do zero ao app rodando
```

**A arquitetura em uma frase:** os componentes chamam o `api.ts`; **só** o
`api.ts` conhece a origem dos dados.

## Início rápido

Com o **Node.js 20.19+** instalado (veja o
[INSTALACAO.md](docs/INSTALACAO.md)):

```bash
npm install     # baixa as dependências (uma vez)
npm run dev     # sobe o servidor de desenvolvimento
```

Abra o endereço mostrado (ex.: <http://localhost:5173>). Deixe rodando: o
navegador atualiza sozinho a cada arquivo salvo.

```bash
npm run build   # confere tipos (tsc) e gera a versão de produção
```

## Conceitos exercitados

| Módulo | Conceito | Onde aparece |
|---|---|---|
| 12 | Componentes, JSX, **props** tipadas por `interface` | cabeçalho, card de aluno |
| 13 | **`useState`**, `.map()` com `key`, renderização condicional | lista, filtros, estado vazio |
| 14 | **`useEffect`** (`[]` e `[dep]`), **formulário controlado** | carga inicial, título da aba, cadastro |
| 11 | Interfaces, `filter`/`map`/`find`, tipos em funções | `types.ts`, `api.ts` |

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (servidor de desenvolvimento e build)
- CSS puro (sem framework — é proposital)

## Branches

- **`main`** — o **esqueleto** com os `TODO` (o que o aluno recebe).
- **`gabarito`** — uma **solução de referência** (para o professor).

> **Nota do professor:** o `gabarito` é *uma* solução possível, não *a* solução.
> Como o layout é livre, entregas corretas podem ser bem diferentes dele — a
> avaliação segue a rubrica do `DESAFIOS.md`, não a semelhança com o gabarito.
