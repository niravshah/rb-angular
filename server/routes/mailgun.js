const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];
const mailgun = require('mailgun-js')({apiKey: config.MAILGUN_API_KEY, domain: config.MAILGUN_DOMAIN});

module.exports = {

  emailLogonDetails: function (user, password) {
    // console.log('Emailing Logon Details for user ', user.email, password);


    var data = {
      from: 'hello@raisebetter.uk',
      to: user.email,
      subject: 'Welcome to Raise Better!',
      text: 'Username: ' + user.email + ' Password: ' + password
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });


  }

};
