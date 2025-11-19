const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

//login/logout routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/github/callback', passport.authenticate('github', { 
  failureRedirect: '/api-docs', 
  session: false
}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

router.use('/friends', require('./friends'));
router.use('/students', require('./students'));




module.exports = router;