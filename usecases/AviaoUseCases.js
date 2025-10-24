// src/usecases/AviaoUseCases.js

const db = require('../entities');
const Aviao = db.Aviao;

const AviaoUseCases = {
    async criarAviao(dadosAviao) {
        try {
            const novoAviao = await Aviao.create(dadosAviao);
            // CORREÇÃO: Retornar o objeto de sucesso que o frontend espera
            return { status: 'success', message: 'Avião cadastrado com sucesso!', data: novoAviao };
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                 throw new Error(`O número de registro '${dadosAviao.num_registro}' já existe.`);
            }
            throw new Error(`Erro ao criar avião: ${error.message}`);
        }
    },

    async listarAvioes() {
        try {
            return await Aviao.findAll();
        } catch (error) {
            throw new Error(`Erro ao buscar aviões: ${error.message}`);
        }
    },

    async atualizarAviao(id, novosDados) {
        try {
            const [linhasAfetadas] = await Aviao.update(novosDados, { where: { id } });
            if (linhasAfetadas === 0) {
                throw new Error("Avião não encontrado para atualização.");
            }
            const aviaoAtualizado = await Aviao.findByPk(id);
            // CORREÇÃO: Retornar o objeto de sucesso que o frontend espera
            return { status: 'success', message: 'Avião atualizado com sucesso.', data: aviaoAtualizado };
        } catch (error) {
            throw new Error(`Erro ao atualizar avião: ${error.message}`);
        }
    },

    async deletarAviao(id) {
        try {
            const resultado = await Aviao.destroy({ where: { id } });
            if (resultado === 0) {
                throw new Error("Avião não encontrado para exclusão.");
            }
            return { status: 'success', message: `Avião ID ${id} foi excluído.` };
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                 throw new Error("Não é possível excluir, pois existem voos associados a este avião.");
            }
            throw new Error(`Erro ao deletar avião: ${error.message}`);
        }
    }
};

module.exports = AviaoUseCases;