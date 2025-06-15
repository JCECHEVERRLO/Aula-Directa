const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

router.get('/classes', classController.getAllClasses);
router.get('/classes/:id', classController.getClassById);
router.post('/classes', classController.createClass);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

module.exports = router;
