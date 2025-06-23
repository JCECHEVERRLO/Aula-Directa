const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const parentRoutes = require('./routes/parentRoutes');
const classGradeRoutes = require('./routes/classGradeRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

// 👇 Nuevas rutas añadidas
const taskRoutes = require('./routes/taskRoutes');
const calificacionesRoutes = require('./routes/calificacionesRoutes');

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
app.use('/api/classes', classRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/class-grades', classGradeRoutes);
app.use('/api/teachers', teacherRoutes);

// 👇 Rutas nuevas activadas
app.use('/api/tareas', taskRoutes);
app.use('/api/calificaciones', calificacionesRoutes);

// Conexión a la DB
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos exitosa 🎉'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

// Escuchar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
