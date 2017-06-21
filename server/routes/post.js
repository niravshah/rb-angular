const express = require('express');
const router = express.Router();

var generatePassword = require('password-generator');


const post1 = require('../data/post1');
const post2 = require('../data/post2');
const post = require('../models/post');
const User = require('../models/user');

module.exports = function (passport) {


  router.get('/api/posts', (req, res) => {
    res.json([post1, post2]);
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
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = generatePassword();
        newUser.save(function (err, user) {
          if (err) {
            res.status(500).json({
              message: "Error creating new User. Please try again later.",
              error: err
            })
          } else {

            emailLogonDetails(user);
            createPost(user, req.body.title, function (err, post) {
              if (err) {
                res.status(500).json({'message': err})
              } else {
                res.status(200).json({'message': 'Post Created', 'id': post.id})
              }
            })
          }
        });
      }
    });

  });


  router.get('/api/posts/:id', (req, res) => {
    res.json(post1);
  });

  function createPost(user, title, callback) {
    console.log('Creating Post ' + title + ' for user ' + user.email);
    callback(null, {'id': 1})
  }

  function emailLogonDetails(user) {
    console.log('Emailing Logon Details for user ' + user.email);
  }

  return router;
};
