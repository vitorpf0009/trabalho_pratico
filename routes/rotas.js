

const express = require('express');
const router = express.Router();


const rotasAviao = require('./rotasAviao'); 
const rotasPassageiro = require('./rotasPassageiro');
const rotasVoo = require('./rotasVoo');


router.use('/avioes', rotasAviao);

router.use('/passageiros', rotasPassageiro);

router.use('/voos', rotasVoo);

module.exports = router;