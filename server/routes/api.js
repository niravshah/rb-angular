const express = require('express');
const router = express.Router();
const posts = require('../data/posts');
const post1 = require('../data/post1');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts',(req,res) => {
  res.json(posts);
});

router.get('/posts/:id',(req,res) => {
  res.json(post1);
});


module.exports = router;
