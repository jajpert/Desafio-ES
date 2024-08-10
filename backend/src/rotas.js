const express = require('express');

const rotas = express();

const e = (req, res) => {
  res.send('Aqui foi :)');
};

rotas.get('/', e);

module.exports = rotas;
