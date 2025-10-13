using Entities.Context;
using Entities.Entidades;
using Infra.repository.generics;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
 
        public async Task<List<LancamentoFinanceiro>> GetAllOrderedAsync()
        {
            return await _context.Lancamentos
                                 .OrderByDescending(x => x.Data)
                                 .ToListAsync();
        }

 
        public async Task<decimal> GetSaldoAsync()
        {
            var receitas = await _context.Lancamentos
                .Where(x => x.Tipo == "Receita")
                .SumAsync(x => x.Valor);

            var despesas = await _context.Lancamentos
                .Where(x => x.Tipo == "Despesa")
                .SumAsync(x => x.Valor);

            return receitas - despesas;
        }
    }
}
