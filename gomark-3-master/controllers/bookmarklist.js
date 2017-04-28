'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const uuid = require('uuid');

const bookmarklist = {
  index(request, response) {
    const bookmarklistId = request.params.id;
    logger.debug('Playlist id = ', bookmarklistId);
    const viewData = {
      title: 'Playlist',
      bookmarklist: bookmarklistStore.getBookmarklist(bookmarklistId),
    };
    response.render('bookmarklist', viewData);
  },

  deleteBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarkId = request.params.bookmarkid;
    logger.debug(`Deleting Song ${bookmarkId} from Playlist ${bookmarklistId}`);
    bookmarklistStore.removeBookmark(bookmarklistId, bookmarkId);
    response.redirect('/bookmarklist/' + bookmarklistId);
  },

  addBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarklist = bookmarklistStore.getBookmarklist(bookmarklistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
      summary: request.body.summary,
    };
    bookmarklistStore.addBookmark(bookmarklistId, newSong);
    response.redirect('/bookmarklist/' + bookmarklistId);
  },
};

module.exports =  bookmarklist;
