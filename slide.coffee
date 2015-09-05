_ = require 'lodash'

class Slide
  constructor: (data) ->
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