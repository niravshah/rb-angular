var mongoose = require('mongoose');

module.exports = mongoose.model('Post',{
  author: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  type: {type:String, enum: ['other', 'charity'], default: 'other'},
  featured: {type:Boolean, default:false},
  title: {type:String, default:''},
  subTitle: {type:String, default:''},
  image: {type:String, default:''},
  supporters: {type:Number, default:0},
  created: {type:Number, default:0},
  target: {type:Number, default:0},
  collected: {type:Number, default:0},
  currency: {type:String, default:''},
  story:{type:String, default:''}
});

