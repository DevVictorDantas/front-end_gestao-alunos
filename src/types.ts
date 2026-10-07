/*
 * TIPOS (types.ts) — ESQUELETO, implemente você mesmo
 * ==================================================
 *
 * Aqui moram as INTERFACES do TypeScript que descrevem os dados do sistema.
 * Elas não são invenção sua: precisam ser o espelho fiel do que a API do
 * Módulo I devolve. O contrato está em docs/CONTRATO_API.md — é a sua
 * especificação, leia antes de escrever qualquer coisa.
 *
 * POR QUE ISSO IMPORTA: no Módulo III este mesmo projeto vai consumir a API
 * de verdade. Se os seus tipos batem com o JSON dela, a integração é só
 * trocar o mock por fetch. Se você inventar campos (ex.: "nota" em vez de
 * "media", ou "cargaHoraria" em vez de "carga_horaria"), nada encaixa.
 *
 * REGRA: nomes de campo em snake_case, exatamente como no JSON da API.
 */

// TODO 1: complete a interface Aluno com os campos da tabela `alunos`
//   (veja docs/CONTRATO_API.md). São 5 campos.
//   DICA: id: number · nome: string · matricula: string (é texto, não número!)
export interface Aluno {
  id: number;
  // TODO: complete aqui (nome, idade, matricula, media)
}

// TODO 2: crie a interface AlunoEntrada — o que o FORMULÁRIO envia para criar
//   um aluno. É igual ao Aluno, MENOS o id (quem gera o id é o banco).
//   DICA: você pode escrever à mão ou usar `Omit<Aluno, "id">`.

// TODO 3: crie a interface Disciplina com os campos da tabela `disciplinas`.
//   DICA: são 3 campos, e um deles se chama carga_horaria.

// TODO 4 (Desafio 2): crie o tipo dos FILTROS da listagem, espelhando os
//   query params da API: q, idade_minima, media_minima — todos opcionais.
//   DICA:
//     export interface FiltrosAluno {
//       q?: string;
//       idade_minima?: number;
//       media_minima?: number;
//     }
