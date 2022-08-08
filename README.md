# Projeto Blogs API

Projeto backend feito para treinarmos o conteúdo de Hard Skills do curso da trybe.

O Projeto consiste de uma criação de uma API rest de Blogs utilizando a arquitetura MSC, onde teremos as principais funções como a criação de um usuário, login do mesmo e manipuação de posts no blog, onde as funções disponíveis ficarão melhor exemplificadas no tópico de [EndPoints](#endpoints).

# Habilidades

- Realizar a implementação do Docker.
- Modelar dados com **MySQL** através do **Sequelize**;
- Criar e associar tabelas usando `models` do `sequelize`;
- Construir uma **API REST** com endpoints para consumir os models criados;
- Fazer um `CRUD` utilizando `ORM`;

# Tecnologias utilizadas

Node.js, Docker, MySQL, Sequelize, Arquitetura MSC, JOI, JWT, swagger.

## Orientação

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Rodando a aplicação

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
  
  1. Clone o reposítório:
  
  ```
  git clone git@github.com:matheusmattos7/blogs-API.git
  ```
  
  2. Inicie a aplicação:
  
  ```
  docker-compose up -d --build
  ```
  3. A aplicação estára rodando na porta 3000, portanto, basta acessa-lá em: http://localhost:3000
  
  4. Caso queira para a aplicação execute o comando 
  
  ```
  docker-compose down
  ```
  
  ## 👉 Sem Docker

  1. Clone o reposítório:
  
  ```
  git clone git@github.com:matheusmattos7/blogs-API.git
  ```
  2. Instale as dependências da aplicação:
  
  ```
  npm install
  ```
  3. Inicie a aplicação com o comando:
  
  ```
  npm start
  ```
  4. A aplicação estará rodando na porta 3000, portanto, basta acessa-lá em: http://localhost:3000
  

  <br/>
</details>

### EndPoints

O acesso os endpoints pode ser feito através do swagger, após iniciar a aplicação acesse o link http://localhost:3000/doc-api, nele será possível tanto a melhor visualização dos endpoints, como também testá-las sem o uso de uma ferramenta de requisição como o `Insomnia` ou `Postman`.

<details>
<summary><strong>Resumo sobre os endpoints</strong></summary>

- POST `/login` que deve receber no body os campos `email` e `password`.
- POST `/user` que deve receber no body os campos `displayName`, `email`, `password` e `image`.
- `A partir desse ponto todos os próximos endpoints requerem validação por token que foi gerado no login (e deve ser passado no header Authorization)`
- GET `/user` que retorna todos os usários cadastrados.
- GET `/user/:id` que retorna o usuário pertencente ao id passado por parâmetro.
- POST `/categories` que deve receber no body o campo `name` para o cadastro de uma nova categoria.
- GET `/categories` que retorna todas as categorias do banco de dados.
- POST `/post` que insere um novo post no banco de dados. Deve receber no body os campos `title`, `content` e um array `categoryIds` (contendo ids de categorias já cadastradas no banco de dados).
- GET `/post` que retorna todos os posts do banco de dados.
- GET `/post/:id` que retorna um post pelo id.
- PUT `/post/:id` que edita um post por id.
- DELETE `/post/:id` que deleta um post por id.
- DELETE `/user/me` que apaga o usuário logado do banco de dados.
- GET `/post/search?q=query` que pesquisa o termo passado na URL (substituindo a palavra query) nos títulos e/ou conteúdo dos posts cadastrados no banco de dados.
</details>

---
Construído por [Matheus mattos](https://gist.github.com/matheusmattos7) no curso de desenvolvimento web da Trybe.
