const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 📦 Rutas del sistema
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const parentRoutes = require('./routes/parentRoutes');
const classGradeRoutes = require('./routes/classGradeRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

// 🧠 Funcionalidades clave
const taskRoutes = require('./routes/taskRoutes');
const calificacionesRoutes = require('./routes/calificacionesRoutes');

// 🔁 Rutas API
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/class-grades', classGradeRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/tareas', taskRoutes);
app.use('/api/calificaciones', calificacionesRoutes);

// 🌐 Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando 🚀');
});

// 🎯 Conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos exitosa 🎉'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
