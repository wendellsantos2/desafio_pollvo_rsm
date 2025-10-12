import { http } from '../http';
import { Lancamento, LancamentoFormData } from '../interfaces/lancamento.types';

export const lancamentoService = {
  listar: async (): Promise<Lancamento[]> => {
    const response = await http.get('/Lancamentos');
    return response.data;
  },
  saldo: async (): Promise<number> => {
    const response = await http.get('/Lancamentos/saldo');
    return response.data;
  },
  criar: async (dados: LancamentoFormData): Promise<Lancamento> => {
    const response = await http.post('/Lancamentos', dados);
    return response.data;
  },
  atualizar: async (id: number, dados: LancamentoFormData): Promise<void> => {
    await http.put(`/Lancamentos/${id}`, dados);
  },
  excluir: async (id: number): Promise<void> => {
    await http.delete(`/Lancamentos/${id}`);
  },
};
