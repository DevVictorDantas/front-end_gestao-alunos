import { useEffect, useState } from "react";
import type { Usuario, UsuarioEntrada } from "../types";
import { criarUsuario, excluirUsuario, listarUsuarios } from "../api";
import { mensagemErro } from "../http";
import ListaUsuarios from "./ListaUsuarios";
import FormUsuario from "./FormUsuario";

interface PaginaUsuariosProps {
  idUsuarioLogado: number;
}

function PaginaUsuarios({ idUsuarioLogado }: PaginaUsuariosProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [formAberto, setFormAberto] = useState(false);
  const [idExcluindo, setIdExcluindo] = useState<number | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setUsuarios(await listarUsuarios());
      } catch (e) {
        setErro(mensagemErro(e));
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  // Erros aqui sobem para o FormUsuario, que mostra a mensagem (ex.: 409).
  async function salvar(dados: UsuarioEntrada) {
    const criado = await criarUsuario(dados);
    setUsuarios((lista) => [...lista, criado]);
    setFormAberto(false);
  }

  async function excluir(usuario: Usuario) {
    if (!window.confirm(`Deletar o usuário "${usuario.username}"?`)) return;
    try {
      setIdExcluindo(usuario.id);
      setErro("");
      await excluirUsuario(usuario.id);
      setUsuarios((lista) => lista.filter((u) => u.id !== usuario.id));
    } catch (e) {
      setErro(mensagemErro(e));
    } finally {
      setIdExcluindo(null);
    }
  }

  return (
    <section className="pagina">
      <div className="pagina__topo">
        <h2>Usuários</h2>
        <button type="button" className="botao" onClick={() => setFormAberto(true)}>
          + Novo usuário
        </button>
      </div>

      {erro !== "" && <p className="erro" role="alert">{erro}</p>}

      {carregando ? (
        <p className="mensagem">Carregando usuários...</p>
      ) : (
        <ListaUsuarios
          usuarios={usuarios}
          idUsuarioLogado={idUsuarioLogado}
          idExcluindo={idExcluindo}
          onExcluir={excluir}
        />
      )}

      {formAberto && <FormUsuario onSalvar={salvar} onCancelar={() => setFormAberto(false)} />}
    </section>
  );
}

export default PaginaUsuarios;
