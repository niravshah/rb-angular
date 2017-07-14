const Post = require('../models/post');
const User = require('../models/user');

const PhoneVerification = require('../models/phone-verification');

var bcrypt = require('bcrypt');
const saltRounds = 10;
var shortid = require('shortid');

const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];


const twilio = require('twilio')(
  config.TWILIO_ACCOUNT_SID,
  config.TWILIO_AUTH_TOKEN
);


module.exports = {

  createUser: function (email, password, fname, lname, mobile, mobileCode, callback) {
    const newUser = new User();
    newUser.sid = shortid.generate();
    newUser.email = email;
    newUser.fname = fname;
    newUser.lname = lname;
    newUser.mobile = mobile;
    newUser.mobileCode = mobileCode;
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
  },

  createPhoneVerification: function (number, callback) {
    const newPV = new PhoneVerification();
    newPV.sid = shortid.generate();
    newPV.number = number;
    newPV.code = shortid.generate();
    newPV.save(function (err, pv) {
      callback(err, pv);
    })
  },

  mobileSendVerificationCode: function (mobile, message, callback) {

    callback(null, {message: "success"});
    /*client.messages.create({
     from: config.TWILIO_PHONE_NUMBER,
     to: mobile,
     body: message
     },
     function (err, message) {
     if (err) {
     callback({message: err.message}, null);
     } else {
     callback(null, {message: message.status});
     }
     }
     );*/


  }

};
