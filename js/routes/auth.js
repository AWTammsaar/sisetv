var express = require('express');
var passport = require('passport');

var router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/app',
  failureRedirect: '/',
  failureFlash: 'Invalid username or password!'
}));

module.exports = router;

