import { useState, useEffect, useCallback } from 'react';
import { lancamentoService } from '../services/lancamentoService';
import { Lancamento } from '../interfaces/lancamento.types';

export const useLancamentos = () => {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const lista = await lancamentoService.listar();
      setLancamentos(lista);
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { lancamentos, loading, carregar };
};
