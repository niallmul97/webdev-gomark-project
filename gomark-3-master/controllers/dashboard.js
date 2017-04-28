'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser =  accounts.getCurrentUser(request);
    const viewData = {
        title: 'Gomark Dashboard',
        bookmarklistcollection: bookmarklistStore.getUserBookmarklist(loggedInUser.id),
    };
    logger.info('about to render', viewData.bookmarklistcollection);
    response.render('dashboard', viewData);
  },

  deleteBookmarklist(request, response) {
    const bookmarklistId = request.params.id;
    logger.debug(`Deleting Bookmarklist ${bookmarklistId}`);
    bookmarklistStore.removeBookmarklist(bookmarklistId);
    response.redirect('/dashboard');
  },

  addBookmarklist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newBookmarklist = {
      id: uuid(),
      userid:loggedInUser.id,
      title: request.body.title,
      bookmarks: [],
    };
    logger.debug('Creating a new Bookmarklist', newBookmarklist);
    bookmarklistStore.addBookmarklist(newBookmarklist);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
