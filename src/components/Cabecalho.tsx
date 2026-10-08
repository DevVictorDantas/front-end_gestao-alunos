function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho__marca">
        <span className="cabecalho__sigla">PGE</span>
        <div>
          <h1>Portal de Gestão Escolar</h1>
        </div>
      </div>
      <nav className="menu" aria-label="Seções do portal">
        <a onClick={() => {}}>Alunos</a>
      </nav>
    </header>
  );
}

export default Cabecalho;
