const { Task, ClassGrade, Class, Grade, Student } = require('../../Aula-Directa/src/models');

const taskController = {
  async getTareasPorPadre(req, res) {
    const { padreId } = req.params;

    try {
      const hijos = await Student.findAll({ where: { parent_id: padreId } });
      const estudianteIds = hijos.map(hijo => hijo.id);

      const classGrades = await ClassGrade.findAll({
        include: {
          model: Student,
          as: 'students',
          where: { id: estudianteIds }
        }
      });

      const classGradeIds = classGrades.map(cg => cg.id);

      const tareas = await Task.findAll({
        where: { class_grade_id: classGradeIds },
        include: {
          model: ClassGrade,
          as: 'classGrade',
          include: [
            { model: Class, as: 'class' },
            { model: Grade, as: 'grade' }
          ]
        }
      });

      res.json(tareas);
    } catch (error) {
      console.error('❌ Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error al obtener tareas' });
    }
  }
};

module.exports = taskController;
