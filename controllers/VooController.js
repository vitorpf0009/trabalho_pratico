 
const db = require('../entities');

 // POST /voos
exports.create = async (req, res) => {
  try {
    const novoVoo = await db.Voo.create(req.body);
    res.status(201).json(novoVoo);
  } catch (err) {
    console.error('Erro ao criar voo:', err);
    res.status(500).json({ error: 'Erro ao criar voo', detalhes: err.message });
  }
};

    // GET /voos
exports.findAll = async (req, res) => {
  try {
    const voos = await db.Voo.findAll({
      include: [
        { model: db.Aviao, as: 'aviao' },
        { model: db.Passageiro, as: 'passageiro' }
      ]
    });
    res.json(voos);
  } catch (err) {
    console.error('Erro ao buscar voos:', err);
    res.status(500).json({ error: 'Erro ao buscar voos', detalhes: err.message });
  }
};

 // GET /voos/:id
exports.findOne = async (req, res) => {
  try {
    const voo = await db.Voo.findByPk(req.params.id, {
      include: [
        { model: db.Aviao, as: 'aviao' },
        { model: db.Passageiro, as: 'passageiro' }
      ]
    });
    if (!voo) return res.status(404).json({ error: 'Voo não encontrado' });
    res.json(voo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar voo', detalhes: err.message });
  }
};

   // PUT /Voos/:id
exports.update = async (req, res) => {
  try {
    const [linhasAfetadas] = await db.Voo.update(req.body, {
      where: { id: req.params.id }
    });
    if (!linhasAfetadas) return res.status(404).json({ error: 'Voo não encontrado' });
    const vooAtualizado = await db.Voo.findByPk(req.params.id);
    res.json(vooAtualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar voo', detalhes: err.message });
  }
};

  // DELETE /Voos/:id
exports.delete = async (req, res) => {
  try {
    const linhasAfetadas = await db.Voo.destroy({
      where: { id: req.params.id }
    });
    if (!linhasAfetadas) return res.status(404).json({ error: 'Voo não encontrado' });
    res.json({ message: 'Voo excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir voo', detalhes: err.message });
  }
};
