const express = require('express');
const router = express.Router();

var bcrypt = require('bcrypt');
const saltRounds = 10;

var generatePassword = require('password-generator');
var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const post1 = require('../data/post1');
const post2 = require('../data/post2');

const Post = require('../models/post');
const User = require('../models/user');

module.exports = function (passport) {

  router.get('/api/posts', (req, res) => {
    res.json([post1, post2]);
  });

  router.get('/api/user/:id/posts', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {
    //console.log("GET /api/user/:id/posts : ", req.params.id, req.user);
    //res.json([post1, post2]);

    Post.find({
      author: req.user
    }).populate().exec(function (err, posts) {
      //console.log(err, posts);
      res.json([post1, post2]);
    });


  }, (err, req, res, nex) => {

    console.log("GET /api/user/:id/posts ERROR !!: ", err);
  });


  router.post('/api/posts', (req, res) => {
    console.log('POST /posts', req.body);
    User.findOne({
      'email': req.body.email
    }, function (err, user) {
      if (err) {
        res.status(500).json({
          message: "Error creating new User. Please try again later.",
          error: err
        })
      } else if (user) {

        res.status(403).json({
          "message": "Email exists. Please login first to create a post with this email id."
        })

      } else {
        //console.log('Creating New User',req.params);

        const password = generatePassword();

        createUser(req.body.email, password, function (err, user) {
          if (err) {
            res.status(500).json({
              message: "Error creating new User. Please try again later.",
              error: err
            })
          } else {

            emailLogonDetails(user, password);
            createPost(user, req.body.title, function (err, post) {
              if (err) {
                res.status(500).json({'message': err})
              } else {
                res.status(200).json({'message': 'Post Created', 'id': post.id})
              }
            });

          }
        });
      }
    });

  });


  router.get('/api/posts/:id', (req, res) => {
    res.json(post1);
  });

  function createUser(email, password, callback) {

    const newUser = new User();
    newUser.sid = shortid.generate();
    newUser.email = email;
    newUser.password = bcrypt.hashSync(password, saltRounds);
    newUser.save(function(err,user){callback(err, user)});

  }

  function createPost(user, title, callback) {
    console.log('Creating Post ' + title + ' for user ' + user.email)
    const newPost = new Post();
    newPost.title = title;
    newPost.author = user;
    newPost.sid = shortid.generate();
    newPost.save(function (err, post) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, {'id': post.sid})
      }
    })

  }

  function emailLogonDetails(user, password) {
    console.log('Emailing Logon Details for user ', user.email, password);
  }

  return router;
};
