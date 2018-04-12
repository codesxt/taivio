var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var urlListSchema = new mongoose.Schema({
  name: String,
  user: {
    type: ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['default', 'custom'],
    default: 'user'
  },
  urls: [{
    type : Number,
    ref  : 'Url'
  }]
}, {
  timestamps: true
});

mongoose.model('UrlList', urlListSchema);
