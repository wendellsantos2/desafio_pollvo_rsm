using Entities.Context;
using Entities.Entidades;
using Entities.Enums;
using Infra.repository.generics;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infra.repository
{
    public class LancamentoRepository : RepositorioGeneric<LancamentoFinanceiro>
    {
        private readonly ContextBase _context;

        public LancamentoRepository(ContextBase context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna todos os lançamentos financeiros ordenados pela data (mais recentes primeiro).
        /// </summary>
        public async Task<List<LancamentoFinanceiro>> GetAllOrderedAsync()
        {
            return await _context.Lancamentos
                                 .OrderByDescending(x => x.Data)
                                 .ToListAsync();
        }

        /// <summary>
        /// Calcula o saldo total (receitas - despesas).
        /// </summary>
        public async Task<decimal> GetSaldoAsync()
        {
            var receitas = await _context.Lancamentos
                .Where(x => x.Tipo == TipoLancamento.Receita)
                .SumAsync(x => x.Valor);

            var despesas = await _context.Lancamentos
                .Where(x => x.Tipo == TipoLancamento.Despesa)
                .SumAsync(x => x.Valor);

            return receitas - despesas;
        }
    }
}
