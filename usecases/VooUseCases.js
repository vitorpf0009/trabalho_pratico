// src/usecases/VooUseCases.js

const db = require('../entities');
const Voo = db.Voo;
const Aviao = db.Aviao;
const Passageiro = db.Passageiro;

const VooUseCases = {
    async criarVoo(dados) {
        try {
            const novoVoo = await Voo.create(dados);
            // CORREÇÃO: Retornar o objeto de sucesso que o frontend espera
            return { status: 'success', message: 'Voo criado com sucesso!', data: novoVoo };
        } catch (error) {
            throw new Error(`Erro ao criar voo: ${error.message}`);
        }
    },

    async listarVoos() {
        try {
            const listaDeVoos = await Voo.findAll({
                include: [
                    { model: Aviao, as: 'aviao', attributes: ['modelo', 'num_registro'] },
                    { model: Passageiro, as: 'passageiro', attributes: ['nome'] }
                ],
                order: [['data_hora_partida', 'DESC']]
            });
            return listaDeVoos;
        } catch (error) {
            throw new Error(`Erro ao buscar voos: ${error.message}`);
        }
    },

    async atualizarVoo(id, novosDados) {
        try {
            const [linhasAfetadas] = await Voo.update(novosDados, { where: { id } });
            if (linhasAfetadas === 0) {
                throw new Error("Voo não encontrado para atualização.");
            }
            const vooAtualizado = await Voo.findByPk(id);
            // CORREÇÃO: Retornar o objeto de sucesso que o frontend espera
            return { status: 'success', message: 'Voo atualizado com sucesso.', data: vooAtualizado };
        } catch (error) {
            throw new Error(`Erro ao atualizar voo: ${error.message}`);
        }
    },

    async deletarVoo(id) {
        try {
            const resultado = await Voo.destroy({ where: { id } });
            if (resultado === 0) {
                throw new Error("Voo não encontrado para exclusão.");
            }
            return { status: 'success', message: `Voo ID ${id} foi excluído.` };
        } catch (error) {
            throw new Error(`Erro ao deletar voo: ${error.message}`);
        }
    }
};

module.exports = VooUseCases;