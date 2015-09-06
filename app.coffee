express = require 'express'
path = require 'path'
favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
passport = require 'passport'
LocalStrategy = require('passport-local').Strategy
storage = require 'node-persist'
flash = require 'connect-flash'
session = require 'express-session'
storage.initSync()


routes = require './routes/index'
apiRoute = require './routes/api'
authRoute = require './routes/auth'
users = require "./users"

app = express()

passport.use new LocalStrategy (username, password, done) ->
  users.getUser username, password, (user) ->
    done null, user || false

passport.serializeUser (user, done) ->
  done null, user.data.username

passport.deserializeUser (user, done) ->
  users.getUser user, (user) ->
    done null, user

# view engine setup
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

# uncomment after placing your favicon in /public
# app.use favicon path.join(__dirname, 'public', 'favicon.ico')
app.use logger 'dev'
app.use bodyParser.json()
app.use bodyParser.urlencoded extended: false
app.use cookieParser()
app.use flash()
app.use session
  saveUninitialized: true,
  resave: true,
  secret: 'keyboard dog'

app.use passport.initialize()
app.use passport.session()
app.use express.static(path.join __dirname, 'public')

app.use '/', routes
app.use '/api', apiRoute
app.use '/auth', authRoute

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error 'Not Found'
  err.status = 404
  next err


# error handlers

# development error handler
# will print stacktrace
if app.get('env') == 'development'
  app.use (err, req, res) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message,
      error: err


# production error handler
# no stacktraces leaked to user
app.use (err, req, res) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message,
    error: {}

module.exports = app
