const PassageiroUseCases = require('../usecases/PassageiroUseCases');

const PassageiroController = {

    // POST /passageiros
    async create(req, res) {
        try {
            const novoPassageiro = await PassageiroUseCases.criarPassageiro(req.body);
            // HTTP 201 Created
            return res.status(201).json(novoPassageiro);
        } catch (error) {
            // Erro 400 Bad Request para erros de validação/domínio (ex: e-mail duplicado)
            return res.status(400).json({ 
                error: 'Criação falhou', 
                message: error.message 
            });
        }
    },

    // GET /passageiros
    async findAll(req, res) {
        try {
            const passageiros = await PassageiroUseCases.listarPassageiros();
            return res.status(200).json(passageiros);
        } catch (error) {
            return res.status(500).json({ 
                error: 'Erro de servidor', 
                message: error.message 
            });
        }
    },

    // GET /passageiros/:id
    async findOne(req, res) {
        try {
            const passageiro = await PassageiroUseCases.buscarPassageiroPorId(req.params.id);
            return res.status(200).json(passageiro);
        } catch (error) {
            // Erro 404 Not Found se o passageiro não existir
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ 
                    error: 'Recurso não encontrado', 
                    message: error.message 
                });
            }
            return res.status(500).json({ 
                error: 'Erro de servidor', 
                message: error.message 
            });
        }
    },

    // PUT /passageiros/:id
    async update(req, res) {
        try {
            const passageiroAtualizado = await PassageiroUseCases.atualizarPassageiro(req.params.id, req.body);
            // HTTP 200 OK e retorna o objeto atualizado
            return res.status(200).json(passageiroAtualizado);
        } catch (error) {
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ 
                    error: 'Recurso não encontrado', 
                    message: error.message 
                });
            }
             // Erro 400 para erros de validação (ex: e-mail duplicado)
            return res.status(400).json({ 
                error: 'Atualização falhou', 
                message: error.message 
            });
        }
    },

    // DELETE /passageiros/:id
    async delete(req, res) {
        try {
            const resultado = await PassageiroUseCases.deletarPassageiro(req.params.id);
            // HTTP 200 OK com mensagem de sucesso
            return res.status(200).json(resultado);
        } catch (error) {
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ 
                    error: 'Recurso não encontrado', 
                    message: error.message 
                });
            }
            // Erro 409 Conflict se houver restrição de chave estrangeira
            if (error.message.includes("Não é possível excluir")) {
                return res.status(409).json({ 
                    error: 'Conflito de dependência', 
                    message: error.message 
                });
            }
            return res.status(500).json({ 
                error: 'Erro de servidor', 
                message: error.message 
            });
        }
    }
};

module.exports = PassageiroController;