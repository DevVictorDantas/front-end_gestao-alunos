import { useEffect, useState } from "react";
import type { Aluno, AlunoEntrada } from "../types";
import { atualizarAluno, criarAluno, excluirAluno, listarAlunos } from "../api";
import { mensagemErro } from "../http";
import ListaAlunos from "./ListaAlunos";
import FormAluno from "./FormAluno";
import CampoBusca from "./CampoBusca";

// undefined = formulário fechado; null = cadastro; Aluno = edição
type EstadoForm = Aluno | null | undefined;

function PaginaAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [form, setForm] = useState<EstadoForm>(undefined);
  const [idExcluindo, setIdExcluindo] = useState<number | null>(null);
  const [busca, setBusca] = useState("");

  // Busca na API 300 ms depois da última tecla (evita uma chamada por letra).
  useEffect(() => {
    let atual = true; // ignora respostas de buscas que já foram substituídas

    const espera = setTimeout(async () => {
      try {
        setCarregando(true);
        setErro("");
        const lista = await listarAlunos({ q: busca.trim() });
        if (atual) setAlunos(lista);
      } catch (e) {
        if (atual) setErro(mensagemErro(e));
      } finally {
        if (atual) setCarregando(false);
      }
    }, 300);

    return () => {
      atual = false;
      clearTimeout(espera);
    };
  }, [busca]);

  // Erros aqui sobem para o FormAluno, que mostra a mensagem (ex.: 409).
  async function salvar(dados: AlunoEntrada) {
    if (form) {
      const atualizado = await atualizarAluno(form.id, dados);
      setAlunos((lista) => lista.map((a) => (a.id === atualizado.id ? atualizado : a)));
    } else {
      const criado = await criarAluno(dados);
      setAlunos((lista) => [...lista, criado]);
    }
    setForm(undefined);
  }

  async function excluir(aluno: Aluno) {
    if (!window.confirm(`Deletar o aluno "${aluno.nome}"?`)) return;
    try {
      setIdExcluindo(aluno.id);
      setErro("");
      await excluirAluno(aluno.id);
      setAlunos((lista) => lista.filter((a) => a.id !== aluno.id));
    } catch (e) {
      setErro(mensagemErro(e));
    } finally {
      setIdExcluindo(null);
    }
  }

  return (
    <section className="pagina">
      <div className="pagina__topo">
        <h2>Alunos</h2>
        <button type="button" className="botao" onClick={() => setForm(null)}>
          + Cadastrar aluno
        </button>
      </div>

      <CampoBusca valor={busca} onMudar={setBusca} />

      {erro !== "" && <p className="erro" role="alert">{erro}</p>}

      {/* "Carregando" só na primeira carga; nas buscas a tabela fica na tela */}
      {carregando && alunos.length === 0 ? (
        <p className="mensagem">Carregando alunos...</p>
      ) : (
        <ListaAlunos
          alunos={alunos}
          busca={busca.trim()}
          idExcluindo={idExcluindo}
          onEditar={setForm}
          onExcluir={excluir}
        />
      )}

      {form !== undefined && (
        <FormAluno alunoEditado={form} onSalvar={salvar} onCancelar={() => setForm(undefined)} />
      )}
    </section>
  );
}

export default PaginaAlunos;
