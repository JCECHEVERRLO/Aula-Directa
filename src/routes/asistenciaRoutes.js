const express = require('express');
const router = express.Router();
const { Attendance } = require('../models');
const { authenticate } = require('../middlewares/auth');

router.post('/lote', authenticate, async (req, res) => {
  const lista = req.body;

  if (!Array.isArray(lista) || lista.length === 0) {
    return res.status(400).json({ message: 'No se recibió ninguna asistencia' });
  }

  try {
    await Attendance.bulkCreate(lista);
    res.status(201).json({ message: 'Asistencia guardada correctamente' });
  } catch (err) {
    console.error('❌ Error al guardar asistencia:', err.message);
    res.status(500).json({ message: 'Error al guardar asistencia' });
  }
});

module.exports = router;
