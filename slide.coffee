_ = require 'lodash'

class Slide
  constructor: (data) ->
    @data = _.assign({
      type: null
      name: null
      duration: 10
      transition: "none"
      transitionTime: 0.3
      hidden: false
    }, data)

  toJSON: ->
    @data.toJSON()

module.exports = Slide