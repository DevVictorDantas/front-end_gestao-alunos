# Trabalho do Módulo II — Portal de Gestão Escolar (Frontend)

Este é o **enunciado oficial** da entrega. Você recebeu um projeto
**Vite + React + TypeScript** que **sobe e roda**, mas está **vazio**: não
existe nenhum componente. A pasta `src/components/` está vazia de propósito.

Sua tarefa é **construir o frontend inteiro** — os componentes, os estados, os
efeitos e o formulário — usando tudo o que foi visto nos Módulos 12, 13 e 14.

> **Leia antes de codar:** [CONTRATO_API.md](CONTRATO_API.md). O **formato dos
> dados** é fixo (é o da API do Módulo I). O **resto é seu.**

## O que é exigido e o que é livre

| Exigido (é o que se avalia) | Livre (é onde você aparece) |
|---|---|
| O formato dos dados (o contrato) | O layout e a navegação |
| Os conceitos: props tipadas, `useState`, `useEffect`, `.map()` com `key`, formulário controlado | Cores, tipografia, tema claro/escuro |
| Nenhum componente importa o `mock.ts` (dados vêm do `api.ts`) | Cards, tabela, lista — sua escolha |
| Build passando, sem erros de tipo | Nomes dos componentes e dos arquivos |
| As regras de negócio da API (matrícula única, faixas de valores) | Ícones, animações, mensagens, textos |

Não existe "o gabarito da tela". Duas entregas nota 10 podem ser visualmente
muito diferentes.

## Como validar o seu trabalho

Não há teste automatizado aqui — **você** é quem confere, com três ferramentas:

1. **O build tem que passar.** É o critério objetivo e não-negociável:
   ```bash
   npm run build
   ```
   Ele roda o TypeScript (`tsc -b`) e o Vite. Erro de tipo = build vermelho.

2. **O console do navegador tem que estar limpo.** Abra o DevTools (F12) na
   aba *Console*: nenhum erro, nenhum aviso de `key` faltando.

3. **O checklist de cada etapa** (mais abaixo). Marque item por item, clicando
   na sua própria tela.

---

## Etapa 0 — Fundação (o projeto de pé)

**Objetivo:** sair da tela provisória e ter a sua estrutura no ar, com dados
tipados e um componente que recebe **props**.

**O que fazer:**

1. `src/types.ts` — as interfaces `Aluno`, `AlunoEntrada` e `Disciplina`,
   **fiéis ao contrato**.
2. `src/mock.ts` — pelo menos **6 alunos** e **4 disciplinas**, com dados
   variados (médias acima e abaixo de 6, idades diferentes).
3. Apague a `TelaInicial` do `App.tsx` (e o bloco `.inicial` do `index.css`).
4. Crie os seus primeiros componentes em `src/components/`:
   - um **cabeçalho** (semântico: `<header>`, `<h1>`, `<nav>`);
   - um **card de aluno**, que recebe o aluno por **props tipadas por
     `interface`** e mostra nome, matrícula, idade e média;
   - no card, uma **renderização condicional**: aprovado (`media >= 6`) ou
     reprovado, visualmente distintos.
5. Componha tudo no `App.tsx`.

**Critérios de aceitação:**

| Ação | Resultado esperado |
|---|---|
| `npm run dev` | sobe sem erro; a página abre |
| A tela | mostra o seu cabeçalho e ao menos um card de aluno |
| `npm run build` | passa |
| Trocar um valor no `mock.ts` | a tela reflete a mudança |

**Checklist:**
- [ ] Não sobrou nada da `TelaInicial` (nem no CSS).
- [ ] `Aluno.matricula` é `string` e `carga_horaria` tem underline.
- [ ] O card recebe props tipadas por `interface` — sem `any`.
- [ ] O card muda de aparência conforme a média.
- [ ] O `App.tsx` só compõe; quem desenha são os componentes.

---

## Desafio 1 — A lista vem do `api.ts`, com `useEffect`

**Objetivo:** a tela não deve conhecer a origem dos dados. Ela pede ao
`api.ts` e lida com os três estados de qualquer carregamento: **carregando**,
**erro** e **pronto**.

**O que fazer:**

1. `src/api.ts` — implemente `listarAlunos()`: `await esperar(500)` e devolva o
   "banco em memória" (leia os comentários do arquivo).
2. No componente que mostra a lista:
   - um `useState` para a lista de alunos;
   - um `useState` para `carregando` e um para `erro`;
   - um **`useEffect` com array de dependências vazio (`[]`)** que chama
     `listarAlunos()` **uma vez**, ao abrir a tela;
   - renderize a lista com **`.map()`**, com `key={aluno.id}`.
3. Trate os três estados na tela: "Carregando...", a mensagem de erro
   (`try/catch`), e a lista.
4. **Estado vazio:** se não houver alunos, mostre uma mensagem — não uma tela
   em branco.

**Critérios de aceitação:**

