import { useState } from "react";
import {
  TableCell,
  TableRow,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { createPortal } from "react-dom"; // 👈 Importante
import { Lancamento } from "../../../interfaces/lancamento.types";
import Botao from "../../Botao";
import ModalConfirmacao from "../../ModalConfirmacao";

interface Props {
  lancamento: Lancamento;
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function Item({ lancamento, onEditar, onExcluir }: Props) {
  const [confirmarAberto, setConfirmarAberto] = useState(false);
  const [snackbarAberto, setSnackbarAberto] = useState(false);
  const corValor = lancamento.tipo === "Despesa" ? "error.main" : "success.main";

  const handleExcluir = () => {
    onExcluir(lancamento.id);
    setConfirmarAberto(false);
    setSnackbarAberto(true);
  };

  return (
    <>
      {/* ✅ Linha da tabela */}
      <TableRow hover>
        <TableCell>{lancamento.descricao}</TableCell>
        <TableCell sx={{ color: corValor }}>
          R$ {lancamento.valor.toFixed(2)}
        </TableCell>
        <TableCell>{lancamento.tipo}</TableCell>
        <TableCell>
          {new Date(lancamento.data).toLocaleDateString("pt-BR")}
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1}>
            <Botao tipo="primario" onClick={() => onEditar(lancamento)}>
              Editar
            </Botao>
            <Botao tipo="perigo" onClick={() => setConfirmarAberto(true)}>
              Excluir
            </Botao>
          </Stack>
        </TableCell>
      </TableRow>


      {createPortal(
        <>
          {confirmarAberto && (
            <ModalConfirmacao
              open={confirmarAberto}
              titulo="Confirmar Exclusão"
              mensagem={`Tem certeza que deseja excluir o lançamento "${lancamento.descricao}"? Esta ação não poderá ser desfeita.`}
              onConfirmar={handleExcluir}
              onCancelar={() => setConfirmarAberto(false)}
            />
          )}

          <Snackbar
            open={snackbarAberto}
            autoHideDuration={3000}
            onClose={() => setSnackbarAberto(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity="success"
              onClose={() => setSnackbarAberto(false)}
              sx={{ width: "100%" }}
            >
              Lançamento excluído com sucesso!
            </Alert>
          </Snackbar>
        </>,
        document.body 
      )}
    </>
  );
}
