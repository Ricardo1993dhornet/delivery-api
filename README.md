# Delivery API — Teste Técnico

Este projeto é uma solução para o desafio técnico de desenvolvimento de uma API chamada **delivery-api**, responsável por controlar pedidos de clientes de um delivery.

A aplicação possui:
- Uma **API REST** para cadastro, consulta, edição, exclusão e atualização do estado (status) dos pedidos.
- Uma **interface web** para visualizar os pedidos.
- Persistência em arquivo JSON (`pedidos.json`) conforme especificado no desafio.
- Execução via **Docker** (containerização).

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- Leitura/Escrita em arquivo JSON (`pedidos.json`)

### Frontend
- React
- Vite

### Infra
- Docker
- Docker Compose

---

## 🐳 Como executar o projeto com Docker

Na raiz do projeto, execute:

```bash
docker compose up --build

Acesse:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
```
---

## 📦 Como executar o projeto localmente (sem Docker)

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

A API ficará disponível em:
```
http://localhost:3000
```

---

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

A interface ficará disponível em:
```
http://localhost:5173
```

---

## 📌 Endpoints da API

### 📍 Pedidos (CRUD)

- `GET /orders`
  - Lista todos os pedidos cadastrados.

- `GET /orders/:order_id`
  - Retorna os detalhes de um pedido específico.

- `POST /orders`
  - Cria um novo pedido.
  - Todo pedido criado deve iniciar com status **RECEIVED**.

- `PUT /orders/:order_id`
  - Atualiza os dados de um pedido existente.

- `DELETE /orders/:order_id`
  - Remove um pedido.

---

### 📍 Atualização de Status

- `PATCH /orders/:order_id/status`

Exemplo de body:
```json
{
  "new_status": "CONFIRMED"
}
```

---

## 🔁 Regras de Status (Máquina de Estados)

Os pedidos possuem os seguintes estados:

- `RECEIVED`
- `CONFIRMED`
- `DISPATCHED`
- `DELIVERED`
- `CANCELED`

### Transições permitidas:

- `RECEIVED` → `CONFIRMED` ou `CANCELED`
- `CONFIRMED` → `DISPATCHED` ou `CANCELED`
- `DISPATCHED` → `DELIVERED` ou `CANCELED`
- `DELIVERED` → estado final (não pode mudar)
- `CANCELED` → estado final (não pode mudar)

---

## 🗂 Organização do Projeto

```
delivery-api/
├── backend/ # API REST em Node.js + TypeScript
│ ├── src/ # Código-fonte do backend
│ ├── pedidos.json # Dados persistidos em JSON
│ ├── Dockerfile # Imagem Docker do backend
│ ├── tsconfig.json # Configuração TypeScript
│ └── package.json # Dependências e scripts
│
├── frontend/ # Aplicação web em React + TypeScript
│ ├── src/ # Código-fonte do frontend
│ ├── public/ # Recursos públicos (HTML, ícones)
│ ├── Dockerfile # Imagem Docker do frontend
│ ├── vite.config.ts # Configuração do Vite
│ └── package.json # Dependências e scripts
│
├── backlog/ # Backlog de funcionalidades e histórias
│ └── BACKLOG.md # Lista de User Stories priorizadas
│
├── docker-compose.yml # Orquestração dos containers (backend + frontend)
│
└── README.md # Visão geral do projeto e instruções
```

---

## 🧠 Backlog

O backlog completo do projeto está disponível em:

📌 `backlog.md`

---

## 📄 Licença

Este projeto foi desenvolvido apenas para fins de avaliação técnica.
