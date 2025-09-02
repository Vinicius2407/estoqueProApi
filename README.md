# EstoquePro API

API para o sistema de gerenciamento de estoque EstoquePro.

## Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon](https://neon.tech/)
- [Zod](https://zod.dev/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## Primeiros Passos

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/)

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/estoquepro.git
    ```
2. Navegue até o diretório da API:
    ```bash
    cd estoquepro/api
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example`, e preencha as variáveis de ambiente necessárias.

### Configuração

O arquivo `.env` contém as seguintes variáveis:

- `DATABASE_URL`: A URL de conexão com o banco de dados Neon.
- `JWT_SECRET`: Uma chave secreta para assinar os tokens JWT.

### Migrations do Banco de Dados

Este projeto utiliza o `drizzle-kit` para gerenciar as migrations do banco de dados. Para criar uma nova migration, execute:

```bash
npx drizzle-kit generate
```

Para aplicar as migrations, execute:

```bash
npx drizzle-kit migrate
```

### Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com hot-reload, execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com `nodemon`.
- `npm run dev:serverless`: Inicia o servidor em modo serverless offline.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run format`: Formata o código com `prettier`.
- `npm run format:check`: Verifica a formatação do código.

## Endpoints da API

### Autenticação

#### `POST /v1/user`

Cria um novo usuário.

**Request Body:**

```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "telephone": "11999999999",
    "document": "12345678901"
}
```

**Response (201 Created):**

```json
{
    "user": {
        "id": "1",
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
}
```

#### `POST /v1/signin`

Autentica um usuário e retorna um token de acesso.

**Request Body:**

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Response (200 OK):**

```json
{
    "accessToken": "..."
}
```

### Categorias

#### `POST /v1/category`

Cria uma nova categoria (requer autenticação).

**Request Body:**

```json
{
    "name": "Eletrônicos"
}
```

**Response (201 Created):**

```json
{
    "category": {
        "id": 1,
        "name": "Eletrônicos"
    }
}
```

#### `GET /v1/category/:id`

Obtém uma categoria pelo ID (requer autenticação).

**Response (200 OK):**

```json
{
    "category": {
        "id": 1,
        "name": "Eletrônicos"
    }
}
```

## Estrutura do Projeto

O projeto segue uma arquitetura limpa, dividida nas seguintes camadas:

- `src/core`: Contém a lógica de negócio da aplicação, independente de frameworks.
    - `application`: Define os casos de uso da aplicação e as interfaces (portas) para as camadas externas.
        - `use-cases`: Implementação dos casos de uso (ex: `CreateUser`, `SignIn`).
        - `ports`: Interfaces que definem os contratos para a camada de infraestrutura (ex: `IUserRepository`, `IJWT`).
    - `domain`: Contém os modelos de domínio, entidades e regras de negócio.
        - `models`: As classes de domínio (ex: `User`, `Category`).
        - `errors`: Erros de negócio customizados.
- `src/infrastructure`: Contém as implementações das portas e a configuração dos frameworks.
    - `driven`: Adapters que implementam as portas de saída (outbound), conectando-se a serviços externos.
        - `persistence`: Implementação dos repositórios para acesso ao banco de dados (ex: `UserRepository` com Drizzle).
        - `services`: Implementação de outros serviços externos (ex: `JWTToken`, `PasswordHasher`).
    - `driving`: Adapters que recebem as requisições (inbound) e invocam os casos de uso.
        - `http`: Controllers, rotas e configuração do Fastify.
    - `main`: Ponto de entrada da camada de infraestrutura, responsável pela inicialização e injeção de dependências.
- `src/index.ts`: Ponto de entrada da aplicação, onde o servidor é iniciado.
