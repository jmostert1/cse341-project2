const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validation = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);
router.post('/', isAuthenticated, validation.saveStudent, studentsController.createStudent);
router.put('/:id', isAuthenticated, validation.saveStudent, studentsController.updateStudent);
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;