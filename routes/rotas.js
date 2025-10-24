// src/routes/rotas.js

const express = require('express');
const router = express.Router();

// 1. Importe TODOS os arquivos de rota que você criou
const rotasAviao = require('./rotasAviao'); 
const rotasPassageiro = require('./rotasPassageiro');
const rotasVoo = require('./rotasVoo');

// 2. Agrupe TODAS as rotas sob seus respectivos endpoints
// Quando o frontend acessar /api/avioes, o Express usará o rotasAviao.
router.use('/avioes', rotasAviao);
// Quando o frontend acessar /api/passageiros, o Express usará o rotasPassageiro.
router.use('/passageiros', rotasPassageiro);
// Quando o frontend acessar /api/voos, o Express usará o rotasVoo.
router.use('/voos', rotasVoo);

module.exports = router;