const express = require('express');
const router = express.Router();

var generatePassword = require('password-generator');

const post1 = require('../data/post1');
const post2 = require('../data/post2');

const Post = require('../models/post');
const User = require('../models/user');
const utils = require('./utils');

module.exports = function (passport) {

  router.get('/api/posts', (req, res) => {
    res.json([post1, post2]);
  });


  router.get('/api/posts/:id', (req, res) => {

    if(req.params.id === 'undefined'){
      res.json(post1);
    }

    Post.find({
      sid: req.params.id
    }).populate('author', 'sid name email avatar').exec(function (err, posts) {

      if (err) {
        res.status(500).json({
          message: "Error retrieving User posts.",
          error: err
        })

      } else {
        res.json(posts[0]);
      }

    });
  });


  router.get('/api/user/:id/posts', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {

    Post.find({
      author: req.user
    }).populate('author','sid name email').exec(function (err, posts) {
      //console.log(err, posts);
      if (err) {
        res.status(500).json({
          message: "Error retrieving User posts.",
          error: err
        })

      } else {
        res.json(posts);
      }

    });
  }, (err, req, res, next) => {
    res.status(403).json({'message': err, 'status': err.status});
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

        utils.createUser(req.body.email, password, req.body.fname, function (err, user) {
          if (err) {
            res.status(500).json({
              message: "Error creating new User. Please try again later.",
              error: err
            })
          } else {
            utils.emailLogonDetails(user, password);
            utils.createPost(user, req.body.title, req.body.amount, req.body.currency, function (err, post) {
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

  return router;
};


