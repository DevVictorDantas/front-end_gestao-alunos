import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho";
import type { Pagina } from "./components/Cabecalho";
import PaginaAlunos from "./components/PaginaAlunos";
import PaginaUsuarios from "./components/PaginaUsuarios";
import TelaLogin from "./components/TelaLogin";
import { buscarUsuarioLogado, logout } from "./api";
import { estaLogado } from "./auth";
import { aoExpirarSessao } from "./http";
import type { Usuario } from "./types";

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [verificando, setVerificando] = useState(true);
  const [pagina, setPagina] = useState<Pagina>("inicio");

  useEffect(() => {
    aoExpirarSessao(() => {
      setUsuario(null);
      setPagina("inicio");
      setVerificando(false); // caso a sessão caia ainda no F5
    });
  }, []);

  useEffect(() => {
    async function conferirSessao() {
      if (!estaLogado()) {
        setVerificando(false);
        return;
      }

      try {
        setUsuario(await buscarUsuarioLogado());
      } catch {
        setUsuario(null);
      } finally {
        setVerificando(false);
      }
    }

    conferirSessao();
  }, []);

  async function aoEntrar() {
    setUsuario(await buscarUsuarioLogado());
  }

  function sair() {
    logout();
    setUsuario(null);
    setPagina("inicio");
  }

  if (verificando) {
    return <div className="carregando">Carregando...</div>;
  }

  if (!usuario) {
    return <TelaLogin onEntrou={aoEntrar} />;
  }

  return (
    <div className="app">
      <Cabecalho paginaAtual={pagina} onNavegar={setPagina} onSair={sair} />
      <main className="conteudo">
        {pagina === "alunos" ? (
          <PaginaAlunos />
        ) : pagina === "usuarios" ? (
          <PaginaUsuarios idUsuarioLogado={usuario.id} />
        ) : (
          <section className="pagina boas-vindas">
            <h2>Olá, {usuario.nome}!</h2>
            <p>Gerencie os alunos do portal: cadastre, atualize e remova registros.</p>
            <button type="button" className="botao" onClick={() => setPagina("alunos")}>
              Ver alunos
            </button>
          </section>
        )}
      </main>
      <footer className="rodape">
        <p>Portal Gestao Alunos</p>
      </footer>
    </div>
  );
}

export default App;
