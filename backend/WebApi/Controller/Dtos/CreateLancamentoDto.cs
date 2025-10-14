using Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace WebApi.DTOs
{
    public class CreateLancamentoDto
    {
        [Required]
        public string Descricao { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal Valor { get; set; }


        [Required]
        public TipoLancamento Tipo { get; set; } 

        [Required]
        public DateTime Data { get; set; }
    }
}
