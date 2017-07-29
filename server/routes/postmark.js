const env = process.env.NODE_ENV || 'dev';
const config = require('./../../server.config')[env];

var postmark = require("postmark");

var client = new postmark.Client(config.postmark);


module.exports = {

  sendEmail: function (user, password, mobile) {

    client.sendEmailWithTemplate({
      "From": "hello@raisebetter.uk",
      "To": user,
      "TemplateId": 2682581,
      "TemplateModel": {
        "name": "name_Value",
        "action_url": "action_url_Value",
        "login_url": "login_url_Value",
        "username": "username_Value",
        "trial_length": "trial_length_Value",
        "trial_start_date": "trial_start_date_Value",
        "trial_end_date": "trial_end_date_Value",
        "support_email": "support_email_Value",
        "live_chat_url": "live_chat_url_Value",
        "help_url": "help_url_Value"
      }
    });

  }
};
