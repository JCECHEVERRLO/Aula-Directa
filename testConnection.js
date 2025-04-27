const { Sequelize } = require('sequelize');

// Configura la conexión
const sequelize = new Sequelize('aula_directa', 'postgres', 'Manizales06', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();