_ = require 'lodash'

class Slide
  constructor: (data) ->
    if data.duration < 0
      data.duration = 10

    @data = _.defaults({
      type: null
      name: null
      duration: 10
      hidden: false
    }, data)

  toJSON: ->
    @data

module.exports = Slide