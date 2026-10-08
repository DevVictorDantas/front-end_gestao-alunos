import type { Usuario } from "../types";
import UsuarioLinha from "./UsuarioLinha";

interface ListaUsuariosProps {
  usuarios: Usuario[];
  idUsuarioLogado: number;
  idExcluindo: number | null;
  onExcluir: (usuario: Usuario) => void;
}

function ListaUsuarios({ usuarios, idUsuarioLogado, idExcluindo, onExcluir }: ListaUsuariosProps) {
  if (usuarios.length === 0) {
    return <p className="mensagem">Nenhum usuário cadastrado.</p>;
  }

  return (
    <div className="tabela-container">
      <table className="tabela">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Usuário</th>
            <th scope="col">Criado em</th>
            <th scope="col" className="tabela__acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <UsuarioLinha
              key={usuario.id}
              usuario={usuario}
              ehVoce={usuario.id === idUsuarioLogado}
              excluindo={idExcluindo === usuario.id}
              onExcluir={onExcluir}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;
