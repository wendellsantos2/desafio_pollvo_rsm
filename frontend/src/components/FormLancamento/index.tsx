import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { LancamentoFormData, Lancamento } from "../../interfaces/lancamento.types";
import { validarLancamento } from "../../utils/validacoesLancamento";

interface Props {
  lancamento?: Lancamento | null;
  onSalvar: (dados: LancamentoFormData & { id?: number }) => Promise<void> | void;
  fechar: () => void;
}

export default function FormLancamento({ lancamento, onSalvar, fechar }: Props) {
  const [descricao, setDescricao] = useState(lancamento?.descricao ?? "");
  const [valor, setValor] = useState<string>(
    lancamento ? String(lancamento.valor) : ""
  );
  const [tipo, setTipo] = useState<"Receita" | "Despesa">(
    lancamento?.tipo ?? "Receita"
  );
  const [data, setData] = useState<string>(
    lancamento?.data?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
  );
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dados: LancamentoFormData = {
      descricao,
      valor: Number(valor),
      tipo,
      data,
    };

    // ✅ usa a função de validação personalizada
    const novosErros = validarLancamento(dados);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) return;

    setCarregando(true);
    try {
      await onSalvar({ ...dados, id: lancamento?.id });
    } catch (error) {
      console.error("Erro ao salvar lançamento:", error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, minWidth: 360 }}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        {lancamento ? "Editar Lançamento" : "Novo Lançamento"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          error={!!erros.descricao}
          helperText={erros.descricao}
          required
          fullWidth
        />

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
        />

        <TextField
          select
          label="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as "Receita" | "Despesa")}
          fullWidth
        >
          <MenuItem value="Receita">Receita</MenuItem>
          <MenuItem value="Despesa">Despesa</MenuItem>
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
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
          <Button onClick={fechar} color="inherit" disabled={carregando}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={carregando}
          >
            {carregando ? "Salvando..." : "Salvar"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
