const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


module.exports = function (passport) {

  router.post('/api/authenticate', passport.authenticate('local', {
    failWithError: true
  }), (req, res, next) => {
    var token = jwt.sign({email:req.user.email}, 'shhhhh');
    res.status(200).json({'message': 'ok', 'email': req.user.email, 'sid':req.user.sid, 'token': token});
  }, (err, req, res, next) => {
    res.status(403).json({'message': err, 'id': 1});
  });

  return router;
};
