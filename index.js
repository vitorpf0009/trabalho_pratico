const express = require('express');
const db = require('./entities');
const rotasAPI = require('./routes/rotas');
const config = require('./config');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3008;
const env = process.env.NODE_ENV || 'development';

// --- INÍCIO DA CORREÇÃO ---

// 1. Defina as URLs que podem acessar sua API
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001', 
    /\.vercel\.app$/,
    '*' // Temporariamente permite todas as origens para debug
];

// 2. Configure o CORS (temporariamente permissivo para debug)
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// --- FIM DA CORREÇÃO ---

// Log para debug
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});


// 2. MIDDLEWARES PRINCIPAIS (APÓS O CORS)
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição


// 3. ROTAS DA API
app.use('/api', rotasAPI); // Todas as rotas estarão sob o prefixo /api


// 4. ROTA DE STATUS
app.get('/', (req, res) => {
    res.send(`API de Voos (${env}) online!`);
});


// 5. SINCRONIZAÇÃO E INICIALIZAÇÃO
// AVISO: { alter: true } pode ser perigoso em produção. 
// Considere usar Migrations (como o Sequelize-CLI) para um controle seguro
// do banco de dados em produção.
db.sequelize.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Ambiente: ${env}`);
            console.log(`Servidor rodando na porta: ${PORT}`);
            console.log("Banco de Dados sincronizado com sucesso (PostgreSQL).");
        });
    })
    .catch(err => {
        console.error('ERRO FATAL: Falha ao sincronizar o banco de dados:', err.message);
        process.exit(1);
    });
