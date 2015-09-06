express = require 'express'
router = express.Router()
passport = require 'passport'
_ = require 'lodash'
multer = require 'multer'
upload = multer dest: 'temp/'
users = require '../users'
config = require '../config'
Slide = require '../slide'
fs = require 'fs'
bcrypt = require 'bcrypt-nodejs'

randomString = (len, charSet) ->
  charSet = charSet or 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  randomString = ''
  for i in [0..len]
    randomPoz = Math.floor Math.random() * charSet.length
    randomString += charSet.substring randomPoz,randomPoz+1
  return randomString

router.use (req, res, next) ->
  res.respond = (data) ->
    res.json data: data
  res.fail = (msg) ->
    res.json error: msg
    res.status 400
  next()


router.get "/getContent", (req, res) ->
  content = []
  for user in users.getUsers()
    for slide in user.data.slides
      if slide.data.hidden
        continue
      content.push
        url: "content/#{slide.data.name}"
        type: slide.data.type
        duration: slide.data.duration
  res.json content

router.get "/getConfig", (req, res) ->
  res.json config.getConfig()

router.post "/registerUser", (req, res) ->
  if !req.body.registerLink
    req.flash 'error', 'No register link ID!'
    return res.redirect '/login'

  if !req.body.username or !req.body.password
    req.flash 'error', 'No username or password!'
    return res.redirect '/login'

  for u in users.getUsers()
    if !u.data.registered and u.data.registerLink == req.body.registerLink
      u.data.username = req.body.username
      u.data.password = bcrypt.hashSync req.body.password
      u.data.registered = true
      req.login u
      return res.redirect '/admin/index'
  req.flash 'error', 'Invalid register link ID!'
  res.redirect '/login'

router.use (req, res, next) ->
  if !req.user
    req.flash "error", "You need to be logged in to perform this action!"
    res.redirect "/admin/index"
  else
    next()

router.get "/getUser", (req, res) ->
  res.respond req.user

router.post '/setSlides', (req, res) ->
  req.user.slides = req.body.slides
  res.respond req.user.slides

router.post '/addSlide', upload.single('file'), (req, res) ->
  if !req.body.duration
    fs.unlink req.file.path
    req.flash 'error', 'No duration provided!'
    return res.redirect '/admin'
  if !req.file
    req.flash 'error', 'No file uploaded!'
    return res.redirect '/admin'
  user = req.user.data.username
  data =
    duration: parseInt req.body.duration
  data.fileName = req.file.originalname
  data.filePath = req.file.path
  if req.body.user
    if !req.user.data.admin
      fs.unlink req.file.path
      req.flash 'error', 'You need to be an admin to perform this action!'
      return res.redirect '/admin'
    user = req.body.user
  users.getUser user, null, (user) ->
    if !user
      fs.unlink req.file.path
      req.flash 'error', 'Could not find user!'
      return res.redirect '/admin'
    if user.data.slides.length >= user.data.maxSlides
      req.flash 'error', 'Slide limit reached!'
      return res.redirect '/admin'
    user.addSlide data, (err) ->
      if err
        req.flash 'error', err
        fs.unlink req.file.path
      if user == req.user
        res.redirect '/admin/cc'
      else
        res.redirect '/admin/admin'
      users.save()

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


###
  ADMIN ONLY
###
router.use (req, res, next) ->
  if !req.user.data.admin
    req.flash "error", "You need to be an admin to perform this action!"
    res.redirect "/admin/index"
  else
    next()

router.get '/createRegisterLink', (req, res) ->
  if !req.body.displayName
    res.fail 'No display name given!'

  code = randomString(30)
  users.createUser { displayName: req.body.displayName, registerLink: code },
    user ->
      res.respond users.getUsers()


router.get '/getUsers', (req, res) ->
  res.respond users.getUsers()

router.post '/setUsers', (req, res) ->
  users.setUsers(req.body.users.map (u) -> new User u)
  res.respond users.getUsers()

router.post '/addUser', (req, res) ->
  if !req.body.username or !req.body.password
    return res.fail 'Missing username or password!'
  users.createUser req.body, () ->
    res.respond users.getUsers()

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
    res.respond users.getUsers()

module.exports = router