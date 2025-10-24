const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Aviao = sequelize.define('Aviao', {
       
        modelo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        capacidade_assentos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        num_registro: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'aviao',  
        timestamps: false
    });

    return Aviao;
};