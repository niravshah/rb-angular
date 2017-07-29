const path = require('path');

const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];
const mailgun = require('mailgun-js')({apiKey: config.MAILGUN_API_KEY, domain: config.MAILGUN_DOMAIN});



var EmailTemplate = require('email-templates').EmailTemplate;
var templateDir = path.join(__dirname, '../templates', 'welcome');
var welcome = new EmailTemplate(templateDir);


module.exports = {

  sendEmail: function (user, password, mobile) {

    welcome.render({name: user}, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        // console.log(result.text);
        // console.log(result.html);

        var data = {
          from: 'hello@raisebetter.uk',
          to: 'nirav.shah83@gmail.com',
          subject: 'Test Email!',
          text: result.text,
          html: result.html
        };

        mailgun.messages().send(data, function (error, body) {
          if (error) {
            console.log(error);
          } else {
            console.log(body);
          }

        });


      }

    });


  }

};
