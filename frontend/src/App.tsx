import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import Saldo from "./components/Saldo";
import ListaLancamentos from "./components/ListaLancamentos";
import Modal from "./components/Modal";
import FormLancamento from "./components/FormLancamento";
import Botao from "./components/Botao";
import { lancamentoService } from "./services/lancamentoService";
import { Lancamento, LancamentoFormData } from "./interfaces/lancamento.types";
import "./App.css";

export default function App() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [saldo, setSaldo] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Lancamento | null>(null);

  const carregar = useCallback(async () => {
    try {
      const [lista, total] = await Promise.all([
        lancamentoService.listar(),
        lancamentoService.saldo(),
      ]);
      setLancamentos(lista);
      setSaldo(total);
    } catch (error) {
      console.error("Erro ao carregar lançamentos:", error);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const fecharModal = () => {
    setModalAberto(false);
    setEditando(null);
  };

  const handleSalvar = async (dados: LancamentoFormData & { id?: number }) => {
    try {
      dados.id
        ? await lancamentoService.atualizar(dados.id, dados)
        : await lancamentoService.criar(dados);

      fecharModal();
      carregar();
    } catch (error) {
      console.error("Erro ao salvar lançamento:", error);
    }
  };

  const handleExcluir = async (id: number) => {
    try {
      await lancamentoService.excluir(id);
      carregar();
    } catch (error) {
      console.error("Erro ao excluir lançamento:", error);
    }
  };

  const handleEditar = (l: Lancamento) => {
    setEditando(l);
    setModalAberto(true);
  };

  return (
    <div className="App">
      <Header />
      <Saldo valor={saldo} />

      <Botao tipo="primario" onClick={() => setModalAberto(true)}>
        + Novo Lançamento
      </Botao>

      <ListaLancamentos
        lancamentos={lancamentos}
        onEditar={handleEditar}
        onExcluir={handleExcluir}
      />

      {modalAberto && (
    <Modal open={modalAberto} onClose={fecharModal}>
  <FormLancamento
    lancamento={editando}
    onSalvar={handleSalvar}
    fechar={fecharModal}
  />
</Modal>

      )}
    </div>
  );
}
