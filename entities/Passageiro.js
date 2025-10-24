const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Passageiro = sequelize.define('Passageiro', {
        
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,  
        },
    }, {
        tableName: 'passageiro',
        timestamps: false
    });

    return Passageiro;
};