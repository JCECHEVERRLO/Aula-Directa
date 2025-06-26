const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const { authenticate } = require('../middlewares/auth');

// Obtener todos los padres
router.get('/', authenticate, parentController.getAllParents);

// Obtener un padre por ID
router.get('/:id', authenticate, parentController.getParentById);

// Crear un nuevo padre
router.post('/', authenticate, parentController.createParent);

// Actualizar un padre existente
router.put('/:id', authenticate, parentController.updateParent);

// Eliminar un padre
router.delete('/:id', authenticate, parentController.deleteParent);

// ✅ NUEVA RUTA: Obtener las tareas de los hijos del acudiente
router.get('/:parentId/tareas', authenticate, parentController.getTareasDeHijos);

module.exports = router;
// ✅ Esta línea es vital