CREATE DATABASE desafio_es;

CREATE TABLE instituicao (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(32) NOT NULL,
  sigla VARCHAR(8) NOT NULL,
  pais VARCHAR(60) NOT NULL,
  cnpj VARCHAR(14),
  cep VARCHAR(9),
  logradouro TEXT NOT NULL,
  bairro VARCHAR(60),
  estado VARCHAR(32) NOT NULL,
  municipio VARCHAR(50) NOT NULL,
  numero INT,
  complemento VARCHAR(32)
);
