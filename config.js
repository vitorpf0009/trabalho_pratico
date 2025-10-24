// config.js

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

module.exports = {
  // Bloco de configuração para o ambiente de Desenvolvimento
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'aeroporto', // Verifique se o nome do seu banco é este
    username: 'postgres',      // SUBSTITUA PELO SEU USUÁRIO
    password: 'vito', // SUBSTITUA PELA SUA SENHA
    logging: false,
  },

  // Bloco de configuração para o ambiente de Produção
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL, 
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  },
};