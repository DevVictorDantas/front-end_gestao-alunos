# `src/components/` — vazio de propósito

Esta pasta está vazia porque **os componentes são seu trabalho**. Não há
arquivo para preencher: você cria cada um.

## O mínimo exigido (veja `docs/DESAFIOS.md`)

Os **nomes são sugestões** — o que vale é a responsabilidade de cada peça:

| Peça | Responsabilidade | Onde é exigida |
|---|---|---|
| `Cabecalho.tsx` | topo do portal (título, navegação) | Etapa 0 |
| `AlunoCard.tsx` | mostra **um** aluno, recebido via **props tipadas** | Etapa 0 |
| `ListaAlunos.tsx` | recebe `Aluno[]` e renderiza com `.map()` + `key` | Etapa 1 |
| `Filtros.tsx` | os controles de busca (`useState` no pai) | Desafio 2 |
| `FormAluno.tsx` | formulário **controlado** de cadastro | Desafio 3 |

Você pode criar mais componentes do que isso (e provavelmente vai: um
`Badge` de aprovado/reprovado, um `Mensagem` de erro, um `Rodape`...).

## Três regras que valem para todos

1. **Uma responsabilidade por componente.** Se um arquivo passa de ~80 linhas,
   provavelmente tem dois componentes ali dentro.
2. **Props tipadas por `interface`.** Nunca `any`.
3. **Nenhum componente importa o `mock.ts`.** Dados vêm sempre do `api.ts` —
   é isso que deixa o projeto pronto para o Módulo III.

## Lembretes de sintaxe

- Nome do componente com **letra maiúscula**; o arquivo idem.
- `className`, não `class`.
- Um `export default` por arquivo de componente.
