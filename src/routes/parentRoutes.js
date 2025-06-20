const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// Obtener todos los padres
router.get('/', parentController.getAllParents);

// Obtener un padre por ID
router.get('/:id', parentController.getParentById);

// Crear un nuevo padre
router.post('/', parentController.createParent);

// Actualizar un padre existente
router.put('/:id', parentController.updateParent);

// Eliminar un padre
router.delete('/:id', parentController.deleteParent);

module.exports = router;
