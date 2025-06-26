const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Task, ClassGrade, Class, Grade, Student, Parent } = require('../models');
const { authenticate } = require('../middlewares/auth');

// ✅ RUTA: Grupos asignados al docente logueado
router.get('/grupos-asignados', authenticate, async (req, res) => {
  console.log('📌 Entrando a /grupos-asignados');

  const teacherId = req.user?.id;
  if (!teacherId) {
    console.warn('⚠️ No se encontró ID del docente en req.user');
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    const grupos = await ClassGrade.findAll({
      where: { teacher_id: teacherId },
      include: [
        { model: Class, as: 'class', attributes: ['id', 'name'] },
        { model: Grade, as: 'grade', attributes: ['id', 'name'] }
      ]
    });

    console.log(`✅ Grupos encontrados: ${grupos.length}`);
    res.json(grupos);
  } catch (error) {
    console.error('❌ Error al obtener grupos asignados:', error.message);
    console.error(error);
    res.status(500).json({ message: 'Error al obtener grupos del docente' });
  }
});

// 🧾 RUTA EXISTENTE: Tareas por padre
router.get('/padre/:padreId', async (req, res) => {
  const { padreId } = req.params;

  try {
    const hijos = await Student.findAll({
      where: { parent_id: padreId },
      attributes: ['id']
    });

    const estudianteIds = hijos.map(h => h.id);

    const classGrades = await ClassGrade.findAll({
      include: [{
        model: Student,
        as: 'students',
        where: { id: estudianteIds }
      }]
    });

    const classGradeIds = classGrades.map(cg => cg.id);

    const tareas = await Task.findAll({
      where: { class_grade_id: { [Op.in]: classGradeIds } },
      include: [{
        model: ClassGrade,
        as: 'classGrade',
        include: [
          { model: Class, as: 'class' },
          { model: Grade, as: 'grade' }
        ]
      }]
    });

    res.json(tareas);
  } catch (error) {
    console.error('❌ Error al obtener tareas del padre:', error);
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

module.exports = router;
