// src/usecases/VooUseCases.js

const db = require('../entities');
const Voo = db.Voo;
const Aviao = db.Aviao;         // Importamos Aviao para o join
const Passageiro = db.Passageiro; // Importamos Passageiro para o join

const VooUseCases = {

    async criarVoo(dados) {
        try {
            const novoVoo = await Voo.create(dados);
            return { status: 'success', message: 'Voo criado com sucesso!', data: novoVoo };
        } catch (error) {
            throw new Error(`Erro ao criar voo: ${error.message}`);
        }
    },

    async listarVoos() {
        try {
            // A parte mais importante: `include` faz o JOIN com as tabelas associadas
            const listaDeVoos = await Voo.findAll({
                include: [
                    {
                        model: Aviao, 
                        as: 'aviao', // 'as' deve corresponder ao alias definido na associação em entities/index.js
                        attributes: ['modelo', 'num_registro'] // Traz apenas os campos necessários
                    },
                    {
                        model: Passageiro, 
                        as: 'passageiro',
                        attributes: ['nome']
                    }
                ],
                order: [['data_hora_partida', 'DESC']] // Ordena os voos do mais recente para o mais antigo
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
            return { status: 'success', message: `Voo ID ${id} excluído com sucesso.` };
        } catch (error) {
            throw new Error(`Erro ao deletar voo: ${error.message}`);
        }
    }
};

module.exports = VooUseCases;