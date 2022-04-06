<p align="center">
    <h2 align="center">Lucas Amorim Lima</h2>
</p> 

## :rocket: Quick start

### Step 1: Clone o repositório 

Fork o repositório. em seguida, clone-o localmente fazendo:

```bash
https://github.com/LucasAmorimLima/ubistart
```

### Step 2: Instalando as dependências 

Entre no diretório

```bash
cd ubistart
```

Instalando todas as dependências 
```bash
npm install
```

### Step 3: Iniciando o server de desenvolvimento

Para iniciar o server de desenvolvimento execute:
```
npm start
```

Após rodar o servidor de desenvolvimento a API deve estar disponível em: https://localhost:3333

### Step 4: Criando Usuários

Antes de começar deve-se alterar as configurações do banco de dados para a sua preferência no arquivo ormconfig.json, estou usando 
```
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "root",
   "password": "123456789",
   "database": "ubistart",
```



## :open_file_folder: O que têm dentro?

Um rápido overview da estrutura do projeto
```
    .
    ├── api
    │   ├── user
    |   |    ├───controller
    │   |    ├───database
    │   |    ├───entity
    │   |    ├───factories
    │   |    ├───useCases
    │   |    ├───middlewares
    │   |    └───accessToken
    │   ├── task
    |   |    ├───controller
    │   |    ├───database
    │   |    ├───entity
    │   |    ├───factories
    │   |    ├───useCases
    │   |    └───middlewares
    ├── configs
    ├── routes
```
## Diagrama
Como eu abstrair as informações do desafio e como foi aplicado
<img src="https://github.com/LucasAmorimLima/LucasAmorimLima/blob/main/ubistartModel.png" >

## Bibliotecas e Frameworks ultilizados

1. Express
2. JWT
3. Swagger
4. typescript
5. TypeORM


## Explicações

1. Express
  
  Usei o express, mesmo não sendo o framework mais produtivo para mostrar meus conhecimento na base do Node,
  framework como NestJS tem um desenvolvimento de APIs mais opinado, entretando também desenvolvo em NestJS.
  
  
2. JWT

  Json web token é uma forma de verificação de acesso em uma API, bastante usada em projetos e também uma requisição do desafio.
  

4. Swagger

  Ultilizo para fazer a documentação dos projetos sendo que também é possível testa-la, está funcionalidade considero muito importante pois o FrontEnd irá saber extamente como é o retormo recebido dos endpoints.
  
5. Typescript

  Umas das pricipais vantagens do Typescript é a detecção de erros durante o desenvolvimento é possivel também ultilizar o IntelliSense da IDE facilitando ainda mais o desenvolvimento,  o  Typescript também conta com algumas funções que ainda não são nativas no node, além de ajudar na manutenabilidade do código, por ser uma estrutura mais tipada.
  
  
7. TypeORM

  É um ORM(Object-Relational Mapping) bastante famoso e ultilizado em projetos, decidir ultilizar ele pela facilidade de interação e configuração em node.
    
## Swagger

Depois que a aplicação é iniciada, voçê pode ver a documentação do projeto acessando :
```
http://localhost:3333/api-docs
```
