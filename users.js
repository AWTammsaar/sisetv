var storage = require('node-persist');
storage.initSync();
var bcrypt = require('bcrypt-nodejs');
var users = {
  getUser: function (username, password, cb) {
    if (!cb && password) {
      cb = password;
      password = null;
    }
    storage.getItem('users', function (users) {
      if (!users) return cb(null);
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.username === username && (!password || bcrypt.compareSync(user.password))) return cb(user);
      }
      return cb(null);
    });
  }
};

module.exports = users;