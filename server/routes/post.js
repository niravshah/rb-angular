const express = require('express');
const router = express.Router();

const post1 = require('../data/post1');
const post2 = require('../data/post2');
const post = require('../models/post');

module.exports = function (passport) {


  router.get('/api/posts', (req, res) => {
    res.json([post1, post2]);
  });


  router.post('/api/posts', (req, res) => {
    console.log('POST /posts', req.body);
    res.status(200).json({'message': 'ok', 'id': 1});
  });


  router.get('/api/posts/:id', (req, res) => {
    res.json(post1);
  });

  return router;
};
