const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];
const stripe = require('stripe')(config.STRIPE_KEY);

const unirest = require('unirest');

module.exports = function (passport) {

  router.post('/api/stripe/auth-code', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {
    // console.log('Request Body: ', req.body);
    unirest.post('https://connect.stripe.com/oauth/token')
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .send({client_secret: 'sk_test_aTh0omXn80N08tMdm2UKpyrC', grant_type: 'authorization_code', code: req.body.code})
      .end(function (response) {
        if (response.ok) {
          // console.log(response.body);
          return res.json(response.body);
        } else {
          //  console.log(response.body, response.status, response.statusType);
          return res.status(response.code).json(response.body);
        }
      });

  }, (error, req, res, next) => {
  });

  return router;
}
