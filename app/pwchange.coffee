chalk = require 'chalk'
users = require './users'
bcrypt = require 'bcrypt-nodejs'
if process.argv.length <= 2
  console.log chalk.blue 'Use this script to change the admin password:'
  console.log chalk.red '  node pwchange.js [new password]'
  return
newpw = process.argv.slice(2).join(" ")
for user in users.getUsers()
  if user.data.username == 'admin'
    console.log chalk.blue 'Set admin password to ' + chalk.red(newpw)
    user.data.password = bcrypt.hashSync(newpw)
    users.save()
    return
