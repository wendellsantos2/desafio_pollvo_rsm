export interface Lancamento {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'Receita' | 'Despesa';
  data: string;
}

export type LancamentoFormData = Omit<Lancamento, 'id'>;
