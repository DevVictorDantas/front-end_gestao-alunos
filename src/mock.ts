/*
 * DADOS DE MENTIRA (mock.ts) — ESQUELETO, implemente você mesmo
 * ============================================================
 *
 * Enquanto o backend não está ligado (isso é o Módulo III), o app precisa de
 * dados para mostrar. Este arquivo é o "banco de dados de mentira".
 *
 * IMPORTANTE: escreva os objetos no MESMO formato que a API devolve
 * (veja docs/CONTRATO_API.md). Assim, quando trocarmos o mock por fetch,
 * nenhum componente precisa mudar.
 */

import type { Aluno } from "./types";

// TODO 1: preencha com pelo menos 6 alunos.
//   Varie os dados de propósito, para os seus filtros terem o que filtrar:
//   - algumas médias abaixo de 6 e outras acima;
//   - idades diferentes (menores e maiores de 18);
//   - nomes variados (para testar a busca por texto).
//   DICA do formato de um item:
//     { id: 1, nome: "Ana Souza", idade: 20, matricula: "2026001", media: 8.5 },
export const alunosIniciais: Aluno[] = [
  // TODO: seus alunos aqui
];

// TODO 2: crie também `disciplinasIniciais` (pelo menos 4), tipada como
//   Disciplina[]. Lembre do campo carga_horaria.
//   DICA: { id: 1, nome: "Python", carga_horaria: 40 },
