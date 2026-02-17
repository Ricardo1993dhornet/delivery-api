# Backlog do Projeto — Delivery API

Este backlog foi criado para organizar o desenvolvimento do sistema em ordem lógica de execução.

---

## ✅ Parte 1 — MVP (Obrigatório para entrega do desafio)

### 1. Criar repositório e estrutura inicial do projeto
- Criar repositório no GitHub com nome `delivery-api`
- Criar pastas principais (`backend`, `frontend`, `docs`, `backlog`)
- Criar `.gitignore`
- Criar `README.md` inicial

**Critério:** preparar a base do projeto com organização profissional desde o início.

---

### 2. Criar projeto Backend com Node.js + Express
- Configurar servidor Express
- Configurar CORS
- Criar rota de teste (`GET /health`)

**Critério:** garantir que a API esteja funcionando antes de iniciar o CRUD.

---

### 3. Implementar leitura e escrita do arquivo `pedidos.json`
- Ler o arquivo ao iniciar a API
- Manter os pedidos carregados em memória
- Salvar novamente no arquivo sempre que houver alteração

**Critério:** requisito obrigatório do desafio.

---

### 4. Implementar CRUD completo de pedidos
- `GET /orders` → listar todos os pedidos
- `GET /orders/:order_id` → buscar por ID
- `POST /orders` → criar pedido
- `PUT /orders/:order_id` → atualizar pedido
- `DELETE /orders/:order_id` → excluir pedido

**Critério:** atender o padrão REST e cobrir todas as operações básicas.

---

### 5. Implementar a máquina de estados dos pedidos
- Criar validação de transições permitidas
- Garantir que pedidos não retornem a estados anteriores
- Garantir que `DELIVERED` e `CANCELED` sejam finais

**Critério:** cumprir exatamente as regras do desafio.

---

### 6. Criar endpoint para atualização de status
- `PATCH /orders/:order_id/status`
- Atualizar:
  - `last_status_name`
  - array `statuses` com o novo registro

**Critério:** manter o histórico de status completo.

---

### 7. Criar projeto Frontend com React + Vite
- Configurar estrutura do frontend
- Criar layout base

**Critério:** preparar a interface para consumo da API.

---

### 8. Criar interface para visualização dos pedidos
- Tela de listagem de pedidos
- Tela de detalhes do pedido
- Mostrar status atual e informações principais

**Critério:** requisito obrigatório do desafio.

---

### 9. Integrar Frontend com Backend
- Consumir API real
- Mostrar pedidos na interface

**Critério:** garantir funcionamento completo ponta a ponta.

---

### 10. Dockerizar Backend e Frontend
- Criar Dockerfile do backend
- Criar Dockerfile do frontend
- Criar docker-compose.yml para subir tudo com um comando

**Critério:** permitir execução sem depender de IDE.

---

### 11. Finalizar README.md com instruções completas
- Como rodar localmente
- Como rodar com Docker
- Endpoints principais
- Regras de status
- Organização do projeto

**Critério:** facilitar avaliação e execução por qualquer pessoa.

---

## 🚀 Parte 2 — Melhorias Futuras (Roadmap)

Estas melhorias não são obrigatórias para entrega, mas podem ser adicionadas para evolução do projeto.

### Melhorias recomendadas
- Documentação automática com Swagger (OpenAPI)
- Paginação, ordenação e filtros em `GET /orders`
- Validação de dados com Zod ou Joi
- Testes unitários e de integração (Jest + Supertest)
- Logs estruturados (ex: pino)
- Tratamento global de erros
- Separar regras de negócio em camadas mais completas
- Migrar persistência de JSON para banco de dados (PostgreSQL ou MongoDB)
- CI/CD com GitHub Actions
- Deploy em plataforma gratuita (Render/Railway/Vercel)

---
