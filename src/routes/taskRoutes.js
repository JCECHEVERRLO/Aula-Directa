const express = require('express');
const router = express.Router();
const { Task, ClassGrade, Class, Grade, Student, Parent } = require('../models');

// GET /api/tareas/padre/:padreId
router.get('/padre/:padreId', async (req, res) => {
  const { padreId } = req.params;

  try {
    // Traer los estudiantes hijos de este padre
    const hijos = await Student.findAll({
      where: { parent_id: padreId },
      attributes: ['id']
    });

    const estudianteIds = hijos.map(h => h.id);

    // Traer las classGrades de esos estudiantes (evitamos duplicados si están en el mismo grado)
    const classGrades = await ClassGrade.findAll({
      include: [{
        model: Student,
        as: 'students',
        where: { id: estudianteIds }
      }]
    });

    const classGradeIds = classGrades.map(cg => cg.id);

    // Traer las tareas relacionadas
    const tareas = await Task.findAll({
      where: { class_grade_id: classGradeIds },
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
