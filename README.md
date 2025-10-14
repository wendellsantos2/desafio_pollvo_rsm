# desafio_pollvo_rsm

Aplicação Full-Stack com React no frontend e .NET 8 (Web API em DDD + EF Core) no backend.

Este guia reúne instalação, configuração, execução, migrações, endpoints, testes e boas práticas de commits — tudo em um só lugar.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Clonar o repositório](#clonar-o-repositório)
- [Frontend (React)](#frontend-react)
- [Backend (.NET 8 + DDD + EF Core)](#backend-net-8--ddd--ef-core)
- [Configuração](#configuração)
- [Migrations (EF Core)](#migrations-ef-core)
- [Endpoints](#endpoints)
- [Testes](#testes)
 
- [Licença](#licença)

## Pré-requisitos

- **Node.js LTS** (com npm)
- **.NET SDK 8+** → verifique com:
  ```bash
  dotnet --info
  ```
- **SQL Server** (Developer, Express ou LocalDB)

**Opcional:** Ferramentas EF Core

Instale com:
```bash
dotnet tool install --global dotnet-ef
```

## Clonar o repositório

```bash
git clone https://github.com/wendellsantos2/desafio_pollvo_rsm.git
```

## Frontend (React + Vite)

**Local:** `frontend`

### Instalar dependências

```bash
cd frontend
npm install
```

### Configurar variáveis de ambiente

Crie o arquivo `.env` (ou renomeie `.env.example` → `.env`) e defina a URL da API:

```env
VITE_API_URL=https://localhost:7000/api
```

Exemplo para produção:

```env
VITE_API_URL=https://suaapi.com/api
```

### Executar o app

```bash
npm start
```

Acesse em: http://localhost:3000

## Backend (.NET 8 + DDD + EF Core)

**Local:** `backend`

A Web API é o projeto de startup.

### Executar a API

```bash
cd backend/WebApi
dotnet run
```

A API será executada em https://localhost:7000

## Configuração

No arquivo `WebApi/appsettings.Development.json`, ajuste a ConnectionString:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=lancamentos_financeiros;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**Dica:** Ajuste o Server conforme sua instância SQL:
- `localhost`
- `MSSQLSERVER`
- `(localdb)\MSSQLLocalDB`

## Migrations (EF Core)

### Criar migration

```bash
Add-Migration Initial -Context ContextBase -Project Infra -StartupProject WebApi -OutputDir Migrations
```

### Aplicar no banco

```bash
Update-Database -Context ContextBase -Project Infra -StartupProject WebApi
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/lancamentos` | Lista lançamentos |
| POST | `/api/lancamentos` | Cria lançamento |
| PUT | `/api/lancamentos/{id}` | Atualiza lançamento |
| DELETE | `/api/lancamentos/{id}` | Remove lançamento |

## Testes

1. Abra a solução (`LancamentoFinanceiro.sln`)
2. Vá em **Exibir** → **Gerenciador de Testes**
3. O Visual Studio exibirá todos os métodos com `[Fact]` ou `[Theory]`
4. Execute:
   - **Run All Tests** → todos os testes
   - **Run Selected Tests** → apenas o selecionado

### Resultados

- **Verde** → sucesso
- **Vermelho** → falha
- **Cinza** → ignorado

 
## Licença

Este projeto é de uso educacional e livre para estudos e demonstrações.

© 2025 Wendell Santos.