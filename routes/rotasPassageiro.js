const express = require('express');
const router = express.Router();
const PassageiroController = require('../controllers/PassageiroController');

// C (Create) - POST /api/passageiros
router.post('/', PassageiroController.create);

// R (Read) - GET /api/passageiros
router.get('/', PassageiroController.findAll);

// R (Read) - GET /api/passageiros/:id
router.get('/:id', PassageiroController.findOne);

// U (Update) - PUT /api/passageiros/:id
router.put('/:id', PassageiroController.update);

// D (Delete) - DELETE /api/passageiros/:id
router.delete('/:id', PassageiroController.delete);

module.exports = router;