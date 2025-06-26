const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { Qualification, Student, Task, ClassGrade, Class, Grade } = require('../models');

// 📘 GET: Calificaciones por grupo (filtra por classGradeId a través de la tarea)
router.get('/grupos/:classGradeId', authenticate, async (req, res) => {
  const { classGradeId } = req.params;

  try {
    const calificaciones = await Qualification.findAll({
      include: [
        {
          model: Student,
          as: 'estudiante',
          attributes: ['id', 'name']
        },
        {
          model: Task,
          as: 'tarea',
          where: { class_grade_id: classGradeId }
        }
      ]
    });

    res.json(calificaciones);
  } catch (error) {
    console.error('❌ Error al obtener calificaciones por grupo:', error.message);
    console.error(error);
    res.status(500).json({ message: 'Error al obtener calificaciones del grupo' });
  }
});

// 📘 GET: Estudiantes del grupo (usando el grado asociado al grupo)
router.get('/grupos/:classGradeId/estudiantes', authenticate, async (req, res) => {
  const { classGradeId } = req.params;

  try {
    const classGrade = await ClassGrade.findByPk(classGradeId);

    if (!classGrade) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    // Se asume que estudiantes están relacionados al grado
    const estudiantes = await Student.findAll({
      where: { grade_id: classGrade.grade_id },
      attributes: ['id', 'name']
    });

    console.log(`👥 Estudiantes encontrados para grade ${classGrade.grade_id}: ${estudiantes.length}`);
    res.json(estudiantes);
  } catch (error) {
    console.error('❌ Error al obtener estudiantes del grupo:', error.message);
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estudiantes del grupo' });
  }
});

// 📝 POST: Registrar calificación individual
router.post('/notas', authenticate, async (req, res) => {
  const { student_id, tarea_id, nota, comentario } = req.body;

  if (!student_id || !tarea_id || nota === undefined) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const nueva = await Qualification.create({
      student_id,
      task_id: tarea_id,
      score: nota,
      comment: comentario || ''
    });

    res.status(201).json({ message: 'Calificación guardada', calificacion: nueva });
  } catch (error) {
    console.error('❌ Error al guardar calificación:', error.message);
    res.status(500).json({ message: 'Error al guardar calificación' });
  }
});

// 📥 POST: Registrar calificaciones por lote
router.post('/notas-lote', authenticate, async (req, res) => {
  const { calificaciones } = req.body;

  if (!Array.isArray(calificaciones) || calificaciones.length === 0) {
    return res.status(400).json({ message: 'No se enviaron calificaciones' });
  }

  try {
    const registros = calificaciones.map(c => ({
      student_id: c.student_id,
      task_id: c.tarea_id || null,
      score: c.nota,
      comment: c.comentario || ''
    }));

    await Qualification.bulkCreate(registros);
    res.status(201).json({ message: 'Calificaciones registradas correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar calificaciones en lote:', error.message);
    res.status(500).json({ message: 'Error al guardar calificaciones en lote' });
  }
});

// 👨‍👧 GET: Calificaciones por padre (basado en sus hijos)
router.get('/padre/:padreId', async (req, res) => {
  const { padreId } = req.params;

  try {
    const hijos = await Student.findAll({
      where: { parent_id: padreId },
      attributes: ['id']
    });

    const estudianteIds = hijos.map(e => e.id);

    const calificaciones = await Qualification.findAll({
      where: { student_id: estudianteIds },
      include: [{
        model: Task,
        as: 'tarea',
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
    console.error('❌ Error al obtener calificaciones del padre:', error.message);
    res.status(500).json({ message: 'Error al obtener calificaciones' });
  }
});

module.exports = router;
