express = require 'express'
router = express.Router()
passport = require 'passport'
_ = require 'lodash'
users = require '../users'

router.use (req, res, next) ->
  if !req.user
    req.flash "error", "You need to be logged in to perform this action!"
    res.redirect "/"
  else
    next()
router.use (req, res, next) ->
  res.respond = (data) ->
    res.json data: data
  next()

router.get "/getUser", (req, res) ->
  res.respond _.omit req.user, 'password'

router.post '/setSlides', (req, res) ->
  req.user.slides = req.body.slides
  res.respond req.user.slides

router.use (req, res, next) ->
  if !req.user.admin
    req.flash "error", "You need to be an admin to perform this action!"
    res.redirect "/app/index"
  else
    next()

router.get '/getUsers', (req, res) ->
  res.respond users.getUsers().map (u) -> _.omit u, 'password'

router.post '/setUsers', (req, res) ->
  users.setUsers(req.body.users)
  res.respond users.getUsers().map (u) -> _.omit u, 'password'

module.exports = router