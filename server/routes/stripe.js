const express = require('express');
const router = express.Router();

module.exports = function (passport) {

  router.post('/api/stripe/account/new', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {
    // console.log('POST /api/stripe/account/new', req.body, req.user);
    res.json({message: 'Account Created'});
  }, (err, req, res, next) => {
  });

  return router;
}
