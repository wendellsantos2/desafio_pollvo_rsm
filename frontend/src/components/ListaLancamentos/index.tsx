import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { Lancamento } from "../../interfaces/lancamento.types";
import ModalConfirmacao from "../ModalConfirmacao";

interface TabelaProps {
  lancamentos: Lancamento[];
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function TabelaLancamentos({
  lancamentos,
  onEditar,
  onExcluir,
}: TabelaProps) {
  if (lancamentos.length === 0) {
    return (
      <Paper
        sx={{
          padding: "1rem",
          textAlign: "center",
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        Nenhum lançamento encontrado.
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Descrição</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Valor
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lancamentos.map((l) => (
            <LinhaLancamento
              key={l.id}
              lancamento={l}
              onEditar={onEditar}
              onExcluir={onExcluir}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface LinhaLancamentoProps {
  lancamento: Lancamento;
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

function LinhaLancamento({ lancamento, onEditar, onExcluir }: LinhaLancamentoProps) {
  const [abrirConfirmacao, setAbrirConfirmacao] = useState(false);
 
  const corValor = lancamento.tipo === "Despesa" ? "error.main" : "success.main";

  
  const valorFormatado = lancamento.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const dataFormatada = new Date(lancamento.data).toLocaleDateString("pt-BR");

  return (
    <>
      <TableRow hover>
        <TableCell>{lancamento.descricao}</TableCell>
        <TableCell align="right" sx={{ color: corValor, fontWeight: 600 }}>
          {valorFormatado}
        </TableCell>
        <TableCell>{lancamento.tipo}</TableCell>
        <TableCell>{dataFormatada}</TableCell>
        <TableCell align="center">
          <IconButton
            color="primary"
            size="small"
            onClick={() => onEditar(lancamento)}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => setAbrirConfirmacao(true)}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>

      {abrirConfirmacao && (
        <ModalConfirmacao
          open={abrirConfirmacao}
          titulo="Deseja realmente excluir o lançamento?"
          mensagem={`Descrição: ${lancamento.descricao}
Valor: ${lancamento.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
Tipo: ${lancamento.tipo}
Data: ${new Date(lancamento.data).toLocaleDateString("pt-BR")}`}
          onConfirmar={() => {
            onExcluir(lancamento.id);
            setAbrirConfirmacao(false);
          }}
          onCancelar={() => setAbrirConfirmacao(false)}
        />
      )}
    </>
  );
}
