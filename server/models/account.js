var mongoose = require('mongoose');

module.exports = mongoose.model('Account', {
  sid: {type: String},
  stripe_account_id: {type: String},
  status: {type: String, enum: ['draft', 'live-test', 'live'], default: 'draft'}
});
