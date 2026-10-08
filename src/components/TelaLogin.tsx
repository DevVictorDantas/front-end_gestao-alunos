import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "../api";
import { mensagemErro } from "../http";

interface TelaLoginProps {
  onEntrou: () => void;
}

function TelaLogin({ onEntrou }: TelaLoginProps) {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    try {
      setEntrando(true);
      setErro("");
      await login(username, senha);
      onEntrou();
    } catch (e) {
      setErro(mensagemErro(e));
    } finally {
      setEntrando(false);
    }
  }

  return (
    <main className="login">
      <form className="login_cartao" onSubmit={enviar} noValidate>
        <span className="login_sigla">PGE</span>
        <h1>Portal de Gestao Escolar</h1>
        <p className="login_sub">Entre para continuar</p>

        <div className="campo">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>

        {erro !== "" && (
          <p className="login_erro" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="botao" disabled={entrando}>
          {entrando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default TelaLogin;
