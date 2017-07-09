const express = require('express');
const router = express.Router();

module.exports = function (passport) {

  router.post('/api/phone/code/request', (req, res) => {
    console.log(req.body);
    res.json({message: 'Code Sent'});
  });

  return router;

};
