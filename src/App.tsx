/*
 * COMPONENTE RAIZ (App.tsx) — ESQUELETO, implemente você mesmo
 * ===========================================================
 *
 * O App é o "quadro geral": ele COMPÕE a tela a partir dos seus componentes.
 * Regra de ouro: o App não desenha detalhes (não escreve o card, não escreve o
 * formulário). Ele só monta as peças, tipo:
 *
 *   <div className="app">
 *     <Cabecalho />
 *     <Painel />        // que por dentro tem a busca, a lista e o formulário
 *   </div>
 *
 * TODO 1: apague a tela provisória abaixo (a função TelaInicial e o uso dela).
 *         Ela existe só para o projeto subir no primeiro `npm run dev`.
 * TODO 2: crie os seus componentes em src/components/ (leia o README de lá)
 *         e componha-os aqui.
 *
 * O LAYOUT É SEU. Cabeçalho no topo ou lateral, cards ou tabela, tema claro
 * ou escuro, nomes dos componentes em português ou inglês — decisão sua. O que
 * é exigido está em docs/DESAFIOS.md; o resto é criatividade (e vale nota).
 */

function App() {
  return <TelaInicial />;
}

// ---------------------------------------------------------------------------
// APAGUE TUDO DAQUI PARA BAIXO quando começar a Etapa 0.
// (E apague também o bloco ".inicial" do src/index.css.)
// ---------------------------------------------------------------------------
function TelaInicial() {
  return (
    <div className="inicial">
      <h1>Portal de Gestão Escolar</h1>
      <p>
        O ambiente está funcionando. Agora o projeto é seu: esta tela é
        provisória e deve ser apagada.
      </p>
      <ol>
        <li>
          Leia <code>docs/COMECE_AQUI.md</code> — o roteiro do começo ao fim.
        </li>
        <li>
          Leia <code>docs/CONTRATO_API.md</code> — o formato dos dados (não
          invente campos).
        </li>
        <li>
          Faça as etapas do <code>docs/DESAFIOS.md</code>, na ordem.
        </li>
        <li>
          Comece por <code>src/types.ts</code>, depois <code>src/mock.ts</code>.
        </li>
      </ol>
      <p>
        <strong>Dica:</strong> deixe <code>npm run dev</code> rodando. A cada
        arquivo salvo, o navegador atualiza sozinho.
      </p>
    </div>
  );
}

export default App;
