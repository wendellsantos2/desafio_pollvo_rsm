using Entities.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Entities.Context
{
    public class ContextBase : DbContext
    {
        public ContextBase(DbContextOptions<ContextBase> options) : base(options) { }

        public DbSet<LancamentoFinanceiro> Lancamentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura o campo Valor como decimal(18,2)
            modelBuilder.Entity<LancamentoFinanceiro>()
                .Property(p => p.Valor)
                .HasColumnType("decimal(18,2)");

            // Salva o enum Tipo como texto ("Receita" / "Despesa")
            modelBuilder.Entity<LancamentoFinanceiro>()
                .Property(p => p.Tipo)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
