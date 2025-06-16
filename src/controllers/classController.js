const { Class } = require('../models');

const classController = {
  // Obtener todas las clases
  async getAllClasses(req, res) {
    try {
      const classes = await Class.findAll();
      res.json(classes);
    } catch (error) {
      console.error('❌ Error al obtener clases:', error);
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
      console.error('❌ Error al obtener la clase:', error);
      res.status(500).json({ error: 'Error al obtener la clase' });
    }
  },

  // Crear una nueva clase
  async createClass(req, res) {
    try {
      console.log('📌 Datos recibidos en API:', req.body);

      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'El nombre de la clase es obligatorio' });
      }

      const newClass = await Class.create({ name });

      console.log('✅ Clase creada en la base de datos:', newClass);

      res.status(201).json({ message: 'Clase creada correctamente', data: newClass });
    } catch (error) {
      console.error('❌ Error al crear clase:', error);
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

      res.json({ message: 'Clase actualizada', data: classInstance });
    } catch (error) {
      console.error('❌ Error al actualizar la clase:', error);
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
      console.error('❌ Error al eliminar clase:', error);
      res.status(500).json({ error: 'Error al eliminar la clase' });
    }
  }
};

module.exports = classController;
