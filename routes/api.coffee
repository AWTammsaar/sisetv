express = require 'express'
router = express.Router()
passport = require 'passport'
_ = require 'lodash'
multer = require 'multer'
upload = multer dest: 'temp/'
users = require '../users'
fs = require 'fs'
path = require 'path'
config = require '../config'
Slide = require '../slide'

router.use (req, res, next) ->
  res.respond = (data) ->
    res.json data: data
  res.fail = (msg) ->
    res.json error: msg
    res.statusCode 400
  next()


router.get "/getContent", (req, res) ->
  content = []
  for user in users.getUsers()
    for slide in user.data.slides
      content.push
        url: "content/#{slide.data.name}"
        type: slide.data.type
        duration: slide.data.duration
  res.json content

router.get "/getConfig", (req, res) ->
  res.json config.getConfig()

router.use (req, res, next) ->
  if !req.user
    req.flash "error", "You need to be logged in to perform this action!"
    res.redirect "/admin/index"
  else
    next()

router.get "/getUser", (req, res) ->
  res.respond _.omit req.user, 'password'

router.post '/setSlides', (req, res) ->
  req.user.slides = req.body.slides
  res.respond req.user.slides

router.post '/addSlide', upload.single('file'), (req, res) ->
  if !req.body.data
    return res.fail 'No slide data provided!'
  user = req.user.data.username
  data = req.body.data
  data.fileName = req.file.originalname
  data.filePath = req.file.path
  if req.body.user
    if !req.user.data.admin
      return res.fail 'You need to be an admin to perform this action!'
    user = req.body.user
  users.getUser user, null, (user) ->
    if !user
      return res.respond 'No such user!'
    user.addSlide data
    users.save()
    res.respond user.data.slides

router.post '/deleteSlide', (req, res) ->
  if !req.body.id
    return res.fail 'No slide ID provided!'
  user = req.user.data.username
  if req.body.user
    if !req.user.data.admin
      return res.fail 'You need to be an admin to perform this action!'
    user = req.body.user
  users.getUser user, null, (user) ->
    if !user
      return res.respond 'No such user!'
    user.deleteSlide req.body.id, (err) ->
      if err
        return res.fail err
      users.save()
      res.respond user.data.slides

router.use (req, res, next) ->
  if !req.user.data.admin
    req.flash "error", "You need to be an admin to perform this action!"
    res.redirect "/admin/index"
  else
    next()

router.get '/getUsers', (req, res) ->
  res.respond users.getUsers().map (u) -> _.omit u, 'password'

router.post '/setUsers', (req, res) ->
  users.setUsers(req.body.users)
  res.respond users.getUsers().map (u) -> _.omit u, 'password'

router.post '/addUser', (req, res) ->
  if !req.body.username or !req.body.password
    return res.fail 'Missing username or password!'
  users.createUser req.body, () ->
    res.respond users.getUsers().map (u) -> _.omit u, 'password'

router.post '/deleteUser', (req, res) ->
  if !req.body.id
    return res.fail 'No user ID provided!'
  userList = users.getUsers()
  if req.body.id < 0 or req.body.id >= userList.length
    return res.fail 'Invalid user ID!'
  if userList[req.body.id].data.admin
    return res.fail 'The admin account cannot be deleted!'
  userList.splice req.body.id
  users.save () ->
    res.respond users.getUsers().map (u) -> _.omit u, 'password'

module.exports = router