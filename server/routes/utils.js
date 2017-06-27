const Post = require('../models/post');
const User = require('../models/user');

var bcrypt = require('bcrypt');
const saltRounds = 10;
var shortid = require('shortid');

module.exports = {

  createUser: function (email, password, name, callback) {
    const newUser = new User();
    newUser.sid = shortid.generate();
    newUser.email = email;
    newUser.name = name;
    newUser.password = bcrypt.hashSync(password, saltRounds);
    newUser.save(function (err, user) {
      callback(err, user)
    });
  },

  createPost: function (user, title, amount, currency, callback) {
    const newPost = new Post();
    newPost.title = title;
    newPost.author = user;
    newPost.sid = shortid.generate();
    newPost.target = amount;
    newPost.currency = currency;
    newPost.save(function (err, post) {
      callback(err, post)
    });
  },

  emailLogonDetails: function (user, password) {
    console.log('Emailing Logon Details for user ', user.email, password);
  }


};
