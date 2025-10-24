const express = require('express');
const router = express.Router();

// Importe TODOS os arquivos de rota
const rotasAviao = require('./rotasAviao'); 
const rotasPassageiro = require('./rotasPassageiro'); // <-- Faltando no seu repo
const rotasVoo = require('./rotasVoo');             // <-- Faltando no seu repo

// Agrupe TODAS as rotas
router.use('/avioes', rotasAviao);
router.use('/passageiros', rotasPassageiro); // <-- Faltando no seu repo
router.use('/voos', rotasVoo);             // <-- Faltando no seu repo

module.exports = router;