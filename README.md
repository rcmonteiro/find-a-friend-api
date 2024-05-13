# Find a Friend - API

Projeto Node.js com Fastify e Zod, para praticar a Clean Architecture, utilizando os 5 princípios SOLID, na implementação dos casos de uso, repositórios e controllers da aplicação.
Também seguindo o TDD na criação de toda a aplicação, iniciando pelos testes unitários, para percorrer os ciclos RED>GREEN>REFACTOR até finalizar a implementação de todos os casos de uso, repositórios de testes, e controllers da aplicação.


# User Stories

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

--  

# Como rodar o projeto

### Clone o repositório
```bash
gh repo clone https://github.com/rcmonteiro/find-a-friend-api.git
```

### Instale as dependências
```bash
pnpm i
```

### Suba as imagens da aplicação
```bash
docker-compose build
docker-compose up -d
```

### Configure as variáveis de ambiente
```bash
cp .env.sample .env
cp .env.sample .env.docker
```
Edite o arquivo `.env.docker` para apontar o postgress para o host definido em nosso docker-compose:
```
DATABASE_URL="postgresql://docker:docker@localhost:5432/find-a-friend-pg?schema=public"
```
Estamos com dois arquivos de variáveis de ambiente, um para rodar localmente, assim podemos rodar os testes apontando para o banco de dados em localhost, mas no docker, precisamos apontar pelo container_name, que é como funciona o ambiente de redes nas imagens do docker.

### Configure o prisma
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### Rode a aplicação
```bash
pnpm start:dev
```

### Teste as rotas
- Swagger http://localhost:3001/docs/static/index.html
- Teste as rotas com httpie: `./api.http`


### Rodar os testes unitários e e2e
```bash
pnpm run test:coverage
```
![alt text](./public/coverage.png)
