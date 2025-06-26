const { Qualification, Student, Task, ClassGrade, Class, Grade } = require('../models');

const calificacionesController = {
  // 🧑‍🎓 Calificaciones de estudiantes por padre (vista para padres)
  async getCalificacionesPorPadre(req, res) {
    const { padreId } = req.params;

    try {
      const hijos = await Student.findAll({
        where: { parent_id: padreId },
        attributes: ['id']
      });

      const estudianteIds = hijos.map(e => e.id);

      const calificaciones = await Qualification.findAll({
        where: { student_id: estudianteIds },
        include: {
          model: Task,
          as: 'tarea',
          include: {
            model: ClassGrade,
            as: 'classGrade',
            include: [
              { model: Class, as: 'class' },
              { model: Grade, as: 'grade' }
            ]
          }
        }
      });

      res.json(calificaciones);
    } catch (error) {
      console.error('❌ Error al obtener calificaciones del padre:', error.message);
      res.status(500).json({ message: 'Error al obtener calificaciones' });
    }
  },

  // 📘 Calificaciones por grupo (vista para profesores)
  async getCalificacionesPorGrupo(req, res) {
    const { classGradeId } = req.params;

    try {
      const calificaciones = await Qualification.findAll({
        include: [
          {
            model: Student,
            as: 'estudiante',
            where: { class_grade_id: classGradeId },
            attributes: ['id', 'name']
          },
          {
            model: Task,
            as: 'tarea'
          }
        ]
      });

      res.json(calificaciones);
    } catch (error) {
      console.error('❌ Error al obtener calificaciones por grupo:', error.message);
      res.status(500).json({ message: 'Error al obtener calificaciones del grupo' });
    }
  },

  // 📋 Lista de estudiantes por grupo
  async getEstudiantesPorGrupo(req, res) {
    const { classGradeId } = req.params;

    try {
      const estudiantes = await Student.findAll({
        where: { class_grade_id: classGradeId },
        attributes: ['id', 'name']
      });

      res.json(estudiantes);
    } catch (error) {
      console.error('❌ Error al obtener estudiantes del grupo:', error.message);
      res.status(500).json({ message: 'Error al obtener estudiantes del grupo' });
    }
  },

  // 📝 Guardar una calificación individual
  async guardarCalificacion(req, res) {
    const { student_id, tarea_id, nota, comentario } = req.body;

    if (!student_id || !tarea_id || nota === undefined) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
      const calificacion = await Qualification.create({
        student_id,
        task_id: tarea_id,
        score: nota,
        comment: comentario || ''
      });

      res.status(201).json({ message: 'Calificación guardada', calificacion });
    } catch (error) {
      console.error('❌ Error al guardar calificación:', error.message);
      res.status(500).json({ message: 'Error al guardar calificación' });
    }
  }
};

module.exports = calificacionesController;
