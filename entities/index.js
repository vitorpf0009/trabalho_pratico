
const { Sequelize } = require('sequelize');
const config = require('../config');
const dbConfig = config.dbConfig;

const configComLogging = {
    ...dbConfig,  
    logging: false 
};

const sequelize = new Sequelize(
    
 dbConfig.database,
 dbConfig.username, 
 dbConfig.password,
  configComLogging
);


const db = {};

// 1. Carregar os modelos (entidades)
db.Aviao = require('./Aviao')(sequelize);
db.Passageiro = require('./Passageiro')(sequelize);
db.Voo = require('./Voo')(sequelize); 
 

  
db.Aviao.hasMany(db.Voo, {
    foreignKey: 'id_aviao', 
    onDelete: 'RESTRICT', 
    as: 'voos'
});
db.Voo.belongsTo(db.Aviao, {
    foreignKey: 'id_aviao',
    as: 'aviao'
});

// Exemplo: Passageiro e Voo (simplificado)
db.Passageiro.hasMany(db.Voo, {
    foreignKey: 'id_passageiro_principal', 
    onDelete: 'SET NULL', 
    as: 'reservas'
});
db.Voo.belongsTo(db.Passageiro, {
    foreignKey: 'id_passageiro_principal',
    as: 'passageiro'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;