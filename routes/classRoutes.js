const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

router.get('/', classController.getAllClasses);  // ✅ Ajustado para que coincida con la ruta en `app.js`
router.get('/:id', classController.getClassById);
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
