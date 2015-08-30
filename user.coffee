_ = require 'lodash'

class User
  constructor: (data) ->
    @data = _.assign({
      username: null,
      password: null,
      slides: [],
      needsReset: false,
      admin: false
    }, data)

  toJSON: ->
    @data.toJSON

module.exports = User