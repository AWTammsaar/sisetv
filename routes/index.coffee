express = require 'express'
router = express.Router()

router.get '/admin', (req, res) ->
  if req.user
    res.redirect '/admin/cc'
  else
    res.render 'login', error: req.flash 'error'

router.get '/admin/:page?', (req, res) ->
  res.render 'index', error: req.flash 'error'

router.get "/partials/cc", (req, res) ->
  res.render 'partials/contentcontrol', error: req.flash 'error'

router.get "/partials/admin", (req, res) ->
  res.render 'partials/admincontrol', error: req.flash 'error'

module.exports = router
