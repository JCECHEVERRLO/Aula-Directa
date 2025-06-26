const express = require('express');
const router = express.Router();
const classGradeController = require('../controllers/classGradeController');


router.get('/', classGradeController.getAll);
router.get('/:id', classGradeController.getById);
router.post('/', classGradeController.create);
router.put('/:id', classGradeController.update);
router.delete('/:id', classGradeController.delete);

module.exports = router;
