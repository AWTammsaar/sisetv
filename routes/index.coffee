express = require 'express'
router = express.Router()

router.get '/', (req, res) ->
  if req.user
    res.redirect '/app/cc'
  else
    res.render 'login', error: req.flash 'error'

router.get '/app/:page?', (req, res) ->
  res.render 'index', title: req.page

router.get "/partials/view1", (req, res) ->
  res.render 'partials/partial1', pretty: true

router.get "/partials/view2", (req, res) ->
  res.render 'partials/partial2', pretty: true

router.get "/partials/cc", (req, res) ->
  res.render 'partials/contentcontrol', pretty: true

router.get "/partials/admin", (req, res) ->
  res.render 'partials/admincontrol', pretty: true

module.exports = router
