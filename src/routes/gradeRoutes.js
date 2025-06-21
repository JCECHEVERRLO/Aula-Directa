const express = require('express');
const gradeController = require('../controllers/gradeController');

const router = express.Router();

router.get('/', gradeController.index);
router.get('/:id', gradeController.show);
router.post('/', gradeController.store);
router.put('/:id', gradeController.update);
router.delete('/:id', gradeController.destroy);

module.exports = router;