| Ação | Resultado esperado |
|---|---|
| Abrir a página | aparece "Carregando..." por um instante, depois os cards |
| Console do navegador | sem aviso de `key` |
| Esvaziar a lista do `mock.ts` | aparece a mensagem de vazio |
| Fazer `listarAlunos` lançar erro de propósito | a tela mostra a mensagem de erro, sem quebrar |

> **Teste o erro de verdade:** ponha um `throw new Error("falhou")` no começo de
> `listarAlunos`, veja sua mensagem aparecer, e depois remova. Um app que não
> trata erro parece pronto até o dia da apresentação.

**Checklist:**
- [ ] O `useEffect` de carga tem `[]` (roda uma vez, não em loop).
- [ ] Nenhum componente importa `mock.ts` (só o `api.ts` importa).
- [ ] `.map()` com `key` única e estável (o `id`).
- [ ] Existem os estados de carregando, erro e vazio.

---

## Desafio 2 — Filtros reativos com `useState`

**Objetivo:** oferecer na tela os **mesmos três filtros da API**, combináveis.

**O que fazer:**

1. `src/types.ts` — o tipo `FiltrosAluno` (`q`, `idade_minima`,
   `media_minima`, todos opcionais).
2. `src/api.ts` — `listarAlunos(filtros?)` aplica os filtros com `.filter()`
   (`q` ignorando maiúsculas/minúsculas).
3. Na tela: controles para os três filtros, com o valor em `useState`.
4. Ao mudar um filtro, a lista se atualiza. Escolha uma das duas abordagens —
   as duas são aceitas, **mas** a segunda é a que sobrevive ao Módulo III:
   - **(a)** filtrar a lista já carregada no próprio componente;
   - **(b)** um `useEffect` com `[filtros]` que chama `listarAlunos(filtros)`
     de novo — é o que acontece com a API real
     (`GET /alunos?q=ana&idade_minima=18`).
5. Mostre a **contagem** de resultados (ex.: "4 alunos encontrados").

**Critérios de aceitação:**

| Ação | Resultado esperado |
|---|---|
| Digitar "an" na busca | só alunos cujo nome contém "an" (maiúsc./minúsc. indiferente) |
| Idade mínima 18 | só alunos com idade ≥ 18 |
| Média mínima 7 | só alunos com média ≥ 7 |
| Busca **+** idade mínima juntas | só quem satisfaz **as duas** |
| Filtro que não casa com ninguém | mensagem de "nenhum aluno encontrado" |
| Limpar os filtros | a lista completa volta |

**Checklist:**
- [ ] Os três filtros existem e são combináveis.
- [ ] A busca por nome ignora maiúsculas/minúsculas.
- [ ] O estado é sempre alterado via `set...` (nunca `filtros.q = "x"`).
- [ ] A lista exibida é **derivada** — não existe um segundo `useState` com uma
      cópia dos alunos filtrados.
- [ ] A contagem de resultados aparece e está correta.

---

## Desafio 3 — Cadastro com formulário controlado (e exclusão)

**Objetivo:** criar aluno pela tela, com um **formulário controlado**,
respeitando as **regras de negócio da API**.

**O que fazer:**

1. `src/api.ts` — `criarAluno(dados: AlunoEntrada)` e `excluirAluno(id)`.
   `criarAluno` deve **lançar erro** se a matrícula já existir (é o `409`).
2. Um componente de formulário com os campos `nome`, `idade`, `matricula` e
   `media`, cada um **controlado**: `value={estado}` +
   `onChange={(e) => setEstado(e.target.value)}`.
3. No `onSubmit`: `evento.preventDefault()`, valide, chame o `api.ts`,
   **atualize a lista de forma imutável** (`setAlunos([...alunos, novo])`) e
   **limpe os campos**.
4. **Validações na tela** (o `422` da API): nome não vazio, idade entre 0 e
   120, média entre 0 e 10, matrícula não vazia. Nada de `alert()` — mostre a
   mensagem **na interface**, perto do campo.
5. **Erro de matrícula duplicada:** capture o erro do `api.ts` (`try/catch`) e
   mostre a mensagem, sem adicionar o aluno.
6. **Exclusão:** um botão em cada aluno que chama `excluirAluno(id)` e atualiza
   a lista (imutável: use `.filter()`, nunca `.splice()`).
7. Um **`useEffect` com `[alunos]`** que mantém o `document.title` com a
   contagem (ex.: `Portal — 7 alunos`). É o efeito que reage a mudança.

**Critérios de aceitação:**

| Ação | Resultado esperado |
|---|---|
| Cadastrar um aluno válido | o card aparece **sem recarregar a página**; campos limpos |
| Cadastrar com a matrícula de um aluno já existente | mensagem de erro; **nada** é adicionado |
| Idade 200, ou média 15 | o formulário **impede** e avisa |
| Nome vazio | o formulário **impede** e avisa |
| Excluir um aluno | ele sai da lista na hora |
| Cadastrar/excluir | o **título da aba** muda a contagem |
| Cadastrar com um filtro ativo | comportamento coerente (ou aparece, ou o filtro é limpo — sua decisão, mas sem "sumir" sem explicação) |

