var storage = require('node-persist');
var _ = require('lodash');
var users = storage.getItem('users');
var chalk = require('chalk');
storage.initSync();
var bcrypt = require('bcrypt-nodejs');
var exp = {
  getUser: function (username, password, cb) {
    if (!cb && password) {
      cb = password;
      password = null;
    }
    storage.getItem('users', function (err, users) {
      this.users = users;
      if (err || !users) return cb(null);
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.username === username && (!password || bcrypt.compareSync(password, user.password))) return cb(user);
      }
      return cb(null);
    }.bind(this));
  },
  createUser: function (username, password, options, cb) {
    if (_.isFunction(options)) {
      options = {};
      cb = options;
    }
    var user = _.assign({
      username: username,
      password: bcrypt.hashSync(password),
      slides: [],
      needsReset: false,
      admin: false
    }, options);
    users.push(user);
    this.save(function () {
      cb(users);
    });
  },
  save: function (cb) {
    storage.setItem('users', users, cb);
  }
};
chalk.enabled = true;
if (!users) {
  users = [];
  exp.createUser('admin', 'admin', {needsReset: true, admin: true}, function (user) {
    console.log(chalk.magenta("No users found, so I've created a new administrator user:"));
    console.log(chalk.blue("\tUsername: admin"));
    console.log(chalk.blue("\tPassword: admin"));
    console.log(chalk.magenta("You will be asked to change your password when you log in for the first time."))
  });
}

module.exports = exp;