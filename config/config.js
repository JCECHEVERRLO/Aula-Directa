require('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Manizales06', 
    database: process.env.DB_NAME || 'aula_directa',  
    host: process.env.DB_HOST || 'localhost',  
    dialect: 'postgres',  
    port: process.env.DB_PORT || 5432,  
  },
}