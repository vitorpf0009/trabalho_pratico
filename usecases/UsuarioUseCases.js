const db = require('../entities');
const { Usuario } = db;

const UsuarioUseCases = {
    async criarUsuario(dados) {
        try {
            const novo = await Usuario.create(dados);
            return { status: 'success', message: 'Usuário cadastrado com sucesso!', data: novo };
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error(`O email '${dados.email}' já está em uso.`);
            }
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    },

    async listarUsuarios() {
        try {
            return await Usuario.findAll();
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error.message}`);
        }
    },

    async atualizarUsuario(id, novosDados) {
        try {
            const [linhasAfetadas] = await Usuario.update(novosDados, { where: { id } });
            if (linhasAfetadas === 0) {
                throw new Error("Usuário não encontrado para atualização.");
            }
            const atualizado = await Usuario.findByPk(id);
            return { status: 'success', message: 'Usuário atualizado com sucesso.', data: atualizado };
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    },

    async deletarUsuario(id) {
        try {
            const resultado = await Usuario.destroy({ where: { id } });
            if (resultado === 0) {
                throw new Error("Usuário não encontrado para exclusão.");
            }
            return { status: 'success', message: `Usuário ID ${id} foi excluído.` };
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
};

module.exports = UsuarioUseCases;