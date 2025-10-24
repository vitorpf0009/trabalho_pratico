const express = require('express');
const router = express.Router();
const PassageiroController = require('../controllers/PassageiroController');

router.post('/', PassageiroController.create);
router.get('/', PassageiroController.findAll);
router.put('/:id', PassageiroController.update);
router.delete('/:id', PassageiroController.delete);

module.exports = router;