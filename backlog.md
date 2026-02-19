Backlog do Produto — Delivery API
Visão Geral

Este documento descreve o backlog do projeto Delivery API, organizado em formato de User Stories.

As histórias representam as funcionalidades implementadas durante o desenvolvimento do desafio técnico, priorizadas conforme dependência técnica e valor entregue.

A aplicação contempla:

API REST para gerenciamento de pedidos
Persistência em arquivo JSON
Máquina de estados para controle de status
Interface React para interação com a API
Containerização com Docker

🧾 User Stories
ID	História	Prioridade
US-01	Criar repositório e versionar o projeto	Alta
US-02	Estruturar backend em arquitetura em camadas	Alta
US-03	Implementar persistência em arquivo JSON	Alta
US-04	Implementar CRUD completo de pedidos	Alta
US-05	Implementar máquina de estados	Alta
US-06	Criar interface React para consumo da API	Alta
US-07	Implementar formulário completo de criação de pedidos	Alta
US-08	Permitir atualização de status via frontend	Alta
US-09	Permitir exclusão de pedidos via frontend	Alta
US-10	Containerizar aplicação com Docker Compose	Alta
US-11	Documentar arquitetura do sistema	Média
US-12	Melhorar robustez da interface para diferentes formatos de dados	Média

 Detalhamento das User Stories

US-01 — Criar repositório e versionar o projeto
Como desenvolvedor, quero versionar o projeto utilizando Git, para garantir rastreabilidade das alterações e organização do desenvolvimento.

Critério de aceite:

Repositório criado no GitHub
Histórico de commits estruturado
README documentando execução do projeto

US-02 — Estruturar backend em arquitetura em camadas

Como desenvolvedor, quero organizar o backend separando responsabilidades, para facilitar manutenção e evolução futura.

Camadas implementadas:

Routes
Controllers
Services
Repositories
Validators
Utils
Types

Critério de aceite:

Controllers sem regra de negócio
Services contendo lógica do domínio
Repository responsável por leitura e escrita no JSON

US-03 — Implementar persistência em arquivo JSON

Como sistema, quero armazenar os pedidos em um arquivo JSON, para manter os dados entre execuções sem depender de infraestrutura externa.

Critério de aceite:

Leitura e escrita no pedidos.json
Dados persistindo após reiniciar a aplicação
Integração com a camada de repositório

US-04 — Implementar CRUD completo de pedidos

Como cliente da API, quero criar, listar, atualizar e remover pedidos, para gerenciar o ciclo de vida completo.

Endpoints implementados:

GET /orders
GET /orders/:order_id
POST /orders
PUT /orders/:order_id
DELETE /orders/:order_id

Critério de aceite:

Operações refletidas corretamente no JSON
Retorno de status HTTP adequados

US-05 — Implementar máquina de estados

Como operador do sistema, quero que os pedidos sigam um fluxo controlado de status, para evitar transições inválidas.

Estados implementados:

RECEIVED
CONFIRMED
DISPATCHED
DELIVERED
CANCELED

Regras de transição:

RECEIVED → CONFIRMED ou CANCELED
CONFIRMED → DISPATCHED ou CANCELED
DISPATCHED → DELIVERED ou CANCELED
DELIVERED e CANCELED são estados finais

Critério de aceite:

Transições inválidas retornam erro
Histórico de status mantido no pedido

US-06 — Criar interface React para consumo da API

Como usuário, quero uma interface visual para interagir com os pedidos, facilitando testes e validação do sistema.

Funcionalidades implementadas:

Listagem de pedidos
Busca por cliente, loja ou ID
Tela de detalhes
Exibição de histórico de status
Critério de aceite:
Consumo real dos endpoints
Atualização dinâmica após ações

US-07 — Implementar formulário completo de criação de pedidos

Como operador, quero criar pedidos pelo frontend no mesmo formato do JSON original, garantindo consistência estrutural.

Inclui:

store_id e order_id
Cliente (nome e telefone)
Endereço completo
Itens com código, quantidade e preço
Pagamento
Status inicial RECEIVED
Critério de aceite:
Pedido salvo no JSON com estrutura completa
Pedido aparece na listagem imediatamente

US-08 — Permitir atualização de status via frontend

Como operador, quero alterar o status do pedido pela interface.

Critério de aceite:

Apenas transições válidas exibidas
Atualização refletida no histórico

US-09 — Permitir exclusão de pedidos via frontend

Como operador, quero remover pedidos pela interface.

Critério de aceite:
Pedido removido do pedidos.json
Lista atualizada após exclusão

US-10 — Containerizar aplicação com Docker Compose

Como avaliador técnico, quero executar a aplicação via Docker, para garantir ambiente padronizado e reproduzível.

Critério de aceite:

Backend e frontend iniciando com docker compose up --build
Aplicação acessível nas portas configuradas

US-11 — Documentar arquitetura do sistema

Como avaliador, quero entender a organização interna do sistema.

Critério de aceite:

Documento explicando arquitetura em camadas
Descrição do fluxo de requisição
Justificativa das decisões técnicas

US-12 — Melhorar robustez para diferentes formatos de dados

Como desenvolvedor, quero que a interface trate variações de estrutura nos itens, evitando falhas na renderização.

Critério de aceite:
Suporte a qty e quantity
Interface não quebra com dados inconsistentes

📌 Observação Final

As histórias foram priorizadas considerando:

Dependência técnica entre funcionalidades
Critérios exigidos no desafio
Evolução incremental do sistema