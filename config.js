require('dotenv').config(); 

module.exports = {
  
  url: process.env.DATABASE_URL, 
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  host: 'localhost',
  username: 'postgres',
  password: 'vito',
  database: 'aeroporto',
  define: {
    timestamps: true,
    underscored: true,
  },
};