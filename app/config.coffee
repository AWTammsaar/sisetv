storage = require 'node-persist'
storage.initSync()
config = storage.getItemSync 'config'

module.exports =
  getConfig: ->
    defaultDelay: 3
    defaultDuration: 0.5
    defaultTransition: "none"
    checkCycles: 2