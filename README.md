# Find a Friend - API

Projeto Node.js com Fastify, para praticar a Clean Architecture, utilizando os 5 princípios SOLID, na implementação dos casos de uso, repositórios e controllers da aplicação.
Também seguindo o TDD na criação de toda a aplicação, iniciando pelos testes unitários, para percorrer os ciclos RED>GREEN>REFACTOR até finalizar a implementação de todos os casos de uso, repositórios de testes, e controllers da aplicação.

# User Stories

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

[ ] Deve ser possível cadastrar um pet
[ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[ ] Deve ser possível filtrar pets por suas características
[ ] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível realizar login como uma ORG

### Regras de negócio

[ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
[ ] Uma ORG precisa ter um endereço e um número de WhatsApp
[ ] Um pet deve estar ligado a uma ORG
[ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[ ] Todos os filtros, além da cidade, são opcionais
[ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# Setup do projeto

- Boilerplate básico
  - npm init -y
  - .gitignore, .npmrc
  
- Instalar as dependências iniciais
  - npm i -D typescript @types/node tsup tsx
  - npx tsc --init
  - Ajustes no tsconfig.json
```json
`"target": "ES2020"`
`"baseUrl": "./"`
`"paths": 
  { 
    "@/*": ["./src/*"],
  }
```
- Configurar o eslint
  - npm i -D eslint @rocketseat/eslint-config
  - .eslintrc.json
```json
{
  "extends": ["@rocketseat/eslint-config/node"],
  "rules": {
    "camelcase": "off",
    "no-useless-constructor": "off"
  }
}
```

- Configurar o Vitest
  - npm i -D vitest supertest vite-tsconfig-paths @vitest/coverage-v8 @types/supertest
  - Criar a pasta `./prisma/vitest-environment-prisma`
  - Rodar um npm init -y nela
  - Criar o prisma-test-environment.ts, para gerar schemas únicos para cada vez que rodar testes e2e, e apagar eles depois dos testes
  - Alterar no package.json o `"main": "prisma-test-environment.ts",`

- Configurar o Prisma
  - npm i -D prisma
  - npm i @prisma/client
  - npx prisma init
  - Criação dos modelos (ver em ./prisma/schema.prisma)
  - npx prisma migrate dev

- Configurar o Docker
  - Criar o docker-compose.yml, para usar um PG da Bitnami, a ajustar as variáveis ambiente
  - Rodar `docker compose up -d`
  
- Configurar o Fastify e dependências
  - npm i fastify @fastify/cookie @fastify/cors @fastify/jwt dotenv bcryptjs dayjs zod
  - npm i -D @types/bcryptjs

- Configurar o swagger
  - npm i -D @fastify/swagger @fastify/swagger-ui

- Criar estrutura da aplicação
  - **/src**: 
    - **/http**: Contém os controladores e middlewares responsáveis por lidar com as requisições HTTP.
      - **/controllers**: Controladores que definem a lógica para manipular as requisições e enviar respostas.
      - **/middlewares**: Middlewares que são executados antes ou depois dos controladores para aplicar lógica comum de tratamento de requisições
    - **/repos**: Repositórios que fornecem acesso aos dados para as camadas superiores da aplicação.
      - **/in-memory**: Implementações de repositórios em memória para desenvolvimento e testes locais.
      - **/prisma**: Implementações de repositórios usando o Prisma ORM para acesso a um banco de dados relacional.
    - **/use-cases**: Casos de uso que encapsulam a lógica de negócios da aplicação.
      - **/errors**: Definições de erros personalizados que podem ser lançados pelos casos de uso.
      - **/factories**: Fábricas que criam instâncias de objetos complexos para os casos de uso, ajudando na separação de preocupações e reutilização de código.

- Criar os scripts para orquestrar a aplicação
```json
    "start:dev": "tsx watch src/server.ts",
    "start": "node build/server.js",
    "build": "tsup src --out-dir build",
    "test:e2e": "vitest run --dir src/http",
    "test:e2e:watch": "vitest --dir src/http",
    "pretest:e2e": "cd prisma/vitest-environment-prisma && npm link && cd ../.. && npm link vitest-environment-prisma",
    "test": "vitest run --dir src/use-cases",
    "test:watch": "vitest --dir src/use-cases",
    "test:coverage": "vitest run --coverage"
```

- 




