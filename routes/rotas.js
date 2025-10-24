 
const express = require('express');
const router = express.Router();

// Importa os arquivos de rota de cada entidade
const rotasAviao = require('./rotasAviao');
  const rotasPassageiro = require('./rotasPassageiro'); // Adicionar depois
  const rotasVoo = require('./rotasVoo'); // Adicionar depois

// Agrupa as rotas sob um prefixo comum /api/...
router.use('/avioes', rotasAviao);
  router.use('/passageiros', rotasPassageiro);
 router.use('/voos', rotasVoo);

module.exports = router;