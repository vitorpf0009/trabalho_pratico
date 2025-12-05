const { autenticaUsuarioDB } = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 300 //expira em 5 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) {
        return response.status(401).json({ 
            auth: false, 
            message: 'Acesso negado. Token de autenticação obrigatório. Faça login em /api/login para obter o token.' 
        });
    }

    // Remove 'Bearer ' se presente
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(cleanToken, process.env.SECRET, function (err, decoded) {
        if (err) {
            return response.status(401).json({ 
                auth: false, 
                message: 'Token inválido ou expirado. Faça login novamente em /api/login.' 
            });
        }
        // Se o token for válido, salva no request para uso posterior
        request.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    login, verificaJWT
}
