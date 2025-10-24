// src/usecases/AviaoUseCases.js
const db = require('../entities');
const Aviao = db.Aviao;

const AviaoUseCases = {

    
    async criarAviao(dadosAviao) {
        try {
            const novoAviao = await Aviao.create(dadosAviao);
            return novoAviao;
        } catch (error) {
            // Lógica para tratar erros do banco de dados (ex: registro duplicado)
            if (error.name === 'SequelizeUniqueConstraintError') {
                 throw new Error(`O número de registro '${dadosAviao.num_registro}' já existe.`);
            }
            throw new Error(`Erro ao criar avião: ${error.message}`);
        }
    },

   
    async listarAvioes() {
        try {
            const avioes = await Aviao.findAll();
            return avioes;
        } catch (error) {
            throw new Error(`Erro ao buscar aviões: ${error.message}`);
        }
    },

 
    async buscarAviaoPorId(id) {
        try {
            const aviao = await Aviao.findByPk(id);
            if (!aviao) {
                throw new Error("Avião não encontrado.");
            }
            return aviao;
        } catch (error) {
            throw new Error(`Erro ao buscar avião por ID: ${error.message}`);
        }
    },

 
    async atualizarAviao(id, novosDados) {
        try {
            const [linhasAfetadas] = await Aviao.update(novosDados, {
                where: { id: id }
            });

            if (linhasAfetadas === 0) {
                throw new Error("Avião não encontrado para atualização.");
            }
            // Retorna o avião atualizado
            return this.buscarAviaoPorId(id);

        } catch (error) {
            throw new Error(`Erro ao atualizar avião: ${error.message}`);
        }
    },

 
    async deletarAviao(id) {
        try {
            const resultado = await Aviao.destroy({
                where: { id: id }
            });

            if (resultado === 0) {
                throw new Error("Avião não encontrado para exclusão.");
            }
            return { message: `Avião ID ${id} excluído com sucesso.` };

        } catch (error) {
            // Se o erro for devido à FOREIGN KEY (Voo usando o Aviao)
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                 throw new Error("Não é possível excluir o avião, pois existem voos ativos associados a ele.");
            }
            throw new Error(`Erro ao deletar avião: ${error.message}`);
        }
    }
};

module.exports = AviaoUseCases;