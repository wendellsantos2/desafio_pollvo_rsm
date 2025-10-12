import { useEffect, useState } from "react";
import ListaLancamentos from "./components/ListaLancamentos";
 
import { lancamentoService } from "./services/lancamentoService";
import "./App.css";
import { Lancamento } from "./types/lancamento.types";

function App() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Função para carregar os dados da API
  async function carregarLancamentos() {
    setCarregando(true);
    try {
      const lista = await lancamentoService.listar();
      setLancamentos(lista);
      setErro(null);
    } catch (e: any) {
      setErro(e.message || "Erro ao carregar lançamentos");
    } finally {
      setCarregando(false);
    }
  }

  // Executa uma vez ao montar o componente
  useEffect(() => {
    carregarLancamentos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lançamentos Financeiros</h1>

        {carregando && <p>Carregando dados...</p>}
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {!carregando && !erro && (
          <ListaLancamentos
            lancamentos={lancamentos}
            onEditar={() => {}}
            onExcluir={() => {}}
          />
        )}
      </header>
    </div>
  );
}

export default App;
