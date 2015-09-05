_ = require 'lodash'
Slide = require './slide'

class User
  constructor: (data) ->
    if data.slides?
      data.slides = data.slides.map (s) -> new Slide s
    @data = _.assign({
      username: null
      password: null
      slides: []
      needsReset: false
      admin: false
    }, data)

  toJSON: ->
    @data

module.exports = User