interface CampoBuscaProps {
  valor: string;
  onMudar: (valor: string) => void;
}

function CampoBusca({ valor, onMudar }: CampoBuscaProps) {
  return (
    <div className="busca">
      <label htmlFor="busca-aluno" className="busca__rotulo">
        Buscar aluno
      </label>
      <input
        id="busca-aluno"
        type="search"
        placeholder="Buscar por nome ou matrícula..."
        value={valor}
        onChange={(e) => onMudar(e.target.value)}
      />
    </div>
  );
}

export default CampoBusca;
