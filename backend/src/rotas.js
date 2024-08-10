const express = require('express');
const paises = require('./controller/paises');

const rotas = express();

rotas.get('/paises', paises.obterPaises);

module.exports = rotas;
