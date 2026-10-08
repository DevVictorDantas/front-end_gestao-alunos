/*
 * FRONTEIRA COM O BACKEND (api.ts) — ESQUELETO, implemente você mesmo
 * ==================================================================
 *
 * Este é o arquivo mais importante do trabalho, e o motivo é o Módulo III.
 *
 * A REGRA: nenhum componente pode importar o `mock.ts`. Os componentes
 * chamam SÓ as funções deste arquivo. Hoje, essas funções devolvem os dados
 * do mock; no Módulo III, o corpo delas vira um `fetch` na API de verdade —
 * e os componentes não mudam UMA linha. É isso que separa um app que "está
 * pronto para integrar" de um que precisa ser reescrito.
 *
 * Por isso todas as funções são `async` e devolvem `Promise`, mesmo agora que
 * os dados são locais: é assim que vai ser quando forem de rede.
 *
 * -----------------------------------------------------------------------
 * COMO CADA FUNÇÃO VAI FICAR NO MÓDULO III (só para você ver o destino):
 *
 *   export async function listarAlunos(): Promise<Aluno[]> {
 *     const resposta = await fetch("http://127.0.0.1:8000/alunos");
 *     if (!resposta.ok) throw new Error("Falha ao carregar alunos");
 *     return resposta.json();
 *   }
 *
 * Repare: a ASSINATURA é a mesma que você vai escrever hoje. Só o corpo muda.
 * -----------------------------------------------------------------------
 */

// DICA — o que você vai importar aqui:
import { http } from "./http";
import type { Aluno, AlunoEntrada, FiltrosAluno, Usuario, UsuarioEntrada } from "./types";
import { limparToken, salvarToken } from "./auth";
/**
 * Simula a demora da rede (já vem pronto — use e agradeça).
 * Serve para você VER a tela de "Carregando...", que aparece e desaparece
 * rápido demais quando os dados são locais.
 *
 *   await esperar(600);   // pausa de 600 milissegundos
 */

export async function login(username: string, senha: string): Promise<void> {
  const resposta = await http.post<{ access_token: string }>("login", {
    username,
    senha,
  });

  salvarToken(resposta.data.access_token);
}

export function logout(): void {
  limparToken();
}

export async function buscarUsuarioLogado(): Promise<Usuario> {
  const resposta = await http.get<Usuario>("eu");
  return resposta.data;
}

// Exige estar logado; 409 se o username já existir.
export async function criarUsuario(usuario: UsuarioEntrada): Promise<Usuario> {
  const resposta = await http.post<Usuario>("registrar", usuario);
  return resposta.data;
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const resposta = await http.get<Usuario[]>("usuarios");
  return resposta.data;
}

export async function excluirUsuario(id: number): Promise<void> {
  await http.delete(`usuarios/${id}`);
}

// =========================== ALUNOS ===========================
//
export async function listarAlunos(
  filtros: FiltrosAluno = {},
): Promise<Aluno[]> {
  // O back espera os nomes em snake_case (idade_minima, media_minima).
  const resposta = await http.get<Aluno[]>("alunos", {
    params: {
      q: filtros.q || undefined,
      idade_minima: filtros.idadeMin,
      media_minima: filtros.mediaMin,
    },
  });
  return resposta.data;
}

export async function buscarAluno(id: number): Promise<Aluno> {
  const resposta = await http.get<Aluno>(`alunos/${id}`);
  return resposta.data;
}

export async function criarAluno(aluno: AlunoEntrada): Promise<Aluno> {
  const resposta = await http.post<Aluno>("alunos", aluno);
  return resposta.data;
}

export async function atualizarAluno(
  id: number,
  aluno: AlunoEntrada,
): Promise<Aluno> {
  const resposta = await http.patch<Aluno>(`alunos/${id}`, aluno);
  return resposta.data;
}

export async function excluirAluno(id: number): Promise<void> {
  await http.delete(`alunos/${id}`);
}
