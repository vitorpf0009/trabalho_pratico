const db = require('../entities');
const { Usuario } = db;

const UsuarioUseCases = {
    async criarUsuario(dados) {
        try {
            // Adiciona senha padrão se não fornecida
            if (!dados.senha) {
                dados.senha = '123456';
            }
            // Converte tipo para formato do banco (A=Admin, U=User)
            if (dados.tipo === 'cliente') {
                dados.tipo = 'U';
            } else if (dados.tipo === 'admin') {
                dados.tipo = 'A';
            }
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

    async atualizarUsuario(email, novosDados) {
        try {
            const [linhasAfetadas] = await Usuario.update(novosDados, { where: { email } });
            if (linhasAfetadas === 0) {
                throw new Error("Usuário não encontrado para atualização.");
            }
            const atualizado = await Usuario.findByPk(email);
            return { status: 'success', message: 'Usuário atualizado com sucesso.', data: atualizado };
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    },

    async deletarUsuario(email) {
        try {
            const resultado = await Usuario.destroy({ where: { email } });
            if (resultado === 0) {
                throw new Error("Usuário não encontrado para exclusão.");
            }
            return { status: 'success', message: `Usuário ${email} foi excluído.` };
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
};

module.exports = UsuarioUseCases;