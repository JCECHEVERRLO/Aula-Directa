const { Grade } = require('../models');


module.exports = {
  async index(req, res) {
    const grades = await Grade.findAll();
    res.json(grades);
  },

  async show(req, res) {
    const grade = await Grade.findByPk(req.params.id);
    if (!grade) return res.status(404).json({ error: 'Grado no encontrado' });
    res.json(grade);
  },

  async store(req, res) {
    const { name } = req.body;
    const grade = await Grade.create({ name });
    res.status(201).json(grade);
  },

  async update(req, res) {
    const { name } = req.body;
    const grade = await Grade.findByPk(req.params.id);
    if (!grade) return res.status(404).json({ error: 'Grado no encontrado' });

    grade.name = name;
    await grade.save();
    res.json(grade);
  },

  async destroy(req, res) {
    const grade = await Grade.findByPk(req.params.id);
    if (!grade) return res.status(404).json({ error: 'Grado no encontrado' });

    await grade.destroy();
    res.status(204).send();
  }
};