using Entities.Entidades;
using Infra.repository;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LancamentosController : ControllerBase
    {
        private readonly LancamentoRepository _repo;

        public LancamentosController(LancamentoRepository repo)
        {
            _repo = repo;
        }

        ///<summary>
        /// Retorna todos os lançamentos financeiros cadastrados.
        /// </summary>
        /// <returns>Lista de lançamentos financeiros.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LancamentoFinanceiro>>> GetAll()
        {
            var lista = await _repo.GetAllOrderedAsync();
            return Ok(lista);
        }

        /// <summary>
        /// Retorna o saldo total (somando receitas e despesas).
        /// </summary>
        /// <returns>Saldo total atual.</returns>
        [HttpGet("saldo")]
        public async Task<ActionResult<decimal>> GetSaldo()
        {
            var saldo = await _repo.GetSaldoAsync();
            return Ok(saldo);
        }

        /// <summary>
        /// Retorna um lançamento financeiro pelo seu ID.
        /// </summary>
        /// <param name="id">ID do lançamento.</param>
        /// <returns>O lançamento encontrado ou mensagem de erro.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<LancamentoFinanceiro>> GetById(int id)
        {
            var lanc = await _repo.GetEntityByID(id);
            if (lanc == null)
                return NotFound(new { message = $"Lançamento com ID {id} não encontrado." });

            return Ok(lanc);
        }

        /// <summary>
        /// Cria um novo lançamento financeiro.
        /// </summary>
        /// <param name="lancamentoDto">Objeto contendo os dados do lançamento.</param>
        /// <returns>Lançamento criado com status 201.</returns>
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateLancamentoDto lancamentoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lancamento = new LancamentoFinanceiro
            {
                Descricao = lancamentoDto.Descricao,
                Valor = lancamentoDto.Valor,
                Tipo = lancamentoDto.Tipo,
                Data = lancamentoDto.Data
            };

            await _repo.Add(lancamento);

            return CreatedAtAction(nameof(GetById), new { id = lancamento.Id }, lancamento);
        }


        /// <summary>
        /// Atualiza um lançamento financeiro existente.
        /// </summary>
        /// <param name="id">ID do lançamento.</param>
        /// <param name="lancamento">Objeto com os novos dados do lançamento.</param>
        /// <returns>Status 204 se a atualização for bem-sucedida.</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] LancamentoFinanceiro lancamento)
        {
            if (id != lancamento.Id)
                return BadRequest(new { message = "O ID informado não corresponde ao lançamento enviado." });

            var existente = await _repo.GetEntityByID(id);
            if (existente == null)
                return NotFound(new { message = $"Lançamento com ID {id} não encontrado." });

            existente.Descricao = lancamento.Descricao;
            existente.Valor = lancamento.Valor;
            existente.Tipo = lancamento.Tipo;
            existente.Data = lancamento.Data;

            await _repo.Update(existente);
            return NoContent();
        }

        /// <summary>
        /// Remove um lançamento financeiro pelo ID.
        /// </summary>
        /// <param name="id">ID do lançamento a ser excluído.</param>
        /// <returns>Status 204 se a exclusão for bem-sucedida.</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var lanc = await _repo.GetEntityByID(id);
            if (lanc == null)
                return NotFound(new { message = $"Lançamento com ID {id} não encontrado." });

            await _repo.Delete(lanc);
            return NoContent();
        }
    }
}
