import type { Aluno } from "../types";

interface AlunoLinhaProps {
  aluno: Aluno;
  excluindo: boolean;
  onEditar: (aluno: Aluno) => void;
  onExcluir: (aluno: Aluno) => void;
}

const MEDIA_APROVACAO = 7;

function AlunoLinha({ aluno, excluindo, onEditar, onExcluir }: AlunoLinhaProps) {
  const media = Number(aluno.media);
  const aprovado = media >= MEDIA_APROVACAO;

  // data-label = nome da coluna, usado no celular quando a tabela vira lista
  return (
    <tr>
      <td data-label="Matrícula">{aluno.matricula}</td>
      <td data-label="Nome" className="tabela__nome">{aluno.nome}</td>
      <td data-label="Idade" className="tabela__numero">{aluno.idade ?? "—"}</td>
      <td data-label="Média" className="tabela__numero">{media.toFixed(1)}</td>
      <td data-label="Situação">
        <span className={`badge ${aprovado ? "badge--ok" : "badge--alerta"}`}>
          {aprovado ? "Aprovado" : "Reprovado"}
        </span>
      </td>
      <td className="tabela__acoes">
        <button
          type="button"
          className="botao botao--secundario botao--pequeno"
          onClick={() => onEditar(aluno)}
          disabled={excluindo}
        >
          Atualizar
        </button>
        <button
          type="button"
          className="botao botao--perigo botao--pequeno"
          onClick={() => onExcluir(aluno)}
          disabled={excluindo}
        >
          {excluindo ? "Excluindo..." : "Deletar"}
        </button>
      </td>
    </tr>
  );
}

export default AlunoLinha;
