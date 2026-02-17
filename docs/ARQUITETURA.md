# Arquitetura do Projeto — Delivery API

Este documento descreve a arquitetura adotada para a solução do desafio.

---

## Visão Geral

O projeto é dividido em dois módulos principais:

- **backend/**: API REST responsável por manipular os pedidos e persistir no arquivo `pedidos.json`.
- **frontend/**: Interface web para visualizar pedidos e informações relevantes.

---

## Backend (Node.js + Express)

### Objetivo
Expor endpoints REST para:
- CRUD de pedidos
- Atualização de status seguindo uma máquina de estados

### Organização por camadas

- **routes/**: define as rotas HTTP e aponta para controllers.
- **controllers/**: recebe a requisição, valida entradas e chama services.
- **services/**: contém as regras de negócio (CRUD e máquina de estados).
- **repositories/**: responsável por ler e escrever no arquivo `pedidos.json`.
- **validators/**: validações específicas (ex: transição de status).
- **utils/**: funções utilitárias (ex: gerar UUID, datas).

---

## Frontend (React + Vite)

### Objetivo
Permitir a visualização dos pedidos de forma simples.

### Telas recomendadas
- Lista de pedidos (status atual, cliente, total, loja)
- Detalhes do pedido (itens, endereço, pagamentos, histórico de status)

---

## Docker

O projeto deve ser executável via Docker, utilizando:
- Dockerfile para o backend
- Dockerfile para o frontend
- docker-compose.yml para subir ambos com um único comando

---

## Persistência

Os pedidos são armazenados no arquivo:
- `backend/pedidos.json`

A API deve considerar que o arquivo já contém registros previamente inseridos.
