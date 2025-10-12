import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Lancamento } from "../../interfaces/lancamento.types";
import Item from "./Item";

interface Props {
  lancamentos: Lancamento[];
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function ListaLancamentos({ lancamentos, onEditar, onExcluir }: Props) {
  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
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
