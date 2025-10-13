 
using System.ComponentModel.DataAnnotations;
 

namespace Entities.Entidades
{
    public class LancamentoFinanceiro
    {
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal Valor { get; set; }

        [Required]
        public string Tipo { get; set; } // "Receita" ou "Despesa"

        [Required]
        public DateTime Data { get; set; }
    }
}