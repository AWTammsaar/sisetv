var express = require('express');
var router = express.Router();
var passport = require('passport');
var _ = require('lodash');

router.use(function (req, res, next) {
  if (!req.user) {
    req.flash("error", "You need to be logged in to perform this action!");
    res.redirect("/");
  } else {
    next();
  }
});

router.get("/getUser", function (req, res) {
  res.json(_.omit(req.user, 'password'));
});


router.use(function (req, res, next) {
  if (!req.user.admin) {
    req.flash("error", "You need to be an admin to perform this action!");
    res.redirect("/app/index");
  } else {
    next();
  }
});

module.exports = router;