// src/controllers/VooController.js

const VooUseCases = require('../usecases/VooUseCases');

const VooController = {
    async create(req, res) {
        try {
            const resultado = await VooUseCases.criarVoo(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(400).json({ status: 'error', message: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const lista = await VooUseCases.listarVoos();
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    },

    async update(req, res) {
        try {
            const resultado = await VooUseCases.atualizarVoo(req.params.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            const status = error.message.includes("não encontrado") ? 404 : 400;
            return res.status(status).json({ status: 'error', message: error.message });
        }
    },

    async delete(req, res) {
        try {
            const resultado = await VooUseCases.deletarVoo(req.params.id);
            return res.status(200).json(resultado);
        } catch (error) {
            const status = error.message.includes("não encontrado") ? 404 : 500;
            return res.status(status).json({ status: 'error', message: error.message });
        }
    }
};

module.exports = VooController;