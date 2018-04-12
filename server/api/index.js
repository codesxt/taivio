const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'user'
});

const ctrlAuthentication  = require('./controllers/authentication');
const ctrlProfile         = require('./controllers/profile');
const ctrlUsers           = require('./controllers/users');
const ctrlUrls            = require('./controllers/urls');
//const ctrlDocuments       = require('./controllers/documents');

const roleAuth            = ctrlAuthentication.roleAuthorization;

// ========== Authentication Endpoints =============

router.post('/register', ctrlAuthentication.register);
router.post('/login', ctrlAuthentication.login);


// ============== Profile Endpoints ================
router.get('/profile', auth, ctrlProfile.getProfile);
router.patch('/profile', auth, ctrlProfile.updateProfile);

// =============== User Management =================
router.get('/users', auth, roleAuth(['administrator']), ctrlUsers.readUserList);
router.get('/users/:userId', auth, roleAuth(['administrator']), ctrlUsers.readUser);
router.patch('/users/:userId', auth, roleAuth(['administrator']), ctrlUsers.updateUser);

router.post('/shorten', ctrlUrls.shortenUrl);
router.get('/urls', ctrlUrls.getUrls);
router.get('/url-list', auth, ctrlUrls.getUrlList);
router.get('/url-list/:listId', auth, ctrlUrls.getUrlList);
router.post('/shorten-tolist', auth, ctrlUrls.shortenUrlToList);

module.exports = router;
