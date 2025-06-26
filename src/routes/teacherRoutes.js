const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticate } = require('../middlewares/auth');

// CRUD estándar
// Funciones docentes (deben ir antes del crud con ":id")
router.get('/mis-grupos', authenticate, teacherController.obtenerGruposDocente);
router.post('/tareas', authenticate, teacherController.crearTarea);
router.get('/grupos/:classGradeId/tareas', authenticate, teacherController.getTareasPorGrupo);

// CRUD estándar
router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.post('/', teacherController.createTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

// ✅ Esta línea es vital
module.exports = router;
