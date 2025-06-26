const { Classgrade, Class, Grade, Teacher, User } = require('../models');

// Obtener todas las relaciones clase-grado con sus asociaciones
exports.getAll = async (req, res) => {
  try {
    const classGrades = await Classgrade.findAll({
      include: [
        { model: Class, as: 'class', required: false },
        { model: Grade, as: 'grade', required: false },
        {
          model: Teacher,
          as: 'teacher',
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name'],
              required: false
            }
          ]
        }
      ]
    });
    res.json(classGrades);
  } catch (err) {
    console.error('❌ Error en getAll:', err);
    res.status(500).json({ message: 'Error al obtener relaciones clase-grado', error: err.message });
  }
};

// Obtener una relación por ID
exports.getById = async (req, res) => {
  try {
    const classGrade = await Classgrade.findByPk(req.params.id, {
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
    console.error('❌ Error en getById:', err);
    res.status(500).json({ message: 'Error al obtener la relación clase-grado', error: err.message });
  }
};

// Crear una nueva relación clase-grado
exports.create = async (req, res) => {
  const { class_id, grade_id, teacher_id } = req.body;
  try {
    const nuevaRelacion = await Classgrade.create({
      class_id,
      grade_id,
      teacher_id
    });
    res.status(201).json({
      message: 'Relación clase-grado creada',
      classGrade: nuevaRelacion
    });
  } catch (err) {
    console.error('❌ Error en create:', err);
    res.status(500).json({ message: 'Error al crear la relación clase-grado', error: err.message });
  }
};

// Actualizar una relación existente
exports.update = async (req, res) => {
  const { class_id, grade_id, teacher_id } = req.body;
  try {
    const classGrade = await Classgrade.findByPk(req.params.id);
    if (!classGrade) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    await classGrade.update({ class_id, grade_id, teacher_id });
    res.json({ message: 'Relación actualizada correctamente' });
  } catch (err) {
    console.error('❌ Error en update:', err);
    res.status(500).json({ message: 'Error al actualizar la relación clase-grado', error: err.message });
  }
};

// Eliminar una relación clase-grado
exports.delete = async (req, res) => {
  try {
    const classGrade = await Classgrade.findByPk(req.params.id);
    if (!classGrade) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    await classGrade.destroy();
    res.json({ message: 'Relación eliminada correctamente' });
  } catch (err) {
    console.error('❌ Error en delete:', err);
    res.status(500).json({ message: 'Error al eliminar la relación clase-grado', error: err.message });
  }
};
