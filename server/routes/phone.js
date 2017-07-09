const express = require('express');
const router = express.Router();
const utils = require('./utils');

const PV = require('../models/phone-verification');
const User = require('../models/user');

const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];

const client = require('twilio')(
  config.TWILIO_ACCOUNT_SID,
  config.TWILIO_AUTH_TOKEN
);

module.exports = function (passport) {

  router.post('/api/phone/code/request', (req, res) => {
    // console.log(req.body);

    PV.findOne({
      number: req.body.number
    }).sort({'created': -1}).exec(function (err, pv) {

      if (err) {
        // console.log('Error', err);
        res.status(500).json({message: err.message});
      } else if (pv) {

        var tenMinsBefore = new Date().getTime() - 600000;
        if (new Date(pv.created).getTime() > tenMinsBefore) {
          res.status(500).json({message: 'Please wait for 10 minutes before request a new code'});

        } else {
          createNewCodeRequest(req.body.number, function (err, resp) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json(resp);
            }
          });
        }
      } else {
        // console.log('No Errors, No PVS');
        createNewCodeRequest(req.body.number, function (err, resp) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json(resp);
          }
        });
      }

    });

  });

  router.post('/api/phone/code/verify', passport.authenticate('jwt', {
    failWithError: true
  }), (req, res, next) => {
    PV.findOne({
      number: req.body.number
    }).sort({'created': -1}).exec(function (err, pv) {

      if (err) {
        // console.log('Error', err);
        res.status(500).json({message: err.message});
      } else if (pv) {

        if (pv.code === req.body.code) {

          User.findOneAndUpdate({sid:req.user.sid},{mobile:req.body.number},{new:true},function(err,user){

            if(err){
              res.status(500).json({message: err.message});
            }else{
              pv.status = 'verified';
              pv.save(function(err,pv){
                if(err){
                  res.status(500).json({message: err.message});
                }else{
                  res.json({message:'Phone number verified!'});
                }
              });
            }
          });

        } else {
          res.status(500).json({message: 'Could not verify code.'})
        }
      }
    },(err, req, res, next) => {
      res.status(403).json({'message': err, 'status': err.status});
    });

  });

  function createNewCodeRequest(number, callback) {
    utils.createPhoneVerification(number, function (err, pv) {
      if (err) {
        callback({message: err.message}, null);
      } else {
        client.messages.create({
            from: config.TWILIO_PHONE_NUMBER,
            to: number,
            body: "Your RaiseBetter Code: " + pv.code
          },
          function (err, message) {
            if (err) {
              callback({message: err.message}, null);
            } else {
              callback(null, {message: message.status});
            }
          }
        );
      }
    });
  }

  return router;

};
