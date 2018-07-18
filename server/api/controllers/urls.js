const mongoose = require('mongoose');
const utils = require('./utils');
const Url = mongoose.model('Url');
const Counter = mongoose.model('Counter');
const UrlList = mongoose.model('UrlList');
var base58 = require('./base58.js');
const validator = require('validator');
const urlExists = require('url-exists');
const morgan = require('morgan');

const webshot = require('webshot');

const JsonApiQueryParserClass = require('jsonapi-query-parser');
const JsonApiQueryParser = new JsonApiQueryParserClass();

const urlValidation = {
  protocols: ['http','https','ftp'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_trailing_dot: false
}

const webshotOptions = {
  screenSize: {
    width: 320,
    height: 480
  },
  shotSize: {
    width: 320,
    height: 320
  },
  renderDelay: 1000,
  streamType: 'png',
  userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
    + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

function saveThumbnail(long_url, id){
  webshot(long_url, 'thumbs/'+id+'.png', webshotOptions, function(err) {
    if(err){
      console.log(err)
    }
    console.log('Image captured for url ['+long_url+']')
  });
}

module.exports.shortenUrl = (req, res) => {
  var longUrl = req.body.url;
  var shortUrl = '';
  if(validator.isURL(longUrl, urlValidation)){
    Url.findOne({
      long_url: longUrl
    })
    .lean()
    .exec(function (err, doc){
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
        saveThumbnail(longUrl, doc._id);
        utils.sendJSONresponse(res, 200, {
          'shortUrl': shortUrl,
          doc: doc
        });
      } else {
        // The long URL was not found in the long_url field in our urls
        // collection, so we need to create a new entry:
        urlExists(longUrl, function(err, exists) {
          if(err){
            console.log(err);
            utils.sendJSONresponse(res, 400, {
              message: 'No hemos podido verificar que la URL "'+longUrl+'" exista. Verifica que apunte a un sitio válido.'
            })
          }else if(exists){
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
              shortUrl = 'taiv.io/' + base58.encode(newUrl._id);
              saveThumbnail(longUrl, newUrl._id);
              utils.sendJSONresponse(res, 200, {
                'shortUrl': shortUrl
              });
            });
          }else{
            utils.sendJSONresponse(res, 400, {
              message: 'No hemos podido verificar que la URL "'+longUrl+'" exista. Verifica que apunte a un sitio válido.'
            })
          }
        });
      }
    });
  }else{
    utils.sendJSONresponse(res, 400, {
      message: "La URL enviada no es válida. Revisa si está escrita correctamente y si no falta el protocolo (http / https)."
    })
  }
}

_urlToList = (user_id, url_id, list_id) => {
  let query = {};
  if(list_id == undefined){
    query.type = 'default';
    query.user = user_id;
  }else{
    query._id = list_id;
    query.user = user_id;
  }
  UrlList.findOne(query, (err, list) => {
    list.urls.addToSet(url_id);
    list.save((err) => {
    })
  })
}

module.exports.shortenUrlToList = (req, res) => {
  var longUrl = req.body.url;
  var listId  = req.body.listId;
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
        shortUrl = 'taiv.io/' + base58.encode(doc._id);
        _urlToList(req.user._id, doc._id, listId);
        saveThumbnail(longUrl, doc._id);
        utils.sendJSONresponse(res, 200, {
          'shortUrl': shortUrl
        });
      } else {
        urlExists(longUrl, function(err, exists) {
          if(err){
            console.log(err);
            utils.sendJSONresponse(res, 400, {
              message: 'No hemos podido verificar que la URL "'+longUrl+'" exista. Verifica que apunte a un sitio válido.'
            })
          }else if(exists){
            var newUrl = Url({
              long_url: longUrl
            });
            newUrl.save(function(err) {
              if (err){
                console.log(err);
              }
              _urlToList(req.user._id, newUrl._id, listId);
              shortUrl = 'taiv.io/' + base58.encode(newUrl._id);
              saveThumbnail(longUrl, newUrl._id);
              utils.sendJSONresponse(res, 200, {
                'shortUrl': shortUrl
              });
            });
          }else{
            utils.sendJSONresponse(res, 400, {
              message: 'No hemos podido verificar que la URL "'+longUrl+'" exista. Verifica que apunte a un sitio válido.'
            })
          }
        });
      }
    });
  }else{
    utils.sendJSONresponse(res, 400, {
      message: "La URL enviada no es válida. Revisa si está escrita correctamente y si no falta el protocolo (http / https)."
    })
  }
}