**Checklist:**
- [ ] Todo `input` tem `value` **e** `onChange` (é controlado).
- [ ] Tem `preventDefault()` — a página não recarrega ao enviar.
- [ ] A lista é atualizada de forma **imutável** (spread / `.filter()`; nunca
      `.push()` ou `.splice()`).
- [ ] Todo campo tem `<label htmlFor>` ligado ao `id` do input.
- [ ] Mensagens de erro aparecem na tela, não em `alert()` nem só no console.
- [ ] O `useEffect` do título tem `[alunos]` nas dependências.

---

## Etapa 4 — Identidade visual e experiência (vale nota)

Aqui é a parte **livre** — e ela é avaliada. Um portal que funciona mas é feio
e confuso não é um bom trabalho.

Faça o portal **parecer um sistema de verdade**:

- **Tema próprio:** escolha uma paleta (use as variáveis do `:root`) e uma
  tipografia. Fuja do "HTML cru" e do azul padrão que veio no esqueleto.
- **Hierarquia visual:** o que é mais importante deve chamar mais atenção.
- **Feedback:** `:hover` e `:focus` visíveis nos elementos clicáveis; estados
  de carregando e vazio bem resolvidos.
- **Responsivo:** pelo menos uma `@media` — no celular o layout empilha e nada
  vaza para fora da tela. (Teste com o DevTools no modo dispositivo.)
- **Acessibilidade básica:** HTML semântico, `label` em todo campo, contraste
  legível.

**Checklist:**
- [ ] O tema é meu, não o do esqueleto.
- [ ] Estreitando a janela até ~400px, tudo continua legível e utilizável.
- [ ] Elementos clicáveis reagem ao mouse e ao teclado (`:hover`, `:focus`).
- [ ] O estilo está no CSS (nada de `style={{ ... }}` espalhado pelo JSX).

---

## Bônus (opcionais — até +1,0 na nota final)

- **Disciplinas:** `listarDisciplinas()` + uma seção/aba listando disciplinas.
- **Matrículas:** matricular um aluno numa disciplina e mostrar as disciplinas
  dele (o `JOIN` da API, feito aqui com `.filter()` + `.map()`).
- **Edição:** `PATCH` — editar um aluno já cadastrado.
- **Ordenação:** ordenar a lista por nome ou por média (crescente/decrescente).
- **Persistência local:** um `useEffect` que salva no `localStorage` e recarrega
  ao abrir (os dados sobrevivem ao F5).
- **Componente reutilizável:** um `<Campo />` genérico que padroniza
  label + input + mensagem de erro do formulário.
- **Confirmação de exclusão:** um diálogo antes de excluir.
- **Deploy:** publique (Vercel, Netlify ou GitHub Pages) e coloque o link no
  `README.md`.

---

## Rubrica de avaliação (nota 0–10)

| Item | Pontos | O que se avalia |
|---|---:|---|
| **Etapa 0 — Fundação** | 2,0 | Tipos fiéis ao contrato; mock variado; componentes com props tipadas; condicional no card |
| **Desafio 1 — `useEffect` + lista** | 2,0 | Carga via `api.ts` com `[]`; `.map()` com `key`; estados de carregando/erro/vazio |
| **Desafio 2 — Filtros com `useState`** | 1,5 | Três filtros combináveis; busca sem diferenciar maiúsculas; lista derivada |
| **Desafio 3 — Formulário controlado** | 1,5 | `value`+`onChange` em todos os campos; `preventDefault`; validações; matrícula duplicada tratada; exclusão |
| **Coerência com o contrato da API** | 1,0 | Campos e tipos exatos (`matricula: string`, `carga_horaria`); componentes não importam `mock.ts`; funções do `api.ts` no formato do futuro `fetch` |
| **Identidade visual e UX** | 1,0 | Tema próprio, hierarquia, responsividade, feedback de interação |
| **Qualidade do código** | 0,5 | Componentes pequenos e com uma responsabilidade; sem `any`; imutabilidade; sem código morto |
| **Uso do Git** | 0,5 | Histórico com commits pequenos e descritivos |
| **Bônus** | +1,0 | Qualquer bônus bem feito (teto de +1,0 na nota final) |

> **Pré-requisito:** o projeto precisa **subir** (`npm run dev`) e o
> **`npm run build` precisa passar**. Sem isso, não há como avaliar o resto.

---

## Como entregar

1. Trabalhe no **seu** repositório (criado a partir deste template).
2. **Vários commits descritivos** ao longo do caminho — não um só no final. O
   histórico mostra como você construiu.
3. `npm run build` passando e console do navegador limpo.
4. O `README.md` com o print da sua tela e como rodar o projeto.
5. **Nunca** comite o `node_modules/` (já está no `.gitignore`).
6. Entregue o **link do repositório**.
