var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['FUNDRAISER', 'PATRON'], default: 'FUNDRAISER'},
  addressLine1: {type: String, default: ''},
  addressLine2: {type: String, default: ''},
  addressLine3: {type: String, default: ''},
  country: {type: String, default: ''},
  postcode: {type: String, default: ''},
  mobile: {type: String, default: ''},
  story: {type: String, default: ''},
  avatar: {type: String, default: ''}
});


