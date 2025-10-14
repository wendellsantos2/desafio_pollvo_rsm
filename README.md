# Desafio_pollvo_rsm

Olá! 👋
Este projeto foi desenvolvido por Wendell Santos como parte do Desafio Técnico – Desenvolvedor FullStack (.NET/React) da Pollvo.

O objetivo deste desafio é demonstrar a capacidade de construir uma aplicação Full-Stack completa, aplicando boas práticas de arquitetura, organização de código e integração entre frontend e backend.

A proposta consiste em um CRUD de lançamentos financeiros (despesas e receitas), implementado com as seguintes tecnologias:

Backend: .NET 8 (Web API com arquitetura DDD e Entity Framework Core)

Frontend: React + TypeScript (com MUI e Axios)

Banco de Dados: SQL Server (padrão), utilizando Entity Framework Core (EF Core) para mapeamento objeto-relacional, com opção de EF Core In-Memory para testes rápidos

A aplicação foi projetada para ser simples de executar, bem estruturada e escalável, seguindo princípios de arquitetura limpa e desacoplamento entre camadas.


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
  [https://nodejs.org/pt/download](https://nodejs.org/pt/download)

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

## Configuração

1️⃣ Criar o banco de dados da aplicação(lancamentos_financeiros)

Antes de rodar a aplicação, crie o banco manualmente no SQL Server (pode ser pelo SQL Server Management Studio ou pelo comando abaixo):

CREATE DATABASE lancamentos_financeiros;

2️⃣ Ajustar a ConnectionString

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

## Migrations (EF Core)

### Criar migration

```bash
Add-Migration Initial -Context ContextBase -Project Infra -StartupProject WebApi -OutputDir Migrations
```

### Aplicar no banco

```bash
Update-Database -Context ContextBase -Project Infra -StartupProject WebApi
```

### Executar a API

```bash
cd backend/WebApi

dotnet run --project WebApi

```

A API será executada em https://localhost:7000/swagger/index.html

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