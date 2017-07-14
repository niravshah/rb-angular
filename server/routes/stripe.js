const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];

const express = require('express');
const router = express.Router();

const stripe = require('stripe')(config.STRIPE_KEY);

const unirest = require('unirest');
const utils = require('./utils');

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

          var body = JSON.parse(response.body);
          var access_token = body.access_token;
          var refresh_token = body.refresh_token;
          var stripe_user_id = body.stripe_user_id;
          var scope = body.scope;
          var livemode = body.livemode;

          utils.createAccount(access_token, refresh_token, stripe_user_id, livemode, scope, function (err, account) {
            if (err) {
              return res.status(500).json(err);
            } else {
              utils.updatePostWithAccount(req.body.post, account, function (err, post) {
                if (err) {

                } else {
                  res.json({message: 'Successfully added the account to the Post'});
                }
              });
            }
          });

        } else {
          //  console.log(response.body, response.status, response.statusType);
          return res.status(response.code).json(response.body);
        }
      });

  }, (error, req, res, next) => {
    return res.status(500).json({message: error.message});
  });

  return router;
};
