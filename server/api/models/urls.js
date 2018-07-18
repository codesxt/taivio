var mongoose = require('mongoose');

const counter = mongoose.model('Counter');

var urlSchema = new mongoose.Schema({
  _id: {type: Number},
  long_url: String,
  clicks: {type: Number, default: 0}
}, {
  timestamps: true
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  var doc = this;
  // find the url_count and increment it by 1
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      // set the _id of the urls collection to the incremented value of the counter
      doc._id = counter.seq;
      doc.created_at = new Date();
      next();
  });
});

mongoose.model('Url', urlSchema);
