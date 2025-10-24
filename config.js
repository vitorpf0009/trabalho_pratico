const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

let dbConfig = {};  

if (isProduction) {
  dbConfig = {  
    database: 'aeroporto',  
    username: 'postgres',
    password: 'vito',
    host: 'postgres',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: { ssl: { rejectUnauthorized: false } }
  };
  
 
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
      rejectUnauthorized: false,
    }
  })
  
  module.exports = { pool, dbConfig }

} else {
  dbConfig = {  
    user: 'postgres',
    username: 'postgres',  
    host: 'localhost',
    database: 'aeroporto',
    password: 'vito',
    port: 5432,
    dialect: 'postgres', 
    
  }
  
   const pool = new Pool(dbConfig)  
  
  module.exports = { pool, dbConfig } 
}