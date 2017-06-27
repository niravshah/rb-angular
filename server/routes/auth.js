const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const util = require('./utils');
const generatePassword = require('password-generator');


module.exports = function (passport) {

  router.post('/api/authenticate', passport.authenticate('local', {
    failWithError: true
  }), (req, res, next) => {
    var token = jwt.sign({email: req.user.email, sid: req.user.sid}, 'shhhhh');
    res.status(200).json({'message': 'ok', 'email': req.user.email, 'sid': req.user.sid, 'token': token});
  }, (err, req, res, next) => {
    res.status(403).json({'message': err, 'id': 1});
  });


  router.post('/api/register', (req, res) => {

    const password = generatePassword();
    util.createUser(req.body.email, password, req.body.name, function (err, user) {
      if (err) {
        res.status(500).json({
          message: "Error creating new User. Please try again later.",
          error: err
        })
      } else {
        util.emailLogonDetails(user, password);
        res.status(200).json({'message': 'ok', 'email': user.email, 'sid': user.sid});
      }
    });
  });

  return router;
};
