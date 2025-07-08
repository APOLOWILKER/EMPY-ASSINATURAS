Com certeza\! Vou reescrever seu `README.md` completo, incorporando os detalhes das rotas que você me forneceu e organizando-o para refletir que o backend está 100% concluído.

O ponto principal aqui é que as rotas que estavam listadas em "Próximos Passos (Funcionalidades a Implementar)" (`GET /users/:userId/plan`, `POST /users/:userId/purchase`, `POST /users/:userId/change-plan`, `GET /users/:userId/history`, `GET /purchases/management`) **já foram todas implementadas e verificadas com sucesso\!** Portanto, elas serão movidas para a seção "Rotas da API (Backend)".

-----

### **Arquivo `README.md` (Versão Final Completa)**

Por favor, crie um arquivo chamado `README.md` na **raiz do seu projeto** (`EMPY-ASSINATURAS/README.md`) e cole o conteúdo abaixo:

````markdown
# Empy Assinaturas

Este repositório contém a implementação da solução Full Stack (Backend e Frontend) para o desafio técnico da Empy, focada na gestão de planos de assinatura e no histórico de compras.

## Sobre a Empy

A Empy está focada em gerar soluções financeiras na modalidade de crédito consignado, intermediando as negociações entre sua empresa e seus clientes. Com mais de 15 anos de expertise no mercado de crédito consignado, a empresa carrega desde 2017 a bandeira do "crédito consciente", um movimento que já impactou milhares de pessoas e empresas. Para mais informações, visite [empy.com.br](https://empy.com.br/).

## Visão Geral do Projeto

O backend é construído seguindo a Arquitetura em Camadas (Layered Architecture) para garantir modularidade, testabilidade e manutenção. Ele expõe uma API RESTful para gerenciar planos de assinatura, pagamentos e históricos de compra. O frontend é uma aplicação React JS que consome esta API, buscando ser fiel ao protótipo fornecido no Figma.

## Tecnologias Utilizadas

### Backend

* **Linguagem:** TypeScript
* **Ambiente de Execução:** Node.js
* **Framework Web:** Express.js (v4.x)
* **ORM (Object-Relational Mapper):** Prisma ORM
* **Banco de Dados:** PostgreSQL
* **Validação de Dados:** Zod
* **Variáveis de Ambiente:** Dotenv
* **Hot-reloading:** ts-node-dev

### Frontend

* **Framework UI:** React JS
* (Opcional: Adicione aqui se usar, por exemplo: Gerenciador de Estado: Redux / Context API)
* (Opcional: Adicione aqui se usar, por exemplo: Estilização: Tailwind CSS / Styled Components)

## Configuração e Execução Local

Siga os passos abaixo para configurar e executar o projeto completo em seu ambiente de desenvolvimento.

### Pré-requisitos

* **Node.js:** Versão 18.x ou superior (LTS recomendado).
* **npm:** Gerenciador de pacotes do Node.js.
* **PostgreSQL:** Servidor PostgreSQL instalado e rodando localmente (pode ser via WSL/Linux, Docker ou instalação direta no Windows/macOS).
* **Git:** Para clonar o repositório.
* **VS Code:** Editor de código recomendado.

### 1. Clonar o Repositório

```bash
git clone <https://github.com/APOLOWILKER/EMPY-ASSINATURAS/>
cd EMPY-ASSINATURAS
````

### 2\. Configuração e Execução do Backend

Navegue até a pasta `backend`:

```bash
cd backend
```

#### 2.1. Configurar o Banco de Dados PostgreSQL

1.  **Certifique-se de que seu servidor PostgreSQL está rodando.**

      * **No Linux/WSL (se PostgreSQL instalado diretamente):**
        ```bash
        sudo service postgresql start # Ou use systemctl se seu sistema usar systemd
        ```
      * **No Windows (se PostgreSQL instalado diretamente):** Inicie o serviço PostgreSQL via `services.msc`.
      * **Se usou Docker:**
        ```bash
        docker start <nome_do_seu_container_postgres>
        # ou docker-compose up -d
        ```

2.  **Crie o usuário e o banco de dados para a aplicação:**

      * Conecte-se ao PostgreSQL como um superusuário (geralmente `postgres`).
        ```bash
        sudo -u postgres psql
        ```
      * Dentro do prompt `postgres=#`, execute os seguintes comandos SQL:
        ```sql
        ALTER USER empy CREATEDB; -- Concede permissão para criar bancos de dados
        CREATE USER empy WITH PASSWORD '123456'; -- Cria o usuário 'empy' com senha
        CREATE DATABASE empy_challenge_db OWNER empy; -- Cria o banco de dados e define o 'empy' como proprietário
        \q -- Sai do psql
        ```
        *(Se o usuário ou o banco de dados já existirem, o PostgreSQL avisará ou ignorará a criação.)*

#### 2.2. Instalar Dependências e Gerar o Prisma Client

Na pasta `backend/`:

```bash
npm install # Instala todas as dependências do projeto
npm run prisma:generate # Gera o Prisma Client
```

#### 2.3. Executar Migrações do Prisma

Este comando criará todas as tabelas no seu banco de dados conforme o `schema.prisma` definido.

```bash
npm run prisma:migrate
```

*(Siga as instruções no terminal para nomear a migração se for solicitado.)*

#### 2.4. Popular o Banco de Dados (Seed)

Para inserir dados iniciais de teste (usuário e planos base) no seu banco de dados.

```bash
npm run prisma:seed
```

**Observação:** Este script cria um usuário de teste padrão com o ID: `a1b2c3d4-e5f6-7890-1234-567890abcdef`. Utilize este ID para testar as rotas específicas de usuário.

#### 2.5. Rodar o Backend

Na pasta `backend/`:

1.  **Para rodar em modo de desenvolvimento (com auto-recarregamento):**

    ```bash
    npm run dev
    ```

    O servidor será iniciado e estará disponível em `http://localhost:3001`. Você deverá ver mensagens de sucesso de conexão com o banco de dados.

2.  **Para compilar e rodar em produção:**

    ```bash
    npm run build
    npm run start
    ```

### 3\. Configuração e Execução do Frontend

O frontend da aplicação é construído para ser fiel ao protótipo fornecido no Figma e se comunica com o backend consumindo a API RESTful criada.

#### 3.1. Tecnologias Utilizadas no Frontend

  * **Framework UI:** React JS
  * (Opcional: Adicione aqui se usar, por exemplo: Gerenciador de Estado: Redux / Context API)
  * (Opcional: Adicione aqui se usar, por exemplo: Estilização: Tailwind CSS / Styled Components)

#### 3.2. Passos para Rodar o Frontend Localmente

1.  **Navegue até a pasta do frontend:**
    Assumindo que seu frontend está em uma pasta `frontend/` na raiz do projeto (ex: `EMPY-ASSINATURAS/frontend/`).

    ```bash
    cd ../frontend
    ```

    *(Ajuste o caminho `../frontend` se a sua pasta do frontend tiver outro nome ou localização em relação à pasta `backend`)*

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie a aplicação React:**

    ```bash
    npm start
    # ou npm run dev, dependendo de como seu projeto React está configurado
    ```

    O frontend será iniciado e estará disponível em `http://localhost:3000` (ou outra porta padrão do React, como `3001` ou `5173` se for Vite).

#### 3.3. Observações sobre o Frontend

  * A implementação do frontend deve ser fiel ao protótipo de UI/UX disponível no Figma.
  * A comunicação com o backend será feita consumindo as APIs RESTful que você criou, que estarão disponíveis em `http://localhost:3001`.

## Rotas da API (Backend)

As rotas da API estão organizadas em camadas (Routes -\> Controllers -\> Services) e são acessadas na porta `3001` (ou a porta configurada no seu `.env`). A comunicação é via JSON.

  * `GET /`:

      * **Descrição:** Verifica a saúde e status do servidor.
      * **Endpoint:** `GET http://localhost:3001/`
      * **Retorno Esperado:** Status 200 OK com uma mensagem de confirmação.
      * **Regras:** Rota simples de teste, não exige parâmetros.

  * `GET /plans`:

      * **Descrição:** Lista planos de assinatura ativos e disponíveis para clientes. Esta rota alimenta a tela "Planos de acesso".
      * **Camada:** Cliente
      * **Endpoint:** `GET http://localhost:3001/plans`
      * **Parâmetros de Requisição:** Nenhum.
      * **Retorno Esperado:** Status 200 OK com um array de objetos `Plan` (somente planos `isActive: true`).
      * **Regras:** Retorna apenas planos marcados como `isActive: true`. Ordenado por valor mensal crescente.
      * **Erros Comuns:** 500 Internal Server Error (falha no servidor/DB).

  * `GET /plans/management`:

      * **Descrição:** Lista todos os planos de assinatura com detalhes completos para gerenciamento. Esta rota alimenta o painel de gerenciamento de planos ("Tabela de Planos").
      * **Camada:** Gerenciamento de Planos
      * **Endpoint:** `GET http://localhost:3001/plans/management`
      * **Parâmetros de Requisição:** Nenhum.
      * **Retorno Esperado:** Status 200 OK com um array de objetos `Plan` (inclui ativos/inativos, base/customizados, com todos os detalhes como `discountPercent`, `createdAt`, `updatedAt`).
      * **Regras:** Não filtra por status ou tipo. Ordenado por nome.
      * **Erros Comuns:** 500 Internal Server Error.

  * `POST /plans/management`:

      * **Descrição:** Cria um novo plano de assinatura. Esta rota alimenta a tela "Criar Plano".
      * **Camada:** Gerenciamento de Planos
      * **Endpoint:** `POST http://localhost:3001/plans/management`
      * **Corpo da Requisição (JSON):**
          * `name`: `string`, obrigatório, min 3 caracteres.
          * `description`: `string`, opcional.
          * `monthlyValue`: `number`, opcional.
          * `annualValue`: `number`, opcional.
          * *Regra de Negócio:* Pelo menos um de `monthlyValue` ou `annualValue` é obrigatório e deve ser não negativo.
          * `discountPercent`: `number`, opcional, entre 0 e 100.
          * `planBaseId`: `string` (UUID), opcional. Se fornecido, créditos e outros atributos podem ser herdados do plano base.
          * `isActive`: `boolean`, opcional, padrão `true`.
          * `isCustom`: `boolean`, opcional, padrão `true` (para planos criados via esta rota).
          * `onlineCredits`: `number`, opcional. Se não fornecido ou herdado, padrão `0`.
          * `offlineCredits`: `number`, opcional. Se não fornecido ou herdado, padrão `0`.
      * **Retorno Esperado:** Status 201 Created com o objeto `Plan` criado.
      * **Regras de Negócio:**
          * Nome do plano deve ser único.
          * Validação de todos os campos com Zod.
          * Herança de atributos (créditos) de `planBaseId` se fornecido.
      * **Erros Comuns:** 400 Bad Request (dados inválidos/validação Zod), 500 Internal Server Error (falha na criação/DB), Conflito (nome de plano já existe).

  * `GET /users/:userId/plan`:

      * **Descrição:** Busca os detalhes do plano de assinatura ativo atual de um cliente específico. Esta rota alimenta a tela "Meu Plano".
      * **Camada:** Cliente
      * **Endpoint:** `GET http://localhost:3001/users/:userId/plan`
      * **Parâmetros de Requisição (URL):**
          * `userId`: `string` (UUID), **obrigatório**. Utilize o ID do usuário de teste fornecido na seção "Popular o Banco de Dados (Seed)". Exemplo: `a1b2c3d4-e5f6-7890-1234-567890abcdef`.
      * **Retorno Esperado:** Status 200 OK com objeto `Subscription` com detalhes do `Plan` e `User` incluídos.
      * **Regras de Negócio:** Retorna o plano marcado como `status: ACTIVE` mais recente para o `userId` especificado.
      * **Erros Comuns:** 404 Not Found (plano ativo não encontrado para o usuário), 500 Internal Server Error.

  * `POST /users/:userId/purchase`:

      * **Descrição:** Processa a compra de um plano de assinatura, incluindo simulação de pagamento.
      * **Camada:** Cliente
      * **Endpoint:** `POST http://localhost:3001/users/:userId/purchase`
      * **Parâmetros de Requisição (URL):**
          * `userId`: `string` (UUID), **obrigatório**. ID do usuário que está comprando.
      * **Corpo da Requisição (JSON):**
        ```json
        {
          "planId": "string (UUID)",     // ID do plano a ser comprado
          "isMonthly": "boolean",        // true para mensal, false para anual
          "cardDetails": {               // Detalhes do cartão de crédito (fictícios)
            "holderName": "string",
            "cardNumber": "string",
            "expiryDate": "string",
            "cvv": "string"
          },
          "userEmail": "string (email, opcional)"
        }
        ```
      * **Retorno Esperado (Sucesso - 201 Created):** Objeto JSON com `message`, `subscription` e `purchaseHistory`.
      * **Retorno Esperado (Falha de Pagamento - 402 Payment Required):** Objeto JSON com `message` e `purchaseHistory`.
      * **Regras de Negócio:**
          * A primeira compra de um usuário no histórico **sempre resultará em sucesso**.
          * Compras subsequentes seguirão uma simulação aleatória (80% sucesso / 20% falha), com os tipos de falha "Sem limite" e "Não autorizado".
          * Validação de dados com Zod.
      * **Erros Comuns:** 400 Bad Request (dados inválidos), 404 Not Found (plano não encontrado), 500 Internal Server Error.

  * `POST /users/:userId/change-plan`:

      * **Descrição:** Gerencia o upgrade ou downgrade de um plano de assinatura existente.
      * **Camada:** Cliente
      * **Endpoint:** `POST http://localhost:3001/users/:userId/change-plan`
      * **Parâmetros de Requisição (URL):**
          * `userId`: `string` (UUID), **obrigatório**. ID do usuário que está alterando o plano.
      * **Corpo da Requisição (JSON):**
        ```json
        {
          "newPlanId": "string (UUID)",
          "isMonthly": "boolean",
          "cardDetails": {
            "holderName": "string",
            "cardNumber": "string",
            "expiryDate": "string",
            "cvv": "string"
          }
        }
        ```
      * **Retorno Esperado (Sucesso - 200 OK):** Objeto JSON com `message`, `operationType`, `subscription` e `purchaseHistory`.
      * **Retorno Esperado (Falha de Pagamento - 402 Payment Required):** Objeto JSON com `message`, `operationType` e `purchaseHistory`.
      * **Regras de Negócio:**
          * O usuário deve ter um plano ativo para alterar.
          * O novo plano não pode ser o mesmo que o plano atual.
          * Upgrade implica cobrança total do novo plano; Downgrade implica custo zero. Ambos simulam pagamento e recusa conforme requisitos do desafio.
          * Validação de dados com Zod.
      * **Erros Comuns:** 400 Bad Request (dados inválidos), 404 Not Found (plano/usuário sem plano não encontrado), 500 Internal Server Error.

  * `GET /users/:userId/history`:

      * **Descrição:** Lista o histórico de todas as transações (compras, upgrades, downgrades, sucessos e falhas) de um cliente específico. Esta rota alimenta a tabela "Histórico de Compras".
      * **Camada:** Cliente
      * **Endpoint:** `GET http://localhost:3001/users/:userId/history`
      * **Parâmetros de Requisição (URL):**
          * `userId`: `string` (UUID), **obrigatório**. ID do usuário.
      * **Retorno Esperado:** Status 200 OK com array de objetos `PurchaseHistory` com detalhes de `Plan` e `User` incluídos.
      * **Regras:** Retorna todas as transações para o `userId` ordenadas por data.
      * **Erros Comuns:** 500 Internal Server Error.

  * `GET /purchases/management`:

      * **Descrição:** Lista o histórico completo de todas as compras e transações de **TODOS** os usuários no sistema, para uma visão geral de gerenciamento.
      * **Camada:** Gerenciamento de Planos
      * **Endpoint:** `GET http://localhost:3001/purchases/management`
      * **Parâmetros de Requisição:** Nenhum.
      * **Retorno Esperado:** Status 200 OK com array de objetos `PurchaseHistory` com detalhes de `Plan` e `User` incluídos.
      * **Regras:** Retorna todas as transações de todos os usuários ordenadas por data.
      * **Erros Comuns:** 500 Internal Server Error.

## Arquitetura e Padrões

Este backend segue uma **Arquitetura em Camadas**, separando as responsabilidades em Rotas, Controladores e Serviços para promover a modularidade e testabilidade.

A gestão do código fonte é feita com Git, seguindo um padrão de **Conventional Commits** para clareza no histórico de versões.

```
```