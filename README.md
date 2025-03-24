# API para E-commerce

Este projeto consiste em uma API para um e-commerce, desenvolvida com **NestJS** e **GraphQL**, com foco na gestão de **usuários**, **produtos** e **pedidos**. A API inclui autenticação, autorização e recursos administrativos para gerenciar as informações de produtos e pedidos, além de permitir a integração com sistemas externos por meio de chaves secretas.

A aplicação foi projetada para ser escalável, segura e eficiente, com integração de autenticação **JWT**, **hashing de senha com Bcrypt** e manipulação de banco de dados utilizando **Mongoose**.

## Tecnologias

- **Node.js**
- **NestJS** com **GraphQL**
- **MongoDB** (utilizando **Mongoose**)
- **JWT** para autenticação
- **Bcrypt** para hashing de senha
- **Docker** para containerização
- **GraphQL Playground** para documentação interativa

## Passo 1: Clonar o Repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/matheusLdev/projeto-api-graphql.git
```

## Passo 2: Instalar Dependências

Instale as dependências do projeto utilizando o **npm**:

```bash
# Usando npm
npm install
```

## Passo 3: Configuração do Banco de Dados

Configure o banco de dados no arquivo `.env`:

```plaintext
MONGODB_URI= uri-database
JWT_SECRET= jwt-secret
SUPER_SECRET_TOKEN= super-secret-token
```

## Passo 4: Executar a Aplicação

Com as dependências instaladas e o banco de dados configurado, inicie a aplicação localmente com o seguinte comando:

```bash
# Usando npm
npm run start
```

A API estará disponível em `http://localhost:3000`.

## Passo 5: Deploy

O deploy do projeto foi disponibilizado na plataforma **Railway**. Acesse a API pelo link: `https://localhost:3000`


## DockerHub

A imagem Docker do projeto foi disponibilizada no DockerHub. Você pode fazer o download da imagem com o comando abaixo:

```bash
docker pull matheusdevni/projeto-api-graphql:latest
```

## Documentação Interativa

A documentação da API pode ser acessada através do **GraphQL Playground**, que esta habilitado na aplicação para facilitar a interação com as rotas da API.

- Para **GraphQL Playground**, acesse: `http://localhost:3000/graphql`

## Conclusão
Esse projeto oferece uma API funcional e escalável para e-commerce com as funcionalidades essenciais para o gerenciamento de produtos, pedidos e usuários. Ele inclui autenticação com JWT, gerenciamento de permissões e uma arquitetura que pode ser facilmente expandida conforme as necessidades do sistema.
