const express = require('express');
const router = express.Router();
const post1 = require('../data/post1');
const post2 = require('../data/post2');
const jwt = require('jsonwebtoken');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts', (req, res) => {
  res.json([post1,post2]);
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
