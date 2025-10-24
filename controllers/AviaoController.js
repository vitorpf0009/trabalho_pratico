 
const AviaoUseCases = require('../usecases/AviaoUseCases');

const AviaoController = {

    // POST /avioes
    async create(req, res) {
        try {
            const novoAviao = await AviaoUseCases.criarAviao(req.body);
            // HTTP 201 Created
            return res.status(201).json(novoAviao);
        } catch (error) {
            // Erro 400 Bad Request para erros de validação/domínio
            return res.status(400).json({ 
                error: 'Criação falhou', 
                message: error.message 
            });
        }
    },

    // GET /avioes
    async findAll(req, res) {
        try {
            const avioes = await AviaoUseCases.listarAvioes();
            return res.status(200).json(avioes);
        } catch (error) {
            return res.status(500).json({ 
                error: 'Erro de servidor', 
                message: error.message 
            });
        }
    },

    // GET /avioes/:id
    async findOne(req, res) {
        try {
            const aviao = await AviaoUseCases.buscarAviaoPorId(req.params.id);
            return res.status(200).json(aviao);
        } catch (error) {
            // Erro 404 Not Found se o avião não existir
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

    // PUT /avioes/:id
    async update(req, res) {
        try {
            const aviaoAtualizado = await AviaoUseCases.atualizarAviao(req.params.id, req.body);
            // HTTP 200 OK e retorna o objeto atualizado
            return res.status(200).json(aviaoAtualizado);
        } catch (error) {
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ 
                    error: 'Recurso não encontrado', 
                    message: error.message 
                });
            }
             // Erro 400 para erros de validação (ex: num_registro duplicado)
            return res.status(400).json({ 
                error: 'Atualização falhou', 
                message: error.message 
            });
        }
    },

    // DELETE /avioes/:id
    async delete(req, res) {
        try {
            const resultado = await AviaoUseCases.deletarAviao(req.params.id);
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

module.exports = AviaoController;