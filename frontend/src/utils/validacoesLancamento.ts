import { LancamentoFormData } from "../interfaces/lancamento.types";

export function validarLancamento(dados: LancamentoFormData) {
  const erros: Record<string, string> = {};

  if (!dados.descricao.trim()) {
    erros.descricao = "A descrição é obrigatória.";
  }

  if (dados.valor <= 0) {
    erros.valor = "O valor deve ser maior que zero.";
  }

  if (!dados.data) {
    erros.data = "A data é obrigatória.";
  }

  return erros;
}
