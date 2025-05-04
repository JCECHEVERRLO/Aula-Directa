const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // asegúrate que está exportado con module.exports
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando 🚀');
});

// Rutas
app.use('/api/users', userRoutes);

// Conexión a la DB
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa 🎉'))
  .catch(err => console.error('Error de conexión a la base de datos:', err));

// Escuchar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
