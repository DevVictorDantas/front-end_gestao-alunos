export interface Aluno {
  id: number;
  nome: string;
  idade: number;
  matricula: string;
  media: number;
}

// TODO 2: complete a interface AlunoEntrada — o que o FORMULÁRIO envia para criar
//   um aluno. É igual ao Aluno, MENOS o id (quem gera o id é o banco).
//   DICA: você pode escrever à mão ou usar `Omit<Aluno, "id">`.
export type AlunoEntrada = Omit<Aluno, "id">;

export interface FiltrosAluno {
  q?: string;
  idadeMin?: number;
  mediaMin?: number;
}
