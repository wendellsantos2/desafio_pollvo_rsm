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

interface ListaProps {
  lancamentos: Lancamento[];
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function ListaLancamentos({
  lancamentos,
  onEditar,
  onExcluir,
}: ListaProps) {
  if (lancamentos.length === 0) {
    return (
      <Paper style={{ padding: "1rem", textAlign: "center" }}>
        Nenhum lançamento encontrado.
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lancamentos.map((l) => (
            <Item key={l.id} lancamento={l} onEditar={onEditar} onExcluir={onExcluir} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface ItemProps {
  lancamento: Lancamento;
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

function Item({ lancamento, onEditar, onExcluir }: ItemProps) {
  const [abrirConfirmacao, setAbrirConfirmacao] = useState(false);
  const cor = lancamento.tipo === "Despesa" ? "red" : "green";
  const valorFormatado = lancamento.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <TableRow hover>
        <TableCell>{lancamento.descricao}</TableCell>
        <TableCell style={{ color: cor, fontWeight: 600 }}>{valorFormatado}</TableCell>
        <TableCell>{lancamento.tipo}</TableCell>
        <TableCell>{new Date(lancamento.data).toLocaleDateString("pt-BR")}</TableCell>
        <TableCell>
          <IconButton color="primary" onClick={() => onEditar(lancamento)}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => setAbrirConfirmacao(true)}>
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>

      {abrirConfirmacao && (
        <ModalConfirmacao
          open={abrirConfirmacao}
          titulo="Excluir lançamento"
          mensagem={`Deseja excluir "${lancamento.descricao}"?`}
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
