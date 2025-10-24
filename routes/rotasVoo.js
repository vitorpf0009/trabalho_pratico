// src/routes/rotasVoo.js

const express = require('express');
const router = express.Router();
const VooController = require('../controllers/VooController');

router.post('/', VooController.create);
router.get('/', VooController.findAll);
router.put('/:id', VooController.update);
router.delete('/:id', VooController.delete);

module.exports = router;