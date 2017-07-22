var mongoose = require('mongoose');

module.exports = mongoose.model('Activity', {
  sid: {type: String},
  post: {type:mongoose.Schema.Types.ObjectId, ref:'Post', required:true},
  description: {type: String,required:true},
  created: {type:Date, default:Date.now()}
});
