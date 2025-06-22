const { Parent, User } = require("../models");

exports.getAllParents = async (req, res) => {
  try {
    // controllers/parentController.js
    const parents = await Parent.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    res.json(parents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener acudientes", error: err.message });
  }
};

exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });
    if (!parent)
      return res.status(404).json({ message: "Acudiente no encontrado" });
    res.json(parent);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el acudiente", error: err.message });
  }
};

exports.createParent = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Verifica que el usuario existe y tenga rol parent
    const user = await User.findByPk(user_id);
    if (!user || user.role.toLowerCase() !== "parent") {
      return res
        .status(400)
        .json({ message: "Usuario inválido o no es acudiente" });
    }

    const parent = await Parent.create({ user_id });
    res.status(201).json({ message: "Acudiente creado", parent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el acudiente", error: err.message });
  }
};

exports.updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id);
    if (!parent)
      return res.status(404).json({ message: "Acudiente no encontrado" });

    const { user_id } = req.body;
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user || user.role.toLowerCase() !== "parent") {
        return res
          .status(400)
          .json({ message: "Usuario inválido o no es acudiente" });
      }
    }

    await parent.update({ user_id });
    res.json({ message: "Acudiente actualizado" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el acudiente",
        error: err.message,
      });
  }
};

exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id);
    if (!parent)
      return res.status(404).json({ message: "Acudiente no encontrado" });

    await parent.destroy();
    res.json({ message: "Acudiente eliminado" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el acudiente", error: err.message });
  }
};
