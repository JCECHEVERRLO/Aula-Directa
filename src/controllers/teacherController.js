const { Teacher, User, Classgrade, Class, Grade, Task } = require("../models");

// Obtener todos los docentes
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
    res.status(500).json({ message: "Error al obtener profesores", error: err.message });
  }
};

// Obtener docente por ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    if (!teacher) return res.status(404).json({ message: "Profesor no encontrado" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el profesor", error: err.message });
  }
};

// Crear nuevo docente
exports.createTeacher = async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user || user.role.toLowerCase() !== "teacher") {
      return res.status(400).json({ message: "Usuario inválido o no es un profesor" });
    }

    const teacher = await Teacher.create({ user_id });
    res.status(201).json({ message: "Profesor creado", teacher });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el profesor", error: err.message });
  }
};

// Actualizar docente
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Profesor no encontrado" });

    const { user_id } = req.body;

    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user || user.role.toLowerCase() !== "teacher") {
        return res.status(400).json({ message: "Usuario inválido o no es un profesor" });
      }
    }

    await teacher.update({ user_id });
    res.json({ message: "Profesor actualizado" });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el profesor", error: err.message });
  }
};

// Eliminar docente
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Profesor no encontrado" });

    await teacher.destroy();
    res.json({ message: "Profesor eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el profesor", error: err.message });
  }
};

// Listar los grupos asignados al docente logueado
exports.obtenerGruposDocente = async (req, res) => {
  try {
    const docente = await Teacher.findOne({ where: { user_id: req.user.id } });
    if (!docente) return res.status(404).json({ message: "Docente no encontrado" });

    const grupos = await Classgrade.findAll({
      where: { teacher_id: docente.id },
      include: [
        { model: Class, as: "class" },
        { model: Grade, as: "grade" }
      ],
      order: [["id", "ASC"]]
    });

    res.json(grupos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener grupos del docente", error: error.message });
  }
};

// Asignar una nueva tarea a un grupo
exports.crearTarea = async (req, res) => {
  try {
    const { class_grade_id, title, description, due_date } = req.body;

    if (!class_grade_id || !title || !due_date) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const tarea = await Task.create({
      class_grade_id,
      title,
      description,
      due_date
    });

    res.status(201).json({ message: "Tarea asignada", tarea });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar la tarea", error: error.message });
  }
};

// Ver tareas de un grupo
exports.getTareasPorGrupo = async (req, res) => {
  try {
    const { classGradeId } = req.params;

    const tareas = await Task.findAll({
      where: { class_grade_id: classGradeId },
      order: [['due_date', 'ASC']]
    });

    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas del grupo", error: error.message });
  }
};
