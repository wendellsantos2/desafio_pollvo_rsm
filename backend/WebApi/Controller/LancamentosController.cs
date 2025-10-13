using Entities.Entidades;
using Infra.repository;
using Microsoft.AspNetCore.Mvc;

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

        // GET: api/lancamentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LancamentoFinanceiro>>> GetAll()
        {
            var lista = await _repo.GetAllOrderedAsync();
            return Ok(lista);
        }

        // GET: api/lancamentos/saldo
        [HttpGet("saldo")]
        public async Task<ActionResult<decimal>> GetSaldo()
        {
            var saldo = await _repo.GetSaldoAsync();
            return Ok(saldo);
        }

        // GET: api/lancamentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LancamentoFinanceiro>> GetById(int id)
        {
            var lanc = await _repo.GetEntityByID(id);
            if (lanc == null)
                return NotFound(new { message = $"Lançamento com ID {id} não encontrado." });

            return Ok(lanc);
        }

        // POST: api/lancamentos
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] LancamentoFinanceiro lancamento)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repo.Add(lancamento);

            return CreatedAtAction(nameof(GetById), new { id = lancamento.Id }, lancamento);
        }

        // PUT: api/lancamentos/5
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

        // DELETE: api/lancamentos/5
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
