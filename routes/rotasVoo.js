// src/routes/rotasVoo.js

const express = require('express');
const router = express.Router();
const VooController = require('../controllers/VooController');

// Define as rotas para o CRUD de Voos
router.post('/', VooController.create);        // POST /api/voos
router.get('/', VooController.findAll);         // GET /api/voos
router.put('/:id', VooController.update);       // PUT /api/voos/:id
router.delete('/:id', VooController.delete);    // DELETE /api/voos/:id

module.exports = router;