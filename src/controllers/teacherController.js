const { Teacher, User } = require("../models");

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    res.json(teachers);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener profesores",
      error: err.message,
    });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    if (!teacher)
      return res.status(404).json({ message: "Profesor no encontrado" });

    res.json(teacher);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el profesor",
      error: err.message,
    });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Verifica que el usuario existe y tiene rol "teacher"
    const user = await User.findByPk(user_id);
    if (!user || user.role.toLowerCase() !== "teacher") {
      return res.status(400).json({
        message: "Usuario inválido o no es un profesor",
      });
    }

    const teacher = await Teacher.create({ user_id });
    res.status(201).json({ message: "Profesor creado", teacher });
  } catch (err) {
    res.status(500).json({
      message: "Error al crear el profesor",
      error: err.message,
    });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher)
      return res.status(404).json({ message: "Profesor no encontrado" });

    const { user_id } = req.body;

    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user || user.role.toLowerCase() !== "teacher") {
        return res.status(400).json({
          message: "Usuario inválido o no es un profesor",
        });
      }
    }

    await teacher.update({ user_id });
    res.json({ message: "Profesor actualizado" });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el profesor",
      error: err.message,
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher)
      return res.status(404).json({ message: "Profesor no encontrado" });

    await teacher.destroy();
    res.json({ message: "Profesor eliminado" });
  } catch (err) {
    res.status(500).json({
      message: "Error al eliminar el profesor",
      error: err.message,
    });
  }
};
