const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        email: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        tipo: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            defaultValue: 'U',
            validate: {
                isIn: [['A', 'U']]
            }
        },
        telefone: {
            type: DataTypes.STRING(14),
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    return Usuario;
}; 