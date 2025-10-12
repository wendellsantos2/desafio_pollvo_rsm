export type TipoLancamento = "Receita" | "Despesa";

export interface Lancamento {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoLancamento;
  data: string;
}

export interface LancamentoFormData {
  descricao: string;
  valor: number;
  tipo: TipoLancamento;
  data: string;
}
