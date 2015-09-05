_ = require 'lodash'

class Slide
  constructor: (data) ->
    if data.duration < 0
      data.duration = 10
    
    @data = _.assign({
      type: null
      name: null
      duration: 10
      file: {}
      hidden: false
    }, data)

  toJSON: ->
    @data

module.exports = Slide