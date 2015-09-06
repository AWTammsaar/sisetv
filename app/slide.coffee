_ = require 'lodash'
defaults = _.partialRight _.assign, (value, other) ->
  if not _.isUndefined(value) then other else undefined

class Slide
  constructor: (data) ->
    if data.duration < 0
      data.duration = 10

    @data = defaults({
      type: null
      name: null
      duration: 10
      hidden: false
    }, data)

  toJSON: ->
    @data

module.exports = Slide