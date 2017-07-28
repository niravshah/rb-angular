const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];

const express = require('express');
const router = express.Router();
const mailgun = require('./mailgun');
const utils = require('./utils');



module.exports = function (passport) {

  router.post('/api/contact/query', (req, res) => {
    var data = req.body;
    mailgun.emailContactQuery(data.fname, data.lname, data.email, data.mobile, data.query);
    utils.createQuery(data.fname, data.lname, data.email, data.mobile, data.query,(err,resp)=>{
      if(err) res.status(500).json({message:err.message});
      else res.json({ref:resp.sid})
    })
  });
  return router;
};
