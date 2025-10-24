 
const express = require('express');
const router = express.Router();
const VooController = require('../controllers/VooController');

// C  
router.post('/', VooController.create);

// R  
router.get('/', VooController.findAll);

// R O
router.get('/:id', VooController.findOne);

// U  
router.put('/:id', VooController.update);

// D  
router.delete('/:id', VooController.delete);

module.exports = router;
