const express = require('express');
const paises = require('./controller/paises');
const enderecos = require('./controller/enderecos');
const instituicoes = require('./controller/instituicoes');

const rotas = express();

rotas.get('/enderecos/:cep', enderecos.obterEndereco);
rotas.get('/paises', paises.obterPaises);

rotas.post('/cadastrarInst', instituicoes.cadastrarInst);
rotas.patch('/editarStatusInst/:id', instituicoes.ativarInst);
rotas.get('/instituicoes', instituicoes.obterInst);
rotas.put('/editarInst/:id', instituicoes.editarInst);

module.exports = rotas;
