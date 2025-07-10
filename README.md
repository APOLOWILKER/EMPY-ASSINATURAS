# Empy Assinaturas - Sistema de Gerenciamento de Assinaturas

Este projeto é uma aplicação full-stack para gerenciar assinaturas de usuários, construída com um frontend em React e um backend em Node.js (Express).

## Tecnologias

-   **Frontend:** React, TypeScript, Vite, Tailwind CSS
-   **Backend:** Node.js, Express, TypeScript, Prisma
-   **Banco de Dados:** PostgreSQL

## Pré-requisitos

-   **Node.js:** v18.x ou superior
-   **npm:** v8.x ou superior (ou seu gerenciador de pacotes preferido)
-   **Git:** Para clonar o repositório
-   **PostgreSQL:** Uma instância do servidor PostgreSQL em execução

---

## Como Começar

### 1. Clone o Repositório

Primeiro, clone o projeto para sua máquina local:

```bash
git clone <url-do-repositorio>
cd empy-assinaturas
```

### 2. Configuração do Backend

O servidor backend gerencia a lógica de negócios, as interações com o banco de dados e os endpoints da API.

**a. Navegue até o diretório do backend:**

```bash
cd backend
```

**b. Instale as dependências:**

```bash
npm install
```

**c. Configure as variáveis de ambiente:**

Crie um arquivo `.env` no diretório `backend` copiando o arquivo de exemplo:

```bash
cp env.example.env .env
```

Agora, edite o arquivo `.env` e adicione a sua string de conexão do banco de dados PostgreSQL:

```
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/BANCO_DE_DADOS"
```

**d. Execute as migrações do banco de dados:**

Este comando irá configurar o schema do banco de dados com base no modelo do Prisma.

```bash
npx prisma migrate dev --name init
```

**e. (Opcional) Popule o banco de dados:**

Para popular o banco de dados com dados iniciais (ex: planos de teste), execute:

```bash
npm run prisma:seed
```

**f. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

O backend estará rodando em `http://localhost:3001`.

---

### 3. Configuração do Frontend

O frontend fornece a interface de usuário para a seleção de planos e o checkout.

**a. Navegue até o diretório do frontend:**

```bash
cd ../frontend
```

**b. Instale as dependências:**

```bash
npm install
```

**c. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

A aplicação frontend estará disponível em `http://localhost:5173`.

---

## Rotas da API do Backend

O servidor expõe os seguintes endpoints RESTful:

### Planos

-   `GET /plans`
    -   **Descrição:** Retorna uma lista de todos os planos de assinatura ativos e disponíveis para os clientes.
    -   **Resposta:** Um array de objetos de plano.

-   `GET /plans/management`
    -   **Descrição:** Retorna uma lista de *todos* os planos (ativos e inativos) para fins de gerenciamento interno.
    -   **Resposta:** Um array de objetos de plano com campos mais detalhados.

-   `POST /plans/management`
    -   **Descrição:** Cria um novo plano de assinatura.
    -   **Corpo (Body):** Um objeto JSON com os detalhes do plano (nome, valores, créditos, etc.).
    -   **Resposta:** O objeto do plano recém-criado.

### Usuários e Compras

-   `GET /users/:userId/plan`
    -   **Descrição:** Busca a assinatura ativa atual para um usuário específico.
    -   **Resposta:** O objeto da assinatura atual do usuário ou 404 se não for encontrado.

-   `POST /users/:userId/purchase`
    -   **Descrição:** Processa a compra de um novo plano para um usuário.
    -   **Corpo (Body):** Um objeto JSON contendo `planId`, `isMonthly` e `cardDetails`.
    -   **Resposta:** Um objeto de resultado com o status da compra e detalhes da transação.

-   `POST /users/:userId/change-plan`
    -   **Descrição:** Gerencia o upgrade ou downgrade de plano para um usuário.
    -   **Corpo (Body):** Um objeto JSON contendo `newPlanId`, `isMonthly` e `cardDetails` (opcional).
    -   **Resposta:** Um objeto de resultado com o status da alteração e detalhes da transação.

-   `GET /users/:userId/history`
    -   **Descrição:** Retorna o histórico completo de compras e transações para um usuário específico.
    -   **Resposta:** Um array de registros do histórico de compras.

### Gerenciamento

-   `GET /purchases/management`
    -   **Descrição:** Retorna o histórico de compras completo de *todos* os usuários para gerenciamento e relatórios.
    -   **Resposta:** Um array com todos os registros do histórico de compras.