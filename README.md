# API REST para Gerenciamento de Posts de Blog

## Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Autenticação](#autenticação)

## Sobre

Esta é uma API REST construída com Node.js e Sequelize para o gerenciamento de posts de blog. A API oferece funcionalidades de criação, leitura, atualização e exclusão (CRUD) de posts, além de categorização de posts e autenticação de usuário.

## Tecnologias Utilizadas

- Node.js
- Sequelize
- MySQL
- JWT para autenticação

## Instalação

1. Clone o repositório
   ```
   git clone https://github.com/gialencar/blog-api.git
   ```
2. Instale as dependências
   ```bash
   npm install
   ```
3. Configure o arquivo `.env`
   ```
   MYSQL_USER=root
   MYSQL_PASSWORD=123456
   HOSTNAME=localhost
   MYSQL_PORT=3306
   NODE_ENV=development
   JWT_SECRET=super_secret
   ```
4. Inicie o servidor
   ```bash
   npm start
   ```

## Endpoints

### [Documentação online 🔗](https://documenter.getpostman.com/view/20130984/2s946mZA2S#427940c9-fec0-4d4a-9c29-c20d0e377978)

### Usuários

- `POST /user` - Cria um novo usuário
- `POST /login` - Autentica um usuário e retorna um token JWT
- `GET /user` - Lista todos os usuários
- `GET /user/:id` - Obtém informações de um usuário específico
- `DELETE /user/me` - Exclui o usuário autenticado

### Posts

- `POST /post` - Cria um novo post
- `GET /post` - Lista todos os posts
- `GET /post/:id` - Obtém um post específico
- `PUT /post/:id` - Atualiza um post específico
- `DELETE /post/:id` - Exclui um post específico
- `GET /post/search?q=:searchTerm` - Pesquisa posts por termo

### Categorias

- `POST /categories` - Cria uma nova categoria
- `GET /categories` - Lista todas as categorias

## Autenticação

Todos os endpoints requerem um token JWT, que deve ser incluído no header `Authorization`.
