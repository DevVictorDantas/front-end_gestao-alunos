import type { Aluno } from "../types";
import AlunoLinha from "./AlunoLinha";

interface ListaAlunosProps {
  alunos: Aluno[];
  busca: string;
  idExcluindo: number | null;
  onEditar: (aluno: Aluno) => void;
  onExcluir: (aluno: Aluno) => void;
}

function ListaAlunos({ alunos, busca, idExcluindo, onEditar, onExcluir }: ListaAlunosProps) {
  if (alunos.length === 0) {
    return (
      <p className="mensagem">
        {busca ? `Nenhum aluno encontrado para "${busca}".` : "Nenhum aluno cadastrado ainda."}
      </p>
    );
  }

  return (
    <div className="tabela-container">
      <table className="tabela">
        <thead>
          <tr>
            <th scope="col">Matrícula</th>
            <th scope="col">Nome</th>
            <th scope="col" className="tabela__numero">Idade</th>
            <th scope="col" className="tabela__numero">Média</th>
            <th scope="col">Situação</th>
            <th scope="col" className="tabela__acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <AlunoLinha
              key={aluno.id}
              aluno={aluno}
              excluindo={idExcluindo === aluno.id}
              onEditar={onEditar}
              onExcluir={onExcluir}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlunos;
