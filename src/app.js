const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // asegúrate que está exportado con module.exports
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes'); // Importamos las nuevas rutas
const gradeRoutes = require('./routes/gradeRoutes'); // Importamos las rutas de Grado
const studentRoutes = require('./routes/studentRoutes'); // Importamos las rutas de Estudiante
const parentRoutes = require('./routes/parentRoutes'); // Importamos las rutas de Padre

const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando 🚀');
});

// Rutas existentes
app.use('/api/users', userRoutes);

// Nueva ruta para clases
app.use('/api/classes', classRoutes); // Agregamos las rutas del modelo Class

// Nueva ruta para grados
app.use('/api/grades', gradeRoutes); // Agregamos las rutas del modelo Grade

// Nueva ruta para estudiantes
app.use('/api/students', studentRoutes); // Agregamos las rutas del modelo Student

// Nueva ruta para padres
app.use('/api/parents', parentRoutes); // Agregamos las rutas del modelo Parent


// Conexión a la DB
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos exitosa 🎉'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

// Escuchar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
