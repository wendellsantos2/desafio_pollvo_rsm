import { http } from '../http';
import { Lancamento } from '../types/lancamento.types';

export const lancamentoService = {
  listar: async (): Promise<Lancamento[]> => {
    const response = await http.get('/Lancamentos');
    return response.data;
  }
};
