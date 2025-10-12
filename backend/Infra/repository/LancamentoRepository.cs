using Entities.Context;
using Entities.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.repository
{
    public class LancamentoRepository
    {
        private readonly ContextBase _context;

        public LancamentoRepository(ContextBase context)
        {
            _context = context;
        }

        public async Task<List<LancamentoFinanceiro>> GetAllAsync()
        {
            return await _context.Lancamentos.OrderByDescending(x => x.Data).ToListAsync();
        }

        public async Task<LancamentoFinanceiro> GetByIdAsync(int id)
        {
            return await _context.Lancamentos.FindAsync(id);
        }

        public async Task AddAsync(LancamentoFinanceiro lancamento)
        {
            _context.Lancamentos.Add(lancamento);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LancamentoFinanceiro lancamento)
        {
            _context.Entry(lancamento).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(LancamentoFinanceiro lancamento)
        {
            _context.Lancamentos.Remove(lancamento);
            await _context.SaveChangesAsync();
        }
    }
}