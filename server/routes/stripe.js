const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];

const express = require('express');
const router = express.Router();

const stripe = require('stripe')(config.STRIPE_KEY);

const unirest = require('unirest');
const utils = require('./utils');

const Post = require('../models/post');

module.exports = function (passport) {

  router.post('/api/stripe/auth-code', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {
    // console.log('Request Body: ', req.body);
    unirest.post('https://connect.stripe.com/oauth/token')
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .send({client_secret: config.STRIPE_KEY, grant_type: 'authorization_code', code: req.body.code})
      .end(function (response) {
        if (response.ok) {
          // console.log(response.body);

          var body = response.body;
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


  router.post('/api/stripe/charge', passport.authenticate('jwt', {
      failWithError: true
    }), (req, res, next) => {

      console.log('POST /api/stripe/charge', req.body);

      var token = req.body.token;
      var post = req.body.post;
      var cust_email = req.body.attributes.email;
      var charge_amount = req.body.attributes.amount * 100;

      Post.findOne({sid: post}).populate('account').exec(function (err, post1) {

        if (err) {
          return res.status(500).json({message: err.message});
        } else {

          var destination_account = post1.account.stripe_account_id;
          var destination_amount = charge_amount - (charge_amount * 0.03);


          stripe.customers.create({
            email: cust_email,
            source: token.id,
          }).then(function (customer) {
            utils.createCustomer(cust_email, customer.id, function (err, cust) {
              if (err) {
                return res.status(500).json({message: err.message});
              } else {
                stripe.charges.create({
                  amount: charge_amount,
                  currency: "gbp",
                  customer: cust.stripe_customer_id,
                  destination: {
                    amount: destination_amount,
                    account: destination_account,
                  },
                }).then(function (charge) {
                  res.json({message: 'Charge Successful', charge: charge});
                }).catch(function (err) {
                  res.status(500).json({message: err.message});
                });
              }
            });
          }).catch(function (err) {
            res.status(500).json({message: err.message});
          });
        }
      });
    }, (error, req, res, next) => {
      console.log('POST Error /api/stripe/charge', req.body, error);
      return res.status(500).json({message: error.message});
    }
  );

  return router;
};
