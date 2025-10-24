const PassageiroUseCases = require('../usecases/PassageiroUseCases');

module.exports = {
    async create(req, res) {
        try {
            const resultado = await PassageiroUseCases.criarPassageiro(req.body);
            return res.status(201).json(resultado);
        } catch (error) { return res.status(400).json({ status: 'error', message: error.message }); }
    },
    async findAll(req, res) {
        try {
            const lista = await PassageiroUseCases.listarPassageiros();
            return res.status(200).json(lista);
        } catch (error) { return res.status(500).json({ status: 'error', message: error.message }); }
    },
    async update(req, res) {
        try {
            const resultado = await PassageiroUseCases.atualizarPassageiro(req.params.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) { return res.status(404).json({ status: 'error', message: error.message }); }
    },
    async delete(req, res) {
        try {
            const resultado = await PassageiroUseCases.deletarPassageiro(req.params.id);
            return res.status(200).json(resultado);
        } catch (error) { return res.status(404).json({ status: 'error', message: error.message }); }
    }
};