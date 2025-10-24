require('dotenv').config(); // Lembre de instalar: npm install dotenv

module.exports = {
  // O Sequelize vai usar a DATABASE_URL se ela existir no ambiente da nuvem
  url: process.env.DATABASE_URL, 
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necessário para conexões SSL em muitos serviços de nuvem
    }
  },
  // As configurações abaixo serão usadas apenas se a URL não for encontrada (ambiente local)
  host: 'localhost',
  username: 'postgres',
  password: 'vito',
  database: 'aeroporto',
  define: {
    timestamps: true,
    underscored: true,
  },
};