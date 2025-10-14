using Entities.Entidades;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Controller;
using Xunit;

namespace LancamentoFinanceiro.Tests
{
    public class LancamentosControllerTests
    {
        // Repositório fake simples
        public class LancamentoRepositoryFake
        {
            public List<Entities.Entidades.LancamentoFinanceiro> Dados = new()
            {
             new Entities.Entidades.LancamentoFinanceiro { Id = 1, Descricao = "Salário", Valor = 5000, Tipo = TipoLancamento.Receita },
            new Entities.Entidades.LancamentoFinanceiro { Id = 2, Descricao = "Aluguel", Valor = 1500, Tipo = TipoLancamento.Despesa }

            };

            public Task<List<Entities.Entidades.LancamentoFinanceiro>> GetAllOrderedAsync()
                => Task.FromResult(Dados);

            public Task<Entities.Entidades.LancamentoFinanceiro?> GetEntityByID(int id)
                => Task.FromResult(Dados.FirstOrDefault(x => x.Id == id));

            public Task<decimal> GetSaldoAsync()
            {
                var receitas = Dados.Where(x => x.Tipo == TipoLancamento.Receita).Sum(x => x.Valor);
                var despesas = Dados.Where(x => x.Tipo == TipoLancamento.Despesa).Sum(x => x.Valor);
                return Task.FromResult(receitas - despesas);
            }


            public Task Add(Entities.Entidades.LancamentoFinanceiro lanc)
            {
                Dados.Add(lanc);
                return Task.CompletedTask;
            }

            public Task Update(Entities.Entidades.LancamentoFinanceiro lanc)
            {
                var existente = Dados.FirstOrDefault(x => x.Id == lanc.Id);
                if (existente != null)
                {
                    existente.Descricao = lanc.Descricao;
                    existente.Valor = lanc.Valor;
                    existente.Tipo = lanc.Tipo;
                }
                return Task.CompletedTask;
            }

            public Task Delete(Entities.Entidades.LancamentoFinanceiro lanc)
            {
                Dados.Remove(lanc);
                return Task.CompletedTask;
            }
        }

        [Fact]
        public async Task GetAll_DeveRetornarOkComListaDeLancamentos()
        {
            var repoFake = new LancamentoRepositoryFake();
            var controller = new LancamentosController(null);

            var resultado = new OkObjectResult(await repoFake.GetAllOrderedAsync());

            var ok = Assert.IsType<OkObjectResult>(resultado);
            var lista = Assert.IsType<List<Entities.Entidades.LancamentoFinanceiro>>(ok.Value);
            Assert.Equal(2, lista.Count);
        }
        [Fact]
        public async Task GetById_DeveRetornarOk_QuandoEncontrado()
        {
            var repoFake = new LancamentoRepositoryFake();
            var lanc = await repoFake.GetEntityByID(1);

            IActionResult resultado = lanc != null
                ? new OkObjectResult(lanc)
                : new NotFoundObjectResult("Não encontrado");

            var ok = Assert.IsType<OkObjectResult>(resultado);
            var dado = Assert.IsType<Entities.Entidades.LancamentoFinanceiro>(ok.Value);
            Assert.Equal("Salário", dado.Descricao);
        }

        [Fact]
        public async Task GetById_DeveRetornarNotFound_QuandoNaoEncontrado()
        {
            var repoFake = new LancamentoRepositoryFake();
            var lanc = await repoFake.GetEntityByID(99);

            IActionResult resultado = lanc != null
                ? new OkObjectResult(lanc)
                : new NotFoundObjectResult("Não encontrado");

            Assert.IsType<NotFoundObjectResult>(resultado);
        }

         

        [Fact]
        public async Task Create_DeveAdicionarLancamento()
        {
            var repoFake = new LancamentoRepositoryFake();
            var novo = new Entities.Entidades.LancamentoFinanceiro
            {
                Id = 3,
                Descricao = "Freelancer",
                Valor = 2000,
                Tipo = TipoLancamento.Receita
            };

            await repoFake.Add(novo);
            var resultado = new CreatedAtActionResult("GetById", "Lancamentos", new { id = novo.Id }, novo);

            var created = Assert.IsType<CreatedAtActionResult>(resultado);
            Assert.Equal(3, repoFake.Dados.Count);
            Assert.Contains(repoFake.Dados, x => x.Descricao == "Freelancer");
        }

        [Fact]
        public async Task Update_DeveAtualizarLancamento()
        {
            var repoFake = new LancamentoRepositoryFake();
            var atualizado = new Entities.Entidades.LancamentoFinanceiro
            {
                Id = 1,
                Descricao = "Salário Atualizado",
                Valor = 5500,
                Tipo = TipoLancamento.Receita
            };


            await repoFake.Update(atualizado);
            var resultado = new NoContentResult();

            Assert.IsType<NoContentResult>(resultado);
            Assert.Equal("Salário Atualizado", repoFake.Dados[0].Descricao);
            Assert.Equal(5500, repoFake.Dados[0].Valor);
        }

        [Fact]
        public async Task Delete_DeveRemoverLancamento()
        {
            var repoFake = new LancamentoRepositoryFake();
            var lanc = await repoFake.GetEntityByID(2);

            await repoFake.Delete(lanc);
            var resultado = new NoContentResult();

            Assert.IsType<NoContentResult>(resultado);
            Assert.Single(repoFake.Dados);
            Assert.DoesNotContain(repoFake.Dados, x => x.Id == 2);
        }

       
                   [Fact]
            public async Task GetSaldo_DeveRetornarValorCorreto()
            {
                var repoFake = new LancamentoRepositoryFake();
                var saldo = await repoFake.GetSaldoAsync();
                var resultado = new OkObjectResult(saldo);

                var ok = Assert.IsType<OkObjectResult>(resultado);
                Assert.Equal(3500m, ok.Value); // ✅ decimal literal
            }

                }
            }
