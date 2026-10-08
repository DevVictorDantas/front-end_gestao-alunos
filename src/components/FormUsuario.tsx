import { useState } from "react";
import type { FormEvent } from "react";
import type { UsuarioEntrada } from "../types";
import { mensagemErro } from "../http";

interface FormUsuarioProps {
  onSalvar: (dados: UsuarioEntrada) => Promise<void>;
  onCancelar: () => void;
}

// Mesmas regras do schemas.py do back (UsuarioEntrada).
function validar(nome: string, username: string, senha: string, confirmacao: string): string {
  if (nome.trim() === "" || nome.length > 100) return "Nome deve ter de 1 a 100 caracteres.";
  if (username.trim() === "" || username.length > 50) return "Usuário deve ter de 1 a 50 caracteres.";
  if (senha.length < 8 || senha.length > 72) return "Senha deve ter de 8 a 72 caracteres.";
  if (senha !== confirmacao) return "As senhas não conferem.";
  return "";
}

function FormUsuario({ onSalvar, onCancelar }: FormUsuarioProps) {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    const problema = validar(nome, username, senha, confirmacao);
    if (problema) {
      setErro(problema);
      return;
    }

    try {
      setSalvando(true);
      setErro("");
      await onSalvar({ nome: nome.trim(), username: username.trim(), senha });
    } catch (e) {
      setErro(mensagemErro(e));
      setSalvando(false);
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-usuario-titulo">
      <form className="modal__cartao" onSubmit={enviar} noValidate>
        <h2 id="form-usuario-titulo">Novo usuário</h2>

        <div className="campo">
          <label htmlFor="usuario-nome">Nome completo</label>
          <input id="usuario-nome" value={nome} onChange={(e) => setNome(e.target.value)} autoFocus />
        </div>

        <div className="campo">
          <label htmlFor="usuario-username">Usuário (login)</label>
          <input id="usuario-username" value={username} autoComplete="off"
            onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="form-linha">
          <div className="campo">
            <label htmlFor="usuario-senha">Senha</label>
            <input id="usuario-senha" type="password" value={senha} autoComplete="new-password"
              onChange={(e) => setSenha(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="usuario-confirmacao">Confirmar senha</label>
            <input id="usuario-confirmacao" type="password" value={confirmacao} autoComplete="new-password"
              onChange={(e) => setConfirmacao(e.target.value)} />
          </div>
        </div>
        <p className="campo__dica">A senha deve ter de 8 a 72 caracteres.</p>

        {erro !== "" && <p className="erro" role="alert">{erro}</p>}

        <div className="modal__acoes">
          <button type="button" className="botao botao--secundario" onClick={onCancelar} disabled={salvando}>
            Cancelar
          </button>
          <button type="submit" className="botao" disabled={salvando}>
            {salvando ? "Criando..." : "Criar usuário"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormUsuario;
