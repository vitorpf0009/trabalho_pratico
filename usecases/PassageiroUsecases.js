 
const db = require('../entities'); 
const Passageiro = db.Passageiro;

const PassageiroUseCases = {

    async criarPassageiro(dadosPassageiro) {
        try {
            const novoPassageiro = await Passageiro.create(dadosPassageiro);
            return novoPassageiro;
        } catch (error) {
            // Lógica para tratar erro de e-mail duplicado
            if (error.name === 'SequelizeUniqueConstraintError' && dadosPassageiro.email) {
                 throw new Error(`O e-mail '${dadosPassageiro.email}' já está cadastrado.`);
            }
            throw new Error(`Erro ao criar passageiro: ${error.message}`);
        }
    },

    async listarPassageiros() {
        try {
            const passageiros = await Passageiro.findAll();
            return passageiros;
        } catch (error) {
            throw new Error(`Erro ao buscar passageiros: ${error.message}`);
        }
    },

    async buscarPassageiroPorId(id) {
        try {
            const passageiro = await Passageiro.findByPk(id);
            if (!passageiro) {
                throw new Error("Passageiro não encontrado.");
            }
            return passageiro;
        } catch (error) {
            throw new Error(`Erro ao buscar passageiro por ID: ${error.message}`);
        }
    },

    async atualizarPassageiro(id, novosDados) {
        try {
            const [linhasAfetadas] = await Passageiro.update(novosDados, {
                where: { id: id }
            });

            if (linhasAfetadas === 0) {
                throw new Error("Passageiro não encontrado para atualização.");
            }
            // Retorna o passageiro atualizado
            return this.buscarPassageiroPorId(id);

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' && novosDados.email) {
                 throw new Error(`O e-mail '${novosDados.email}' já está cadastrado.`);
            }
            throw new Error(`Erro ao atualizar passageiro: ${error.message}`);
        }
    },

    async deletarPassageiro(id) {
        try {
            const resultado = await Passageiro.destroy({
                where: { id: id }
            });

            if (resultado === 0) {
                throw new Error("Passageiro não encontrado para exclusão.");
            }
            return { message: `Passageiro ID ${id} excluído com sucesso.` };

        } catch (error) {
            // Adicionar tratamento para restrição de chave estrangeira (se houver Voos/Passagens)
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                 throw new Error("Não é possível excluir o passageiro, pois há reservas ou voos associados a ele.");
            }
            throw new Error(`Erro ao deletar passageiro: ${error.message}`);
        }
    }
};

module.exports = PassageiroUseCases;