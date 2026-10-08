import { useState } from "react";

export type Pagina = "inicio" | "alunos" | "usuarios";

interface CabecalhoProps {
  paginaAtual: Pagina;
  onNavegar: (pagina: Pagina) => void;
  onSair: () => void;
}

function Cabecalho({ paginaAtual, onNavegar, onSair }: CabecalhoProps) {
  const [recolhida, setRecolhida] = useState(false);

  return (
    <header className={`cabecalho ${recolhida ? "cabecalho--recolhida" : ""}`}>
      <div className="cabecalho__topo">
        <button
          type="button"
          className="cabecalho__marca"
          onClick={() => onNavegar("inicio")}
          title="Início"
        >
          <span className="cabecalho__sigla">PGE</span>
          <h1>Portal de Gestão Escolar</h1>
        </button>
        <button
          type="button"
          className="cabecalho__alternar"
          onClick={() => setRecolhida(!recolhida)}
          aria-label={recolhida ? "Expandir menu" : "Recolher menu"}
          aria-expanded={!recolhida}
          title={recolhida ? "Expandir menu" : "Recolher menu"}
        >
          {recolhida ? "»" : "«"}
        </button>
      </div>

      <nav className="menu" aria-label="Seções do portal">
        <button
          type="button"
          className="menu__item"
          aria-current={paginaAtual === "alunos" ? "page" : undefined}
          onClick={() => onNavegar("alunos")}
          title="Alunos"
        >
          <svg className="menu__icone" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
            <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.7 3.5 2.8 3.5 5.7" />
          </svg>
          <span className="menu__rotulo">Alunos</span>
        </button>
        <button
          type="button"
          className="menu__item"
          aria-current={paginaAtual === "usuarios" ? "page" : undefined}
          onClick={() => onNavegar("usuarios")}
          title="Usuários"
        >
          <svg className="menu__icone" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10" cy="8" r="3.5" />
            <path d="M3.5 20c0-3.6 2.9-6 6.5-6 1.4 0 2.7.4 3.7 1" />
            <path d="M18 14v6M15 17h6" />
          </svg>
          <span className="menu__rotulo">Usuários</span>
        </button>
      </nav>

      <button type="button" className="menu__item cabecalho__sair" onClick={onSair} title="Sair">
        <svg className="menu__icone" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5M21 12H9" />
        </svg>
        <span className="menu__rotulo">Sair</span>
      </button>
    </header>
  );
}

export default Cabecalho;
