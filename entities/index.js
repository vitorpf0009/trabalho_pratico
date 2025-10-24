// src/entities/index.js (VERSÃO FINAL PARA DEPLOY)

const Sequelize = require('sequelize');

let sequelize;

// Verifica se está no ambiente de produção (Render)
if (process.env.NODE_ENV === 'production') {
    // Conecta usando a DATABASE_URL fornecida pelo Render
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Necessário para a conexão SSL do Render
            }
        }
    });
} else {
    // Mantém a configuração local para desenvolvimento
    const config = require('../config');
    const dbConfig = config.development;
    sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        dbConfig
    );
}

const db = {};

// Carregar os modelos
db.Aviao = require('./Aviao')(sequelize);
db.Passageiro = require('./Passageiro')(sequelize);
db.Voo = require('./Voo')(sequelize);

// Definir as associações (relações de chave estrangeira)
db.Aviao.hasMany(db.Voo, { foreignKey: 'id_aviao', as: 'voos' });
db.Voo.belongsTo(db.Aviao, { foreignKey: 'id_aviao', as: 'aviao' });

db.Passageiro.hasMany(db.Voo, { foreignKey: 'id_passageiro_principal', as: 'voos_reservados' });
db.Voo.belongsTo(db.Passageiro, { foreignKey: 'id_passageiro_principal', as: 'passageiro' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;