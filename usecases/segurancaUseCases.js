const db = require('../entities');
const { Usuario } = db;

const autenticaUsuarioDB = async (body) => {
    try {           
        const { email, senha } = body
        const usuario = await Usuario.findOne({ where: { email, senha } });
        
        if (!usuario) {
            throw "Usuário ou senha inválidos";
        }
        
        return usuario;
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticaUsuarioDB
}