# Desafio-ES
## Pré-requisitos

Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixar a versão mais recente do Node.js [aqui](https://nodejs.org/).

Além disso, o projeto utiliza o PostgreSQL como banco de dados. Você precisará instalá-lo e configurá-lo na sua máquina. Você pode obter o PostgreSQL [aqui](https://www.postgresql.org/download/).

## Clonando o repositório

Para clonar o repositório, execute o seguinte comando no terminal:


    git clone https://github.com/jajpert/Desafio-ES.git

## Navegando até o diretório do projeto

Navegue até o diretório do projeto:

    cd .\Desafio-ES\

## Instalando as dependências

### Backend

Navegue até o diretório do backend e instale as dependências:

    cd .\backend\
    npm install

### Frontend

Navegue até o diretório do frontend e instale as dependências:

    cd ..
    cd .\frontend\
    npm install 

## Configurando o banco de dados

1. Certifique-se de que o PostgreSQL está instalado e em execução.

2. A criação do banco de dados para o projeto está detalhada no arquivo desafio_es.sql. Você pode utilizar a ferramenta de linha de comando `psql` ou qualquer cliente de PostgreSQL de sua escolha para executar o script e configurar o banco de dados. Caso prefira criar a base de dados manualmente, execute o seguinte comando:

    ```bash
    create database desafio_es
    ```

3. Configure as variáveis de ambiente para o banco de dados no arquivo `.env` na pasta `backend`. Exemplo de configuração:

    ```
    DB_HOST=[string]
    DB_PORT=[number]
    DB=[string]
    DB_USER=[string]
    DB_PASS=[string]
    ```

## Scripts disponíveis

### Backend

No arquivo `package.json` do backend, você encontrará os seguintes scripts:

- `start`: Inicia o servidor backend usando `node`.
- `dev`: Inicia o servidor backend usando `nodemon` para desenvolvimento, reiniciando automaticamente o servidor sempre que houver mudanças no código.

Para iniciar o servidor backend em modo de desenvolvimento, execute:

    npm run dev

Para iniciar o servidor backend em modo de produção, execute:

    npm start

### Frontend

No arquivo package.json do frontend, você encontrará os seguintes scripts:

- `dev`: Inicia o servidor frontend usando o Vite em modo de desenvolvimento.
- `build`: Compila o projeto TypeScript e realiza o build do frontend.
- `lint`: Executa o ESLint para análise estática do código.
- `preview`: Pré-visualiza o build de produção do frontend.

Para iniciar o servidor frontend em modo de desenvolvimento, execute:

    ```
    npm run dev
    ```

Para realizar o build do frontend para produção, execute:
    ```
    npm run build
    ```

Para pré-visualizar o build de produção, execute:
    ```
    npm run preview
    ```

Para verificar a conformidade do código com as regras do ESLint, execute:
    ```
    npm run lint
    ```
