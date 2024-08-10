const express = require('express');
const paises = require('./controller/paises');
const enderecos = require('./controller/enderecos');

const rotas = express();

rotas.get('/enderecos/:cep', enderecos.obterEndereco);
rotas.get('/paises', paises.obterPaises);

module.exports = rotas;
