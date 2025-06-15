const { Class } = require('../models');

const classController = {
  // Obtener todas las clases
  async getAllClasses(req, res) {
    try {
      const classes = await Class.findAll();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener clases' });
    }
  },

  // Obtener una clase por ID
  async getClassById(req, res) {
    try {
      const classInstance = await Class.findByPk(req.params.id);
      if (!classInstance) return res.status(404).json({ error: 'Clase no encontrada' });
      res.json(classInstance);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la clase' });
    }
  },

  // Crear una nueva clase
  async createClass(req, res) {
    try {
      const { name } = req.body;
      const newClass = await Class.create({ name });
      res.status(201).json(newClass);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la clase' });
    }
  },

  // Actualizar una clase
  async updateClass(req, res) {
    try {
      const { name } = req.body;
      const classInstance = await Class.findByPk(req.params.id);
      if (!classInstance) return res.status(404).json({ error: 'Clase no encontrada' });

      classInstance.name = name;
      await classInstance.save();
      res.json(classInstance);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la clase' });
    }
  },

  // Eliminar una clase
  async deleteClass(req, res) {
    try {
      const classInstance = await Class.findByPk(req.params.id);
      if (!classInstance) return res.status(404).json({ error: 'Clase no encontrada' });

      await classInstance.destroy();
      res.json({ message: 'Clase eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la clase' });
    }
  }
};

module.exports = classController;
