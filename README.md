#DOCUMENTANDO O PROJETO#


## Rotas da API (Backend)

As rotas da API estão organizadas em camadas (Routes -> Controllers -> Services) e são acessadas na porta `3001` (ou a porta configurada no seu `.env`). A comunicação é via JSON.

* `GET /`:
    * **Descrição:** Verifica a saúde e status do servidor.
    * **Endpoint:** `GET http://localhost:3001/`
    * **Retorno Esperado:** Status 200 OK com uma mensagem de confirmação.
    * **Regras:** Rota simples de teste, não exige parâmetros.

* `GET /plans`:
    * **Descrição:** Lista planos de assinatura disponíveis para clientes.
    * **Camada:** Cliente (Visão Pública)
    * **Endpoint:** `GET http://localhost:3001/plans`
    * **Retorno Esperado:** Status 200 OK com um array de objetos Plan (somente planos ativos).
    * **Regras:** Retorna apenas planos marcados como `isActive: true`. Ordenado por valor mensal crescente.
    * **Erros Comuns:** 500 Internal Server Error (falha no servidor/DB).

* `GET /plans/management`:
    * **Descrição:** Lista todos os planos de assinatura com detalhes completos para gerenciamento.
    * **Camada:** Gerenciamento de Planos
    * **Endpoint:** `GET http://localhost:3001/plans/management`
    * **Retorno Esperado:** Status 200 OK com um array de objetos Plan (inclui ativos/inativos, base/customizados, com todos os detalhes como `discountPercent`, `createdAt`, `updatedAt`).
    * **Regras:** Não filtra por status ou tipo. Ordenado por nome.
    * **Erros Comuns:** 500 Internal Server Error.

* `POST /plans/management`:
    * **Descrição:** Cria um novo plano de assinatura.
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

### Próximos Passos (Funcionalidades a Implementar)

* **Detalhes do Plano Atual do Cliente:** `GET /users/:userId/plan`
* **Fluxo de Pagamento / Contratação:** `POST /users/:userId/purchase`
* **Upgrade / Downgrade de Planos:** `POST /users/:userId/change-plan`
* **Histórico de Compras do Cliente:** `GET /users/:userId/history`
* **Visualização de Todas as Compras (Gerenciamento):** `GET /purchases/management`