module.exports.getUrls = (req, res) => {
  var hostname    = req.headers.host;
  let requestData = JsonApiQueryParser.parseRequest(req.url);
  let pageNumber  = requestData.queryData.page.number  || 0;
  let pageSize    = requestData.queryData.page.size    || 0;
  let query = { };
  Url.find(
    query
    ,
    '',
    {
      sort:{ },
      skip:pageNumber*pageSize,
      limit:pageSize*1
    },
    function(err, urls){
      if(err){
        console.log(err);
        utils.sendJSONresponse(res, 400, err);
      }else{
        Url.count(query, (err, count) => {
          urls = urls.map((url) => {
            return url.toJSON();
          })
          urls.forEach((url, index) => {
            url.short_url = 'taiv.io/' + base58.encode(url._id);
          });
          utils.sendJSONresponse(res, 201, {
            meta: {
              "total-pages": count/pageSize,
              "total-items": count
            },
            links: {
              self: hostname+'/api/v1/urls'
            },
            data: urls
          });
        });
      }
    }
  )
}

_cleanUrlList = (urlList) => {
  urlList = urlList.toJSON();
  urlList.urls.forEach((url, index) => {
    url.short_url = 'taiv.io/' + base58.encode(url._id);
  });
  return urlList;
}

module.exports.getUrlList = (req, res) => {
  var hostname    = req.headers.host;
  let requestData = JsonApiQueryParser.parseRequest(req.url);
  let pageNumber  = requestData.queryData.page.number  || 0;
  let pageSize    = requestData.queryData.page.size    || 0;
  // See answer to implement pagination: https://stackoverflow.com/questions/31792440/pagination-on-array-stored-in-a-document-field
  let startIndex = pageNumber*pageSize;
  let endIndex   = (pageNumber*pageSize)+(+pageSize);
  if(req.params.listId){
    UrlList.findOne({
      _id : req.params.listId,
      user: req.user._id,
      type: 'custom'
    }, {
      urls: {
        $slice: [startIndex, endIndex]
      }
    })
    .populate('urls')
    .exec((err, urlList) => {
      if(err || urlList == null){
        utils.sendJSONresponse(res, 404, {
          'message' : 'No se pudo encontrar la lista'
        });
      }else{
        urlList = _cleanUrlList(urlList);
        utils.sendJSONresponse(res, 200, {
          'data' : urlList
        });
      }
    })
  }else{
    UrlList.findOne({
      user: req.user._id,
      type: 'default'
    }, {
      urls: {
        $slice: [startIndex, endIndex]
      }
    })
    .populate('urls')
    .exec((err, urlList) => {
      if(urlList == null){
        var defaultList = new UrlList();
        defaultList.name = 'Mis Links';
        defaultList.type = 'default';
        defaultList.user = req.user;
        defaultList.save(
          (err) => {
            utils.sendJSONresponse(res, 200, {
              'data' : defaultList
            });
          }
        )
      }else{
        urlList = _cleanUrlList(urlList);
        utils.sendJSONresponse(res, 200, {
          'data': urlList
        });
      }
    })
  }
}

module.exports.getUrlNumber = (req, res) => {
  Counter.findById('url_count')
  .exec(
    (err, count) => {
      if(err){
        utils.sendJSONresponse(res, 204, {
          'message': 'No se pudo contar los links que hay en el sistema'
        });
        return;
      }
      utils.sendJSONresponse(res, 200, {
        'data': (count.seq-1)
      })
    }
  )
}
