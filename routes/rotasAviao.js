 
const express = require('express');
const router = express.Router();
const AviaoController = require('../controllers/AviaoController');

 

// C (Create) - POST /api/avioes
router.post('/', AviaoController.create);

// R (Read) - GET /api/avioes
router.get('/', AviaoController.findAll);

// R (Read) - GET /api/avioes/:id
router.get('/:id', AviaoController.findOne);

// U (Update) - PUT /api/avioes/:id
router.put('/:id', AviaoController.update);

// D (Delete) - DELETE /api/avioes/:id
router.delete('/:id', AviaoController.delete);

module.exports = router;