const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];
const stripe = require('stripe')(config.STRIPE_KEY);

module.exports = function (passport) {

  router.post('/api/stripe/account/new', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {
    // console.log('POST /api/stripe/account/new', req.body, req.user);

    stripe.accounts.create({
      type: 'standard',
      country: 'GB',
      email: req.body.email
    }, function (err, account) {
      // asynchronously called
      res.json({account: account, error: err});
    });


  }, (err, req, res, next) => {
  });

  return router;
}
