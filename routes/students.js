const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validation = require('../middleware/middleware');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);
router.post('/', validation.saveStudent, studentsController.createStudent);
router.put('/:id', validation.saveStudent, studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;