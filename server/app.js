require('dotenv').load();
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Get Configuration Files
require('./api/models/db');
require('./api/config/passport');
var config = require('./config');

// Get our API routes
const api = require('./api/index');

const app = express();

// Enable CORS
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Enable Passport for authentication
app.use(passport.initialize());

// Set our api routes
app.use('/api/v1', api);

// TODO: Make this code prettier
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const base58 = require('./api/controllers/base58.js');
app.get('/:encoded_id', function(req, res){
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);
  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      // found an entry in the DB, redirect the user to their destination
      Url.update({_id:id},{$inc:{clicks:1}}, () => {});
      res.redirect(doc.long_url);
    } else {
      // nothing found, take 'em home
      res.redirect('/');
    }
  });
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;
