const { ClassGrade, Class, Grade, Teacher, User } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const classGrades = await ClassGrade.findAll({
      include: [
        { model: Class, as: 'class' },
        { model: Grade, as: 'grade' },
        {
          model: Teacher,
          as: 'teacher',
          include: {
            model: User,
            as: 'user',
            attributes: ['name'] // solo el nombre del profesor
          }
        }
      ]
    });
    res.json(classGrades);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener relaciones clase-grado', error: err.message });
  }
};


exports.getById = async (req, res) => {
  try {
    const classGrade = await ClassGrade.findByPk(req.params.id, {
      include: [
        { model: Class, as: 'class' },
        { model: Grade, as: 'grade' },
        { model: Teacher, as: 'teacher' }
      ]
    });
    if (!classGrade) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }
    res.json(classGrade);
  } catch (err) {
    res.status(500).json({
      message: 'Error al obtener la relación clase-grado',
      error: err.message
    });
  }
};

exports.create = async (req, res) => {
  const { class_id, grade_id, teacher_id } = req.body;
  try {
    const nuevaRelacion = await ClassGrade.create({
      class_id,
      grade_id,
      teacher_id
    });
    res.status(201).json({
      message: 'Relación clase-grado creada',
      classGrade: nuevaRelacion
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error al crear la relación clase-grado',
      error: err.message
    });
  }
};

exports.update = async (req, res) => {
  const { class_id, grade_id, teacher_id } = req.body;
  try {
    const classGrade = await ClassGrade.findByPk(req.params.id);
    if (!classGrade) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    await classGrade.update({ class_id, grade_id, teacher_id });
    res.json({ message: 'Relación actualizada' });
  } catch (err) {
    res.status(500).json({
      message: 'Error al actualizar la relación clase-grado',
      error: err.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const classGrade = await ClassGrade.findByPk(req.params.id);
    if (!classGrade) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    await classGrade.destroy();
    res.json({ message: 'Relación eliminada' });
  } catch (err) {
    res.status(500).json({
      message: 'Error al eliminar la relación clase-grado',
      error: err.message
    });
  }
};
