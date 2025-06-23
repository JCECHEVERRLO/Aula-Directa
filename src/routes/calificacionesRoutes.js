const express = require('express');
const router = express.Router();
const { Calificacion, Student, Parent, Task, ClassGrade, Class, Grade } = require('../models');

// GET /api/calificaciones/padre/:padreId
router.get('/padre/:padreId', async (req, res) => {
  const { padreId } = req.params;

  try {
    const hijos = await Student.findAll({
      where: { parent_id: padreId },
      attributes: ['id']
    });

    const estudianteIds = hijos.map(e => e.id);

    const calificaciones = await Calificacion.findAll({
      where: { student_id: estudianteIds },
      include: [{
        model: Task,
        include: [{
          model: ClassGrade,
          as: 'classGrade',
          include: [
            { model: Class, as: 'class' },
            { model: Grade, as: 'grade' }
          ]
        }]
      }]
    });

    res.json(calificaciones);
  } catch (error) {
    console.error('❌ Error al obtener calificaciones del padre:', error);
    res.status(500).json({ message: 'Error al obtener calificaciones' });
  }
});

module.exports = router;
