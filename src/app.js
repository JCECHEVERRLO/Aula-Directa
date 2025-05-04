import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';


dotenv.config();

const app = express();

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando 🚀');
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa 🎉'))
  .catch(err => console.error('Error de conexión a la base de datos:', err));
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
