storage = require 'node-persist'
storage.initSync()
User = require './user'
users = (storage.getItem('users') or []).map (u) -> new User u
chalk = require 'chalk'
bcrypt = require 'bcrypt-nodejs'
_ = require 'lodash'

exp =
  getUser: (username, password, cb) ->
    if !cb and password
      cb = password
      password = null
    return cb null if !users
    for user in users
      return cb user if user.data.username == username and (!password or bcrypt.compareSync password, user.data.password)
    return cb null

  createUser: (options, cb) ->
    options.password = bcrypt.hashSync options.password
    user = new User options

    users.push user
    @save -> cb users

  getUsers: ->
    return users

  setUsers: (u) ->
    users = u

  save: (cb) ->
    storage.setItem 'users', users, cb


chalk.enabled = true
if users.length == 0
  exp.createUser {username: 'admin', password: 'admin', needsReset: true, admin: true, displayName: "Admin"}, () ->
    console.log chalk.yellow "No users found, so I've created a new administrator user:"
    console.log chalk.cyan "\tUsername: admin"
    console.log chalk.cyan "\tPassword: admin"
    console.log chalk.yellow "You will be asked to change your password when you log in for the first time."


module.exports = exp