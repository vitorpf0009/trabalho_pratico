// index.js (Backend Corrigido para CORS)

const express = require('express');
const db = require('./entities');
const rotasAPI = require('./routes/rotas');
const config = require('./config');
const cors = require('cors'); // Importado

const app = express();
const PORT = process.env.PORT || 3008;
const env = process.env.NODE_ENV || 'development';


// Use a porta em que seu frontend está rodando (ex: 3000, 3001, etc.)
app.use(cors({
    // Permite que o frontend acesse. Ajuste a porta se o seu frontend estiver em 3001.
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


// 2. MIDDLEWARES PRINCIPAIS (APÓS O CORS)
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição


// 3. ROTAS DA API
app.use('/api', rotasAPI); // Todas as rotas estarão sob o prefixo /api


// 4. ROTA DE STATUS
app.get('/', (req, res) => {
    res.send(`API de Voos (${env}) online!`);
});


// 5. SINCRONIZAÇÃO E INICIALIZAÇÃO
db.sequelize.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Ambiente: ${env}`);
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log("Banco de Dados sincronizado com sucesso (PostgreSQL).");
        });
    })
    .catch(err => {
        console.error('ERRO FATAL: Falha ao sincronizar o banco de dados:', err.message);
        process.exit(1);
    });