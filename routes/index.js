const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// GET routes
router.get('/', (req, res) => {
  res.send('Welcome to the REST API');
});
router.get('/contacts', controller.getAll);
router.get('/contacts/:id', controller.getSingle);

// POST routes
router.post('/contacts', controller.createContact);

// PUT route (update)
router.put('/contacts/:id', controller.updateContact);

// DELETE route
router.delete('/contacts/:id', controller.deleteContact);

module.exports = router;