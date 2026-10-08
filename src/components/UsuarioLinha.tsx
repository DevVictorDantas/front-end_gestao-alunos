import type { Usuario } from "../types";

interface UsuarioLinhaProps {
  usuario: Usuario;
  ehVoce: boolean;
  excluindo: boolean;
  onExcluir: (usuario: Usuario) => void;
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function UsuarioLinha({ usuario, ehVoce, excluindo, onExcluir }: UsuarioLinhaProps) {
  return (
    <tr>
      <td data-label="Nome" className="tabela__nome">
        {usuario.nome}
        {ehVoce && <span className="badge badge--neutro">Você</span>}
      </td>
      <td data-label="Usuário">{usuario.username}</td>
      <td data-label="Criado em">{formatarData(usuario.criado_em)}</td>
      <td className="tabela__acoes">
        <button
          type="button"
          className="botao botao--perigo botao--pequeno"
          onClick={() => onExcluir(usuario)}
          disabled={ehVoce || excluindo}
          title={ehVoce ? "Você não pode deletar o próprio usuário" : undefined}
        >
          {excluindo ? "Excluindo..." : "Deletar"}
        </button>
      </td>
    </tr>
  );
}

export default UsuarioLinha;
