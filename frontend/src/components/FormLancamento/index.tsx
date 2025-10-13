import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Fade,
} from "@mui/material";
import { LancamentoFormData, Lancamento } from "../../interfaces/lancamento.types";
import { validarLancamento } from "../../utils/validacoesLancamento";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import styles from "./FormLancamento.module.scss";

interface Props {
  lancamento?: Lancamento | null;
  onSalvar: (dados: LancamentoFormData & { id?: number }) => Promise<void> | void;
  fechar: () => void;
}

export default function FormLancamento({ lancamento, onSalvar, fechar }: Props) {
  const [descricao, setDescricao] = useState(lancamento?.descricao ?? "");
  const [valor, setValor] = useState(lancamento ? String(lancamento.valor) : "");
  const [tipo, setTipo] = useState<"Receita" | "Despesa">(lancamento?.tipo ?? "Receita");
  const [data, setData] = useState(
    lancamento?.data?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
  );
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dados: LancamentoFormData = { descricao, valor: Number(valor), tipo, data };
    const novosErros = validarLancamento(dados);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) return;

    setCarregando(true);
    try {
      await onSalvar({ ...dados, id: lancamento?.id });
      fechar();
    } catch (error) {
      console.error("Erro ao salvar lançamento:", error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Fade in>
      <Paper component="form" onSubmit={handleSubmit} className={styles.form}>
        {/* Cabeçalho */}
        <Typography variant="h6" className={styles.title}>
          {lancamento ? "Editar Lançamento" : "Novo Lançamento"}
        </Typography>

        <Divider className={styles.divider} />

        <Stack spacing={2}>
          {/* Descrição */}
          <TextField
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            error={!!erros.descricao}
            helperText={erros.descricao}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <DescriptionRoundedIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />

          {/* Valor */}
          <TextField
            label="Valor (R$)"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            inputProps={{ step: "0.01", min: 0 }}
            error={!!erros.valor}
            helperText={erros.valor}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <AttachMoneyRoundedIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />

    
          <TextField
            select
            label="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "Receita" | "Despesa")}
            fullWidth
          >
            <MenuItem value="Receita">
              <SavingsRoundedIcon sx={{ mr: 1, color: "success.main" }} /> Receita
            </MenuItem>
            <MenuItem value="Despesa">
              <AttachMoneyRoundedIcon sx={{ mr: 1, color: "error.main" }} /> Despesa
            </MenuItem>
          </TextField>

       
          <TextField
            label="Data"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={data}
            onChange={(e) => setData(e.target.value)}
            error={!!erros.data}
            helperText={erros.data}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <CalendarMonthRoundedIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />

     
          <div className={styles.actions}>
            <Button
              onClick={fechar}
              variant="outlined"
              color="inherit"
              disabled={carregando}
              className={styles.btnCancelar}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={carregando}
              className={styles.btnSalvar}
            >
              {carregando ? <CircularProgress size={22} color="inherit" /> : "Salvar"}
            </Button>
          </div>
        </Stack>
      </Paper>
    </Fade>
  );
}
