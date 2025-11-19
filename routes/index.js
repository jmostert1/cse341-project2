const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// GET routes

//router.get('/contacts', controller.getAll);
//router.get('/contacts/:id', controller.getSingle);

// POST routes
//router.post('/contacts', controller.createContact);

// PUT route (update)
//router.put('/contacts/:id', controller.updateContact);

// DELETE route
//router.delete('/contacts/:id', controller.deleteContact);

//login/logout routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.use('/friends', require('./friends'));
router.use('/students', require('./students'));




module.exports = router;