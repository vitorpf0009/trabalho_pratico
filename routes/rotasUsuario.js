const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const {verificaJWT} = require('../controllers/segurancaController');

// Rota pública para criação de usuários
router.post('/', UsuarioController.create);
router.get('/', UsuarioController.findAll);
router.put('/:email', UsuarioController.update);
router.delete('/:email', UsuarioController.delete);

// Rotas protegidas
router.get('/', verificaJWT, UsuarioController.findAll);
router.put('/:email', verificaJWT, UsuarioController.update);
router.delete('/:email', verificaJWT, UsuarioController.delete);

module.exports = router;