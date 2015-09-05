express = require 'express'
passport = require 'passport'

router = express.Router()

router.post '/login', passport.authenticate 'local',
  successRedirect: '/admin/cc'
  failureRedirect: '/admin'
  failureFlash: 'Invalid username or password!'

module.exports = router

