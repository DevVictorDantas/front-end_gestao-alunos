import { useState } from "react";
import type { FormEvent } from "react";
import type { Aluno, AlunoEntrada } from "../types";
import { mensagemErro } from "../http";

interface FormAlunoProps {
  alunoEditado: Aluno | null; // null = cadastro novo
  onSalvar: (dados: AlunoEntrada) => Promise<void>;
  onCancelar: () => void;
}

// Mesmas regras do schemas.py do back (AlunoEntrada).
function validar(nome: string, idade: string, matricula: string, media: string): string {
  if (nome.trim() === "" || nome.length > 100) return "Nome deve ter de 1 a 100 caracteres.";
  const idadeNum = Number(idade);
  if (idade === "" || !Number.isInteger(idadeNum) || idadeNum < 0 || idadeNum > 120)
    return "Idade deve ser um número inteiro de 0 a 120.";
  if (matricula.trim() === "" || matricula.length > 20) return "Matrícula deve ter de 1 a 20 caracteres.";
  const mediaNum = Number(media);
  if (media === "" || Number.isNaN(mediaNum) || mediaNum < 0 || mediaNum > 10)
    return "Média deve estar entre 0 e 10.";
  return "";
}

function FormAluno({ alunoEditado, onSalvar, onCancelar }: FormAlunoProps) {
  const editando = alunoEditado !== null;
  const [nome, setNome] = useState(alunoEditado?.nome ?? "");
  const [idade, setIdade] = useState(alunoEditado ? String(alunoEditado.idade) : "");
  const [matricula, setMatricula] = useState(alunoEditado?.matricula ?? "");
  const [media, setMedia] = useState(alunoEditado ? String(alunoEditado.media) : "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    const problema = validar(nome, idade, matricula, media);
    if (problema) {
      setErro(problema);
      return;
    }

    try {
      setSalvando(true);
      setErro("");
      await onSalvar({
        nome: nome.trim(),
        idade: Number(idade),
        matricula: matricula.trim(),
        media: Number(media),
      });
    } catch (e) {
      setErro(mensagemErro(e));
      setSalvando(false);
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-aluno-titulo">
      <form className="modal__cartao" onSubmit={enviar} noValidate>
        <h2 id="form-aluno-titulo">{editando ? "Atualizar aluno" : "Cadastrar aluno"}</h2>

        <div className="campo">
          <label htmlFor="aluno-nome">Nome</label>
          <input id="aluno-nome" value={nome} onChange={(e) => setNome(e.target.value)} autoFocus />
        </div>

        <div className="campo">
          <label htmlFor="aluno-matricula">Matrícula</label>
          <input
            id="aluno-matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            disabled={editando}
            title={editando ? "A matrícula não pode ser alterada" : undefined}
          />
        </div>

        <div className="form-linha">
          <div className="campo">
            <label htmlFor="aluno-idade">Idade</label>
            <input id="aluno-idade" type="number" min={0} max={120} value={idade}
              onChange={(e) => setIdade(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="aluno-media">Média</label>
            <input id="aluno-media" type="number" min={0} max={10} step={0.1} value={media}
              onChange={(e) => setMedia(e.target.value)} />
          </div>
        </div>

        {erro !== "" && <p className="erro" role="alert">{erro}</p>}

        <div className="modal__acoes">
          <button type="button" className="botao botao--secundario" onClick={onCancelar} disabled={salvando}>
            Cancelar
          </button>
          <button type="submit" className="botao" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAluno;
