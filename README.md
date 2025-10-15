 
# Desafio_pollvo_rsm

Olá! 👋

Este projeto foi desenvolvido por **Wendell Santos** como parte do **Desafio Técnico – Desenvolvedor FullStack (.NET/React)** da Pollvo.

O objetivo deste desafio é demonstrar a capacidade de construir uma aplicação Full-Stack completa, aplicando boas práticas de arquitetura, organização de código e integração entre frontend e backend.

---

## 📋 Proposta

A proposta consiste em um **CRUD de lançamentos financeiros** (despesas e receitas), implementado com as seguintes tecnologias:

- **Backend**: .NET 8 (Web API com arquitetura DDD e Entity Framework Core)
- **Frontend**: React (com MUI)
- **Banco de Dados**: EF Core In-Memory
- **Teste**: xunit

A aplicação foi projetada para ser simples de executar, bem estruturada e escalável, seguindo princípios de arquitetura limpa e desacoplamento entre camadas.

## Pré-requisitos
- **Node.js LTS** (com npm)  
- **.NET SDK 8+** → verifique com:
  ```bash
  dotnet --info
  ```
  
## Frontend (React)
**Local:** `frontend`

### Instalar dependências
```bash
cd frontend
npm install
```

### Executar o app
```bash
npm start
```

### Acesso ao app
http://localhost:3000

## Backend (.NET 8 + DDD + EF Core)
**Local:** `backend`

### Executar a API
```bash
cd backend/WebApi
dotnet run --project WebApi
```

### Acesso ao Swagger 
https://localhost:7000/swagger/index.html

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/lancamentos` | Lista lançamentos |
| POST | `/api/lancamentos` | Cria lançamento |
| PUT | `/api/lancamentos/{id}` | Atualiza lançamento |
| DELETE | `/api/lancamentos/{id}` | Remove lançamento |

## Testes
1. Vá em **Exibir** → **Gerenciador de Testes**
2. Execute
   - **Run All Tests** → todos os testes
   - **Run Selected Tests** → apenas o selecionado

 
© 2025 Wendell Santos.