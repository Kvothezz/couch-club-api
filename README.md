# Couch Club API

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="Swagger" />
</p>

---

API desenvolvida como projeto de TCC para resolver um problema cotidiano: a dificuldade de consenso na escolha de filmes entre duas pessoas. Em vez de depender de negociação manual, o sistema cruza automaticamente as listas de interesse dos usuários e calcula um score de afinidade baseado no histórico assistido — transformando uma decisão demorada em algo objetivo e rápido.

## Stack

- **NestJS** — arquitetura modular com IoC/DI nativo
- **PostgreSQL** + **Prisma ORM** — persistência relacional com migrações versionadas
- **TypeScript** — tipagem estática ponta a ponta
- **JWT** + **Bcrypt** — autenticação stateless e armazenamento seguro de senhas
- **Swagger** — documentação interativa dos endpoints

## Como rodar

**Pré-requisitos:** Node.js v18+, PostgreSQL (ou Docker)

```bash
git clone https://github.com/Kvothezz/couch-club-api.git
cd couch-club-api
npm install
```

Crie o `.env` na raiz:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="sua_chave_secreta"
```

```bash
npx prisma migrate dev
npm run start:dev
```

Documentação Swagger disponível em `http://localhost:3000/api/docs`.

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/register` | Cadastro de usuário |
| `POST` | `/auth/login` | Login e geração de token JWT |
| `GET` | `/lists/my-lists` | Listas do usuário autenticado |
| `POST` | `/lists/add-movie` | Adiciona filme via ID do TMDB |
| `POST` | `/match/create` | Cria sessão de match |
| `POST` | `/match/join/:code` | Entra na sessão e processa o match |

## Como funciona o match

O sistema implementa dois algoritmos baseados em teoria dos conjuntos:

- **Match Direto** — interseção das listas "Quero Assistir" dos dois usuários
- **Score de Afinidade** — Índice de Jaccard sobre as listas "Já Assisti", retornando um coeficiente de 0 a 1

A sincronização entre os usuários usa short polling (`GET /match/status/:code`), sem necessidade de WebSocket.

## Autor

[Kvothezz](https://github.com/Kvothezz)
