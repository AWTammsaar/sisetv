express = require 'express'
router = express.Router()
passport = require 'passport'
_ = require 'lodash'
multer = require 'multer'
upload = multer dest: 'temp/'
users = require '../users'
fs = require 'fs'
path = require 'path'
Slide = require '../slide'
uploadDir = path.resolve path.join __dirname, '../uploads', name
fs.mkdir uploadDir
router.use (req, res, next) ->
  if !req.user
    req.flash "error", "You need to be logged in to perform this action!"
    res.redirect "/"
  else
    next()
router.use (req, res, next) ->
  res.respond = (data) ->
    res.json data: data
  res.fail = (msg) ->
    res.json error: msg
    res.statusCode 400
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

router.post '/addSlide', upload.single('file'), (req, res) ->
  if !req.body.data
    return res.fail 'No slide data provided!'
  name = req.file.originalname
  i = 1
  while fs.existsSync uploadDir
    name = req.file.originalname.slice(0,
        req.file.originalname.lastIndexOf('.')) + "_" + i + req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))
  fs.renameSync req.file.path, path.join uploadDir, name
  req.user.slides.push(new Slide req.body.data)
  res.respond req.user.slides

module.exports = router