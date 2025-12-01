

const express = require('express');
const router = express.Router();


const rotasAviao = require('./rotasAviao'); 
const rotasPassageiro = require('./rotasPassageiro');
const rotasVoo = require('./rotasVoo');
const rotasUsuario = require('./rotasUsuario');
const {login, verificaJWT} = require('../controllers/segurancaController');

router.post('/login', login);

router.use('/avioes', verificaJWT, rotasAviao);

router.use('/passageiros', verificaJWT, rotasPassageiro);

router.use('/voos', verificaJWT, rotasVoo);

router.use('/usuarios', verificaJWT, rotasUsuario);

module.exports = router;