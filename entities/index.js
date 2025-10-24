// src/entities/index.js (BACKEND - CÓDIGO COMPLETO E CORRIGIDO)

const Sequelize = require('sequelize');
const config = require('../config'); // <-- CORREÇÃO APLICADA AQUI
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};

// 1. CARREGAR OS MODELOS
db.Aviao = require('./Aviao')(sequelize);
db.Passageiro = require('./Passageiro')(sequelize);
db.Voo = require('./Voo')(sequelize); 

// 2. SEÇÃO DE ASSOCIAÇÕES
db.Aviao.hasMany(db.Voo, {
    foreignKey: 'id_aviao', 
    onDelete: 'RESTRICT', 
    as: 'voos'
});
db.Voo.belongsTo(db.Aviao, {
    foreignKey: 'id_aviao',
    as: 'aviao'
});

db.Passageiro.hasMany(db.Voo, {
    foreignKey: 'id_passageiro_principal', 
    onDelete: 'SET NULL', 
    as: 'voos_reservados'
});
db.Voo.belongsTo(db.Passageiro, {
    foreignKey: 'id_passageiro_principal',
    as: 'passageiro'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;