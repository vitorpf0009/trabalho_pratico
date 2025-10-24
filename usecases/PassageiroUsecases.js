const db = require('../entities');
const Passageiro = db.Passageiro;

const PassageiroUseCases = {
    criarPassageiro: async (dados) => {
        const novo = await Passageiro.create(dados);
        return { status: 'success', message: 'Passageiro cadastrado com sucesso!', data: novo };
    },
    listarPassageiros: async () => {
        return await Passageiro.findAll();
    },
    atualizarPassageiro: async (id, novosDados) => {
        const [linhasAfetadas] = await Passageiro.update(novosDados, { where: { id } });
        if (linhasAfetadas === 0) throw new Error("Passageiro não encontrado.");
        const atualizado = await Passageiro.findByPk(id);
        return { status: 'success', message: 'Passageiro atualizado com sucesso.', data: atualizado };
    },
    deletarPassageiro: async (id) => {
        const resultado = await Passageiro.destroy({ where: { id } });
        if (resultado === 0) throw new Error("Passageiro não encontrado.");
        return { status: 'success', message: `Passageiro ID ${id} excluído.` };
    }
};
module.exports = PassageiroUseCases;