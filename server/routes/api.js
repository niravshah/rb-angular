const express = require('express');
const router = express.Router();
const post = require('../data/posts');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts',(req,res) => {
  res.json(post);
});

module.exports = router;
