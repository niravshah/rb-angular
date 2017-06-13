const express = require('express');
const router = express.Router();
const posts = require('../data/posts');
const post1 = require('../data/post1');
const jwt = require('jsonwebtoken');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts', (req, res) => {
  res.json(posts);
});


router.post('/posts', (req, res) => {
  console.log('POST /posts', req.body);
  res.status(200).json({'message': 'ok','id':1});
});


router.get('/posts/:id', (req, res) => {
  res.json(post1);
});

router.post('/authenticate',(req,res)=>{
  console.log('POST /api/authenticate', req.body);
  var token = jwt.sign({ username: 'nirav_shah' }, 'shhhhh');
  res.status(200).json({'message': 'ok','id':1,'email':'n@n.co','token':token});
});

module.exports = router;
