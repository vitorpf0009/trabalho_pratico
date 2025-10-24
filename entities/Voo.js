const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Voo = sequelize.define('Voo', {
  
        codigo_voo: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        origem: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        destino: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        data_hora_partida: {
            type: DataTypes.DATE,
            allowNull: false,
        },
     
    }, {
        tableName: 'voo',
        timestamps: false
    });

    return Voo;
};