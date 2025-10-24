// src/usecases/PassageiroUseCases.js

const db = require('../entities');
const Passageiro = db.Passageiro;

const PassageiroUseCases = {
    async criarPassageiro(dados) {
        try {
            const novo = await Passageiro.create(dados);
            // CORREÇÃO: Retornar o objeto de sucesso que o frontend espera
            return { status: 'success', message: 'Passageiro cadastrado com sucesso!', data: novo };
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                 throw new Error(`O email '${dados.email}' já está em uso.`);
            }
            throw new Error(`Erro ao criar passageiro: ${error.message}`);
        }
    },

    async listarPassageiros() {
        try {
            return await Passageiro.findAll();
        } catch (error) {
            throw new Error(`Erro ao buscar passageiros: ${error.message}`);
        }
    },

    async atualizarPassageiro(id, novosDados) {
        try {
            const [linhasAfetadas] = await Passageiro.update(novosDados, { where: { id } });
            if (linhasAfetadas === 0) {
                throw new Error("Passageiro não encontrado para atualização.");
            }
            const atualizado = await Passageiro.findByPk(id);
            // CORREÇÃO: Retornar o objeto de sucesso que o frontend espera
            return { status: 'success', message: 'Passageiro atualizado com sucesso.', data: atualizado };
        } catch (error) {
            throw new Error(`Erro ao atualizar passageiro: ${error.message}`);
        }
    },

    async deletarPassageiro(id) {
        try {
            const resultado = await Passageiro.destroy({ where: { id } });
            if (resultado === 0) {
                throw new Error("Passageiro não encontrado para exclusão.");
            }
            return { status: 'success', message: `Passageiro ID ${id} foi excluído.` };
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                 throw new Error("Não é possível excluir, pois este passageiro está associado a um voo.");
            }
            throw new Error(`Erro ao deletar passageiro: ${error.message}`);
        }
    }
};

module.exports = PassageiroUseCases;