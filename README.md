# Couch Club API

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

---

## 📖 Sobre o Projeto

O **Couch Club** é uma API robusta desenvolvida para facilitar a escolha de filmes entre amigos. O "problema do que assistir" acaba aqui! A API permite que usuários criem listas de filmes e utilizem um sistema de **Matchmaking** para encontrar títulos em comum com outros usuários em tempo real.

Este projeto foi construído utilizando **NestJS** para uma arquitetura escalável, **Prisma ORM** para comunicação eficiente com o banco de dados e **Swagger** para uma documentação de endpoints interativa.

## 🚀 Funcionalidades Principais

- 🔐 **Autenticação Segura**: Registro, Login (JWT), Troca de senha e Recuperação de senha.
- 🎬 **Gestão de Listas**: Crie sua lista personalizada de filmes utilizando IDs do TMDB.
- 🤝 **Matchmaking System**:
  - Crie sessões de match com códigos únicos.
  - Entre em sessões de amigos.
  - Descubra filmes que ambos querem assistir.
- 📄 **Documentação Automática**: Interface Swagger integrada para teste de rotas.

## 🛠️ Tecnologias Utilizadas

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: PostgreSQL
- **Linguagem**: TypeScript
- **Segurança**: Passport.js, JWT, Bcrypt
- **Documentação**: Swagger UI

---

## 🏗️ Como Rodar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker (opcional, para o banco de dados)
- Conta no [TMDB](https://www.themoviedb.org/documentation/api) (para pegar os IDs dos filmes)

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/Kvothezz/couch-club-api.git
    cd couch-club-api
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**
    Crie um arquivo `.env` na raiz do projeto seguindo o modelo:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    JWT_SECRET="sua_chave_secreta_aqui"
    ```

4.  **Rode as Migrations do Prisma**
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor**
    ```bash
    # Desenvolvimento
    npm run start:dev

    # Produção
    npm run build
    npm run start:prod
    ```

---

## 📑 Documentação da API (Swagger)

Com a aplicação rodando, acesse a documentação interativa através do link:

👉 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Lá você encontrará todos os detalhes de cada endpoint, schemas de entrada/saída e poderá realizar testes diretamente pelo navegador.

---

## 🔗 Endpoints Principais

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cadastro de novo usuário |
| `POST` | `/auth/login` | Autenticação e geração de token |
| `POST` | `/match/create` | Cria uma nova sessão de matchmaking |
| `POST` | `/match/join/:code` | Entra em uma sessão existente |
| `GET` | `/lists/my-lists` | Retorna as listas do usuário logado |
| `POST` | `/lists/add-movie` | Adiciona um filme à lista |

---

## 👤 Autor

**Kvothezz** - [GitHub](https://github.com/Kvothezz)

---
<p align="center">Feito com ❤️ por um entusiasta de cinema.</p>
