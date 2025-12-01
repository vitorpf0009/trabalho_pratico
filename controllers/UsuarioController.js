const UsuarioUseCases = require('../usecases/UsuarioUseCases');

module.exports = {
    async create(req, res) {
        try {
            const resultado = await UsuarioUseCases.criarUsuario(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            const status = error.message.includes("já está em uso") ? 400 : 500;
            return res.status(status).json({ status: 'error', message: error.message });
        }
    },

    async findAll(req, res) {
        try {
            const lista = await UsuarioUseCases.listarUsuarios();
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    },

    async update(req, res) {
        try {
            const resultado = await UsuarioUseCases.atualizarUsuario(req.params.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            const status = error.message.includes("não encontrado") ? 404 : 400;
            return res.status(status).json({ status: 'error', message: error.message });
        }
    },

    async delete(req, res) {
        try {
            const resultado = await UsuarioUseCases.deletarUsuario(req.params.id);
            return res.status(200).json(resultado);
        } catch (error) {
            const status = error.message.includes("não encontrado") ? 404 : 409;
            return res.status(status).json({ status: 'error', message: error.message });
        }
    }
};