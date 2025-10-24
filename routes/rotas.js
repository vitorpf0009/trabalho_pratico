// src/routes/rotas.js (BACKEND)

const express = require('express');
const router = express.Router();

// Importe TODOS os arquivos de rota
const rotasAviao = require('./rotasAviao'); 
const rotasPassageiro = require('./rotasPassageiro'); // <-- ADICIONAR
const rotasVoo = require('./rotasVoo');             // <-- ADICIONAR

// Agrupe TODAS as rotas sob o prefixo /api
router.use('/avioes', rotasAviao);
router.use('/passageiros', rotasPassageiro); // <-- ADICIONAR
router.use('/voos', rotasVoo);             // <-- ADICIONAR

module.exports = router;