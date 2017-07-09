const express = require('express');
const router = express.Router();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
module.exports = function (passport) {

  router.post('/api/phone/code/request', (req, res) => {
    console.log(req.body);
    res.json({message: 'Code Sent'});
  });

  return router;

};
