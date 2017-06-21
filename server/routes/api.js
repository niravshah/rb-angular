const express = require('express');
const router = express.Router();
const post1 = require('../data/post1');
const post2 = require('../data/post2');
const jwt = require('jsonwebtoken');

var tradesman = require('../models/post');
var user = require('../models/user');

const passport = require('passport');
router.use(passport.initialize());

var initPassport = require('../passport/init');
initPassport(passport);




router.post('/authenticate', passport.authenticate('local', {
  failWithError: true
}), (req, res, next) => {
  console.log('POST /api/authenticate', req.body);
  var token = jwt.sign({username: 'nirav_shah'}, 'shhhhh');
  res.status(200).json({'message': 'ok', 'id': 1, 'email': 'n@n.co', 'token': token});
},(err,req,res, next)=>{
  res.status(500).json({'message': err, 'id': 1, 'email': 'n@n.co'});
});


router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts', (req, res) => {
  res.json([post1, post2]);
});


router.post('/posts', (req, res) => {
  console.log('POST /posts', req.body);
  res.status(200).json({'message': 'ok', 'id': 1});
});


router.get('/posts/:id', (req, res) => {
  res.json(post1);
});


module.exports = router;
