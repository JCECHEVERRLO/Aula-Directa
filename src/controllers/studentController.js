const { Student, Grade, Parent } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        { model: Grade, as: 'grade' },
        { model: Parent, as: 'parent' }
      ]
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener estudiantes', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        { model: Grade, as: 'grade' },
        { model: Parent, as: 'parent' }
      ]
    });
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener estudiante', error: err.message });
  }
};

exports.create = async (req, res) => {
  const { name, grade_id, parent_id } = req.body;
  try {
    const newStudent = await Student.create({ name, grade_id, parent_id });
    res.status(201).json({ message: 'Estudiante creado', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear estudiante', error: err.message });
  }
};

exports.update = async (req, res) => {
  const { name, grade_id, parent_id } = req.body;
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });

    await student.update({ name, grade_id, parent_id });
    res.json({ message: 'Estudiante actualizado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar estudiante', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });

    await student.destroy();
    res.json({ message: 'Estudiante eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar estudiante', error: err.message });
  }
};
