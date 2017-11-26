const mongoose = require('mongoose');
const utils = require('./utils');
const Url = mongoose.model('Url');
var base58 = require('./base58.js');
const validator = require('validator');

const urlValidation = {
  protocols: ['http','https','ftp'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_trailing_dot: false
}

module.exports.shortenUrl = (req, res) => {
  console.log(req.body);
  var longUrl = req.body.url;
  var shortUrl = '';
  if(validator.isURL(longUrl, urlValidation)){
    Url.findOne({
      long_url: longUrl
    }, function (err, doc){
      if(err){
        console.log(err);
        utils.sendJSONresponse(res, 200, {
          'message': "Ocurrió un error",
          'error'  : err
        });
        return;
      }else if (doc){
        // base58 encode the unique _id of that document and construct the short URL
        //shortUrl = req.headers.host + '/' + base58.encode(doc._id);
        shortUrl = 'taiv.io/' + base58.encode(doc._id);
        // since the document exists, we return it without creating a new entry
        utils.sendJSONresponse(res, 200, {
          'shortUrl': shortUrl
        });
      } else {
        // The long URL was not found in the long_url field in our urls
        // collection, so we need to create a new entry:
        var newUrl = Url({
          long_url: longUrl
        });
        // save the new link
        newUrl.save(function(err) {
          if (err){
            console.log(err);
          }
          // construct the short URL
          // shortUrl = req.headers.host + '/' + base58.encode(newUrl._id);
          shortUrl = 'taiv.io/' + base58.encode(doc._id);
          utils.sendJSONresponse(res, 200, {
            'shortUrl': shortUrl
          });
        });
      }
    });
  }else{
    utils.sendJSONresponse(res, 400, {
      message: "La URL enviada no es válida. Revisa si está escrita correctamente y si no falta el protocolo (http / https)."
    })
  }
  // check if url already exists in database

}
