'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const bookmarklist = require('./controllers/bookmarklist.js');
const accounts =require ('./controllers/accounts.js');

router.get('/start', start.index);

router.get('/dashboard', dashboard.index);
router.post('/dashboard/addbookmarklist', dashboard.addBookmarklist);
router.get('/dashboard/deletebookmarklist/:id', dashboard.deleteBookmarklist);

router.get('/about', about.index);
router.post('/addmessage', about.addMessage);

router.get('/bookmarklist/:id', bookmarklist.index);
router.get('/bookmarklist/:id/deletebookmark/:bookmarkid', bookmarklist.deleteBookmark);
router.post('/bookmarklist/:id/addbookmark', bookmarklist.addBookmark);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;
