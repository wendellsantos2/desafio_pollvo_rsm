using Entities.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Entities.Context
{
    public class ContextBase : DbContext
    {
        public ContextBase(DbContextOptions<ContextBase> options) : base(options) { }


        public class ApplicationDbContext : DbContext
        {
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        }
        public DbSet<LancamentoFinanceiro> Lancamentos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ObterStringConexao());
            }
        }

        private string ObterStringConexao()
        {
            return "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True; Initial Catalog=lancamentos_financeiros; Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura o campo Valor como decimal(18,2)
            modelBuilder.Entity<LancamentoFinanceiro>()
                .Property(p => p.Valor)
                .HasColumnType("decimal(18,2)");

            // Faz o EF Core salvar o enum Tipo como texto ("Receita" / "Despesa")
            modelBuilder.Entity<LancamentoFinanceiro>()
                .Property(p => p.Tipo)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }


    }
}