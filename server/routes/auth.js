const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


module.exports = function (passport) {

  router.post('/api/authenticate', passport.authenticate('local', {
    failWithError: true
  }), (req, res, next) => {
    var token = jwt.sign({username: 'nirav_shah'}, 'shhhhh');
    res.status(200).json({'message': 'ok', 'id': 1, 'email': 'n@n.co', 'token': token});
  }, (err, req, res, next) => {
    res.status(403).json({'message': err, 'id': 1, 'email': 'n@n.co'});
  });

  return router;
};
