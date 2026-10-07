# Comece aqui — guia do aluno

Este é o seu roteiro do começo ao fim: **preparar → entender → construir →
conferir → entregar**. Siga na ordem.

## O que é este trabalho

Você recebeu um projeto **React + TypeScript** que **já roda**, mas está
**vazio**: a pasta `src/components/` não tem um único componente. Seu trabalho é
**construir o frontend inteiro** do Portal de Gestão Escolar — os componentes, os
estados (`useState`), os efeitos (`useEffect`) e o formulário controlado.

Duas coisas para entender antes de tudo:

1. **O formato dos dados é fixo.** Ele é o da API que você fez no Módulo I. Está
   em [CONTRATO_API.md](CONTRATO_API.md). No **Módulo III** este frontend vai
   consumir aquela API de verdade — seguir o contrato agora é o que vai fazer a
   integração ser fácil depois.
2. **O resto é livre.** Layout, cores, nomes de componentes, cards ou tabela: é
   você quem decide. Não existe um gabarito de tela, e a apresentação vale nota.

> **Você não precisa da API rodando.** Nada de PostgreSQL ou `uvicorn` aqui. Os
> dados vêm de um arquivo de mentira (`src/mock.ts`) que você mesmo preenche.

---

## Etapa 1 — Crie o SEU repositório

Não trabalhe no repositório do professor.

1. Na página do template no GitHub, clique em **"Use this template" → "Create a
   new repository"**.
2. Dê um nome, crie, e clone o **seu** repositório.

---

## Etapa 2 — Prepare o ambiente

Siga o **[INSTALACAO.md](INSTALACAO.md)** — ele instala tudo (Git, Node.js,
npm, VS Code) e vai do zero até o projeto rodando. Em resumo, depois de clonar
o SEU repositório:

```bash
npm install     # baixa as dependências (uma vez só, demora um pouco)
npm run dev     # sobe o servidor; abra o endereço que aparecer
```

Deve abrir uma página com o título do portal e uma lista de instruções. **Essa
tela é provisória** — ela existe só para provar que o ambiente funciona, e você
vai apagá-la na Etapa 0 do trabalho.

**Checklist da Etapa 2:**
- [ ] `node -v` mostra uma versão (v20 ou mais nova)
- [ ] `npm install` terminou sem erro
- [ ] `npm run dev` abre a página provisória no navegador
- [ ] `npm run build` passa

> Deixe o `npm run dev` **rodando** enquanto trabalha. A cada arquivo salvo, o
> navegador se atualiza sozinho.

---

## Etapa 3 — Entenda o projeto (antes de codar)

Abra e leia, nesta ordem:

1. **[CONTRATO_API.md](CONTRATO_API.md)** — o formato dos dados. É a sua
   especificação; você não inventa campos.
2. **[DESAFIOS.md](DESAFIOS.md)** — o enunciado oficial: as etapas, os
   critérios de aceitação e a **rubrica de nota**.
3. Os arquivos de `src/`, para ver onde cada coisa mora:

| Arquivo | Papel | Estado |
|---|---|---|
| `src/main.tsx` | liga o React na página | **pronto** — não mexa |
| `src/types.ts` | as interfaces dos dados | **esqueleto** (`TODO`) |
| `src/mock.ts` | os dados de mentira | **esqueleto** (`TODO`) |
| `src/api.ts` | a fronteira com o backend | **esqueleto** (`TODO`) |
| `src/App.tsx` | compõe a tela | **esqueleto** (+ tela provisória) |
| `src/components/` | seus componentes | **vazio** — leia o README de lá |
| `src/index.css` | reset + variáveis | quase vazio: o tema é seu |

**A arquitetura em uma frase:** os componentes chamam o `api.ts`, e **só** o
`api.ts` conhece a origem dos dados. Nenhum componente importa o `mock.ts`.
É essa fronteira que, no Módulo III, vira o `fetch`.

---

## Etapa 4 — Construa (na ordem certa)

Siga as etapas do `DESAFIOS.md` — cada uma depende da anterior:

1. **Etapa 0 — Fundação:** tipos, mock, cabeçalho e card com props. Apague a
   tela provisória.
2. **Desafio 1 — `useEffect` + lista:** dados via `api.ts`, com carregando,
   erro e vazio.
3. **Desafio 2 — Filtros:** os três filtros da API, com `useState`.
4. **Desafio 3 — Formulário controlado:** cadastrar e excluir aluno.
5. **Etapa 4 — Visual e UX:** deixe com a sua cara (isso vale nota).

**Como trabalhar sem travar:**
- **Um componente de cada vez**, e olhe o navegador a cada passo.
- Erro vermelho na tela do Vite? Leia: ele diz o arquivo e a linha.
- Tela branca? Abra o **console** (F12) — o erro está lá.
- Sublinhado vermelho no VS Code é **erro de tipo**: resolva na hora, senão o
  `npm run build` vai reclamar no fim.
- Trave num conceito? Volte aos demos das aulas 12–14 (mas **não copie o
  projeto da aula**: o domínio é o mesmo, e copiar aparece na correção).

---

## Etapa 5 — Confira o seu trabalho

Não existe teste automatizado — a conferência é sua, em três passos:

1. `npm run build` **passa** (é obrigatório).
2. O **console do navegador** (F12) está limpo: sem erros, sem aviso de `key`.
3. Percorra os **critérios de aceitação e os checklists** de cada etapa no
   `DESAFIOS.md`, clicando na sua própria tela.

E o teste do "usuário chato", que pega quase todo bug:

- Enviar o formulário **vazio**.
- Cadastrar duas vezes a **mesma matrícula**.
- Idade **200**, média **15**, nome só com espaços.
- **Todos** os filtros ativos ao mesmo tempo, filtrando ninguém.
- **Excluir** o último aluno da lista (a tela vazia está tratada?).
- Estreitar a janela até um **celular**.

---

## Etapa 6 — Versione com Git (durante todo o caminho)

Não deixe para commitar tudo no fim. Faça **commits pequenos e descritivos** à
medida que avança:

```bash
git add .
git commit -m "Cria card de aluno com props tipadas (Etapa 0)"
git push
```

Sugestão: um commit por etapa concluída, ou por componente criado.

> O `node_modules/` **não** vai para o Git (já está no `.gitignore`). Se o seu
> `git status` mostrar milhares de arquivos, algo está errado — confira o
> `.gitignore` antes de commitar.

---

## Etapa 7 — Entregue o trabalho

Antes de entregar, confira:

- [ ] `npm install` + `npm run dev` funcionam **num clone limpo** do repositório.
- [ ] `npm run build` passa.
- [ ] Os checklists das etapas que você concluiu estão marcados.
- [ ] Não sobrou nada da tela provisória nem `TODO` de esqueleto sem resolver.
- [ ] O `README.md` explica como rodar e tem um **print da sua tela**.
- [ ] Há **vários commits** descrevendo a evolução.
- [ ] Você fez `git push` de tudo.

**O que entregar:** o **link do seu repositório** no GitHub. (Prazo e onde
enviar, seu professor combina com a turma.)

---

## Dicas finais

- **Comece cedo.** A Etapa 0 é curta, mas é a fundação de todo o resto.
- **Um passo de cada vez.** Implemente, veja no navegador, commite. Repita.
- **Capriche no visual.** Funciona **e** é bonito — as duas coisas valem nota.
- **Quer nota extra?** Veja os bônus no `DESAFIOS.md` (disciplinas, matrículas,
  `localStorage`, deploy...).
