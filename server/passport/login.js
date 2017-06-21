var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'username'}, function(username, password, done) {
    User.findOne({
      'email': username
    }, function(err, user) {
      if(err) return done(err);
      if(!user) {
        console.log('User not found with username ' + username);
        return done('User or Password Invalid', false);
      }
      if(password != user.password) {
        console.log('Invalid Password for username ' + username);
        return done('User or Password Invalid', false);
      }
      return done(null, user);
    });
  }));
}
