using Entities.Entidades;
using Infra.repository;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controller
{
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

            [HttpGet]
            public async Task<ActionResult<IEnumerable<LancamentoFinanceiro>>> GetAll()
            {
                var lista = await _repo.GetAllAsync();
                return Ok(lista);
            }

            [HttpGet("saldo")]
            public async Task<ActionResult<decimal>> GetSaldo()
            {
                var lista = await _repo.GetAllAsync();
                var receitas = lista.Where(x => x.Tipo == "Receita").Sum(x => x.Valor);
                var despesas = lista.Where(x => x.Tipo == "Despesa").Sum(x => x.Valor);
                return Ok(receitas - despesas);
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<LancamentoFinanceiro>> GetById(int id)
            {
                var lanc = await _repo.GetByIdAsync(id);
                if (lanc == null)
                    return NotFound();
                return Ok(lanc);
            }

            [HttpPost]
            public async Task<ActionResult> Create([FromBody] LancamentoFinanceiro lancamento)
            {
                await _repo.AddAsync(lancamento);
                return CreatedAtAction(nameof(GetById), new { id = lancamento.Id }, lancamento);
            }

            [HttpPut("{id}")]
            public async Task<ActionResult> Update(int id, [FromBody] LancamentoFinanceiro lancamento)
            {
                if (id != lancamento.Id)
                    return BadRequest();

                await _repo.UpdateAsync(lancamento);
                return NoContent();
            }

            [HttpDelete("{id}")]
            public async Task<ActionResult> Delete(int id)
            {
                var lanc = await _repo.GetByIdAsync(id);
                if (lanc == null)
                    return NotFound();

                await _repo.DeleteAsync(lanc);
                return NoContent();
            }
        }
    }
}