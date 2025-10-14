🧩 desafio_pollvo_rsm

Aplicação Full-Stack com React + TypeScript (Vite) no frontend e .NET 8 (Web API em DDD + EF Core) no backend.
Este guia reúne instalação, configuração, execução, migrações, endpoints, testes e boas práticas de commits — tudo em um só lugar.

📌 Sumário

⚙️ Pré-requisitos

📥 Clonar o repositório

🖥️ Frontend (React + Vite)

🛠️ Backend (.NET 8 + DDD + EF Core)

🔧 Configuração

🗃️ Migrations (EF Core)

🛣️ Endpoints (exemplos)

🧪 Testes

🧾 Padrão de Commits

📄 Licença

⚙️ Pré-requisitos

Node.js LTS (com npm)

.NET SDK 8+ → verifique com:

dotnet --info


SQL Server (Developer, Express ou LocalDB)

💡 Opcional: Ferramentas EF Core
Instale com:

dotnet tool install --global dotnet-ef

📥 Clonar o repositório
git clone https://github.com/wendellsantos2/desafio_pollvo_rsm.git

🖥️ Frontend (React)

📂 Local: frontend

▶️ Instalar dependências
cd frontend
npm install

⚙️ Configurar variáveis de ambiente

Crie o arquivo .env (ou renomeie .env.example → .env) e defina a URL da API:

VITE_API_URL=https://localhost:7000/api


Exemplo para produção:
VITE_API_URL=https://suaapi.com/api

🚀 Executar o app
npm start


Acesse em: http://localhost:3000

🛠️ Backend (.NET 8 + DDD + EF Core)

📂 Local: backend

A Web API é o projeto de startup.

▶️ Executar a API
cd backend/WebApi
dotnet run

A API será executada em https://localhost:7000

🔧 Configuração

No arquivo WebApi/appsettings.Development.json, ajuste a ConnectionString:

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


🔎 Dica: Ajuste o Server conforme sua instância SQL:

localhost

MSSQLSERVER

(localdb)\MSSQLLocalDB

🗃️ Migrations (EF Core)
Criar migration
Add-Migration Initial -Context ContextBase -Project Infra -StartupProject WebApi -OutputDir Migrations

Aplicar no banco
Update-Database -Context ContextBase -Project Infra -StartupProject WebApi

🛣️ Endpoints (exemplos)
Método	Rota	Descrição
GET	/api/lancamentos	Lista lançamentos
POST	/api/lancamentos	Cria lançamento
PUT	/api/lancamentos/{id}	Atualiza lançamento
DELETE	/api/lancamentos/{id}	Remove lançamento
🧪 Testes

1️⃣ Abra a solução (LancamentoFinanceiro.sln)
2️⃣ Vá em Exibir → Gerenciador de Testes
3️⃣ O Visual Studio exibirá todos os métodos com [Fact] ou [Theory]
4️⃣ Execute:

▶ Run All Tests → todos os testes

🧩 Run Selected Tests → apenas o selecionado
 

✅ Resultados:

🟢 Verde → sucesso

🔴 Vermelho → falha

⚪ Cinza → ignorado

 
📄 Licença

Este projeto é de uso educacional e livre para estudos e demonstrações.
© 2025 Wendell Santos.