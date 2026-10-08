import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho";
import TelaLogin from "./components/TelaLogin";
import { buscarUsuarioLogado } from "./api";
import { estaLogado } from "./auth";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    async function conferirSessao() {
      if (!estaLogado()) {
        setVerificando(false);
        return;
      }

      try {
        const usuario = await buscarUsuarioLogado();
        setUsername(usuario.username);
      } catch {
        setUsername(null);
      } finally {
        setVerificando(false);
      }
    }

    conferirSessao();
  }, []);

  async function aoEntrar() {
    const usuario = await buscarUsuarioLogado();
    setUsername(usuario.username);
  }

  if (verificando) {
    return <div className="carregando">Carregando...</div>;
  }

  if (!username) {
    return <TelaLogin onEntrou={aoEntrar} />;
  }

  return (
    <div className="app">
      <Cabecalho />
      <footer className="rodape">
        <p>Portal Gestao Alunos</p>
      </footer>
    </div>
  );
}

export default App;
