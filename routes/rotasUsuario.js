const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const {verificaJWT} = require('../controllers/segurancaController');

// Rota pública para criação de usuários
router.post('/', UsuarioController.create);

// Rotas protegidas
router.get('/', verificaJWT, UsuarioController.findAll);
router.put('/:id', verificaJWT, UsuarioController.update);
router.delete('/:id', verificaJWT, UsuarioController.delete);

module.exports = router;