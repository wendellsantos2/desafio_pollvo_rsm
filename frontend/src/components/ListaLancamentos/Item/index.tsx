import { useState } from "react";
import { TableCell, TableRow, IconButton, Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Lancamento } from "../../../interfaces/lancamento.types";
import ModalConfirmacao from "../../ModalConfirmacao";

interface Props {
  lancamento: Lancamento;
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function Item({ lancamento, onEditar, onExcluir }: Props) {
  const [confirmarAberto, setConfirmarAberto] = useState(false);
  const corValor = lancamento.tipo === "Despesa" ? "error.main" : "success.main";

  const handleExcluir = () => {
    onExcluir(lancamento.id);
    setConfirmarAberto(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{lancamento.descricao}</TableCell>

        <TableCell sx={{ color: corValor, fontWeight: 600 }}>
          R$ {lancamento.valor.toFixed(2)}
        </TableCell>

        <TableCell>{lancamento.tipo}</TableCell>

        <TableCell>
          {new Date(lancamento.data).toLocaleDateString("pt-BR")}
        </TableCell>

 
        <TableCell
          align="center"
          sx={{
            verticalAlign: "bottom",  
            pb: 1, 
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            gap={1}
          >
            <IconButton
              color="primary"
              onClick={() => onEditar(lancamento)}
              size="small"
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => setConfirmarAberto(true)}
              size="small"
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      {confirmarAberto && (
        <ModalConfirmacao
          open={confirmarAberto}
          titulo="Confirmar Exclusão"
          mensagem={`Deseja excluir "${lancamento.descricao}"?`}
          onConfirmar={handleExcluir}
          onCancelar={() => setConfirmarAberto(false)}
        />
      )}
    </>
  );
}
