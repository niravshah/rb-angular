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


      var post = req.body.post;

      Post.findOne({sid: post}).populate('account').exec(function (err, post1) {

        if (err) {
          return res.status(500).json({message: err.message});
        } else {

          var rb_uid = utils.shortid();
          var token = req.body.token;
          var cust_email = req.body.attributes.email;
          var cust_name = req.body.attributes.name;
          var destination_account = post1.account.stripe_account_id;
          var description = rb_uid + ' - Raise Better Donation for ' + post1.title;
          var statement_descriptor = 'Raise Better Donation ' + rb_uid;

          // 5000 pence, 500 pence
          var charge_amount = req.body.attributes.amount * 100;

          // 60 pence
          var rb_fees = charge_amount * 0.015;

          stripe.charges.create({
              amount: charge_amount,
              currency: "gbp",
              source: token.id,
              application_fee: rb_fees,
              description: description,
              receipt_email: cust_email,
              statement_descriptor: statement_descriptor
            },
            {stripe_account: destination_account}
          ).then(function (charge) {

            if (charge.status == "succeeded") {
              utils.createCharge(rb_uid, post1, charge.id, cust_name, cust_email, charge.amount, function (err, charge) {
                if (err) {
                  res.status(500).json({message: 'Could not save charge'});
                } else {
                  var activity = cust_name + ' donated ' + charge.amount;
                  utils.createActivity(post, activity, function (err, activity) {
                    if (err) {
                      res.status(500).json({message: 'Could not save activity'});
                    } else {
                      res.json({message: 'Charge Successful', charge: charge});
                    }
                  })
                }

              });
            } else {
              res.status(500).json({message: 'Charge Unsuccessful', charge: charge});
            }
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
