storage = require 'node-persist'
_ = require 'lodash'
users = storage.getItem 'users'
chalk = require 'chalk'
storage.initSync();
bcrypt = require 'bcrypt-nodejs'

exp =
  getUser: (username, password, cb) ->
    if !cb and password
      cb = password
      password = null
    storage.getItem 'users', ((err, users) ->
      this.users = users
      return cb null if err or !users
      for user in users
        return cb user if user.username == username and (!password or bcrypt.compareSync password, user.password)
      return cb null)
    .bind this

  createUser: (username, password, options, cb) ->
    if _.isFunction options
      options = {}
      cb = options
    user = _.assign
      username: username,
      password: bcrypt.hashSync(password),
      slides: [],
      needsReset: false,
      admin: false, options

    users.push user
    this.save () ->
      cb users

  save: (cb) ->
    storage.setItem 'users', users, cb


chalk.enabled = true
if !users
  users = [];
  exp.createUser 'admin', 'admin', {needsReset: true, admin: true}, () ->
    console.log chalk.magenta "No users found, so I've created a new administrator user:"
    console.log chalk.green "\tUsername: admin"
    console.log chalk.green "\tPassword: admin"
    console.log chalk.magenta "You will be asked to change your password when you log in for the first time."
    os = require 'os'


module.exports = exp