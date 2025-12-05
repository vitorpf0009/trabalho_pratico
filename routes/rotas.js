

const express = require('express');
const router = express.Router();


const rotasAviao = require('./rotasAviao'); 
const rotasPassageiro = require('./rotasPassageiro');
const rotasVoo = require('./rotasVoo');
const rotasUsuario = require('./rotasUsuario');
const {login, verificaJWT} = require('../controllers/segurancaController');

router.post('/login', login);
router.get('/perfil', verificaJWT, (req, res) => {
    res.json({ status: 'success', data: req.usuario });
});
router.put('/perfil', verificaJWT, async (req, res) => {
    try {
        const UsuarioUseCases = require('../usecases/UsuarioUseCases');
        const resultado = await UsuarioUseCases.atualizarUsuario(req.usuario.email, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// Rotas protegidas por autenticação
router.use('/avioes', verificaJWT, rotasAviao);
router.use('/passageiros', verificaJWT, rotasPassageiro);
router.use('/voos', verificaJWT, rotasVoo);

module.exports = router;