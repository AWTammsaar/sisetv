express = require 'express'
router = express.Router()
bcrypt = require 'bcrypt-nodejs'
users = require '../users'


router.post '/api/resetPassword', (req, res) ->
  if !req.user.data.needsReset
    return res.redirect '/admin/index'

  if !req.body.oldpassword or !req.body.newpassword
    req.flash 'error', 'Please provide both the old and new passwords!'
    return res.redirect '/resetPassword'

  if !bcrypt.compareSync req.body.oldpassword, req.user.data.password
    req.flash 'error', 'Old password does not match!'
    return res.redirect '/resetPassword'

  if req.body.oldpassword == req.body.newpassword
    req.flash 'error', 'New password must be different from the old password'
    return res.redirect '/resetPassword'

  if req.body.newpassword.length < 6
    req.flash 'error', 'New password must be at least 6 characters long!'
    return res.redirect '/resetPassword'

  req.user.data.password = bcrypt.hashSync(req.body.newpassword)
  req.user.data.needsReset = false
  users.save ->
    res.redirect '/admin/index'

router.get '/resetPassword', (req, res) ->
  if !req.user or !req.user.data.needsReset
    return res.redirect "/"
  res.render 'resetpassword',
    error: req.flash 'error'
    user: req.user.data.username

router.use (req, res, next) ->
  if req.user and req.user.data.needsReset
    res.redirect '/resetPassword'
  else
    next()

router.get '/logout', (req, res) ->
  req.logout()
  res.redirect '/login'

router.get '/admin', (req, res) ->
  if req.user
    res.redirect '/admin/cc'
  else
    res.render 'login', error: req.flash 'error'

router.get '/admin/:page?', (req, res) ->
  if !req.user
    res.redirect '/admin'
  res.render 'index', error: req.flash 'error'

router.get "/partials/cc", (req, res) ->
  res.render 'partials/contentcontrol', error: req.flash 'error'

router.get "/partials/admin", (req, res) ->
  res.render 'partials/admincontrol', error: req.flash 'error'

module.exports = router
