import { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  Fade,
  Divider,
  Paper,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Header from "./components/Navbar";
import Saldo from "./components/Saldo";
import ListaLancamentos from "./components/ListaLancamentos";
import Modal from "./components/Modal";
import FormLancamento from "./components/FormLancamento";
import Alerta from "./components/Alerta"; // ✅ Import do novo componente
import { lancamentoService } from "./services/lancamentoService";
import { Lancamento, LancamentoFormData } from "./interfaces/lancamento.types";
import "./App.css";

export default function App() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [saldo, setSaldo] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Lancamento | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [aviso, setAviso] = useState<{ mensagem: string; tipo: "success" | "error" } | null>(null);

  // 🔹 Função auxiliar para mostrar mensagens
  const mostrarAviso = (mensagem: string, tipo: "success" | "error" = "success") => {
    setAviso({ mensagem, tipo });
  };

  // 🔹 Carrega lista e saldo
  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [lista, total] = await Promise.all([
        lancamentoService.listar(),
        lancamentoService.saldo(),
      ]);
      setLancamentos(lista);
      setSaldo(total);
    } catch (error) {
      console.error("Erro ao carregar lançamentos:", error);
      mostrarAviso("Erro ao carregar lançamentos.", "error");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const fecharModal = () => {
    setModalAberto(false);
    setEditando(null);
  };

  // 🔹 Salvar (criar ou atualizar)
  const handleSalvar = async (dados: LancamentoFormData & { id?: number }) => {
    try {
      if (dados.id) {
        await lancamentoService.atualizar(dados.id, dados);
        mostrarAviso("Lançamento atualizado com sucesso!");
      } else {
        await lancamentoService.criar(dados);
        mostrarAviso("Lançamento criado com sucesso!");
      }
      fecharModal();
      carregar();
    } catch (error) {
      console.error("Erro ao salvar lançamento:", error);
      mostrarAviso("Erro ao salvar lançamento.", "error");
    }
  };

  // 🔹 Excluir
  const handleExcluir = async (id: number) => {
    try {
      await lancamentoService.excluir(id);
      mostrarAviso("Lançamento excluído com sucesso!");
      carregar();
    } catch (error) {
      console.error("Erro ao excluir lançamento:", error);
      mostrarAviso("Erro ao excluir lançamento.", "error");
    }
  };

  // 🔹 Editar
  const handleEditar = (l: Lancamento) => {
    setEditando(l);
    setModalAberto(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef3f8 0%, #f5f7fa 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: "#1e293b",
              textAlign: "center",
              letterSpacing: 0.2,
            }}
          >
            💰 Painel Financeiro
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            Gerencie suas receitas e despesas com facilidade.
          </Typography>

          <Divider sx={{ mb: 3, opacity: 0.2 }} />

          <Saldo valor={saldo} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setModalAberto(true)}
              sx={{
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                boxShadow: "0 3px 10px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              Novo Lançamento
            </Button>
          </Box>

          <Fade in={!carregando} timeout={400}>
            <Box>
              {carregando ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                >
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                <ListaLancamentos
                  lancamentos={lancamentos}
                  onEditar={handleEditar}
                  onExcluir={handleExcluir}
                />
              )}
            </Box>
          </Fade>
        </Paper>
      </Container>
 
      <Modal open={modalAberto} onClose={fecharModal}>
        <FormLancamento
          lancamento={editando}
          onSalvar={handleSalvar}
          fechar={fecharModal}
        />
      </Modal>

 
      {aviso && (
        <Alerta
          mensagem={aviso.mensagem}
          tipo={aviso.tipo}
          aberto={!!aviso}
          onFechar={() => setAviso(null)}
        />
      )}
    </Box>
  );
}
