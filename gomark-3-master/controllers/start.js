'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const accounts = require ('./accounts.js');

const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    const bookmarkCollections = bookmarklistStore.getBookmarklistCollection();
    let totalBookmarks = 0;
    for (let i = 0; i < bookmarkCollections.length; i++) {
      totalBookmarks = totalBookmarks + bookmarkCollections[i].bookmarks.length;
    }

    const viewData = {
      title: 'Gomark',
      description: 'This app enables you to manage your bookmarks. You can organise them into categories and share them with your friends and colleagues.',
      totalNumberOfCollections: bookmarkCollections.length,
      totalBookmarks: totalBookmarks,
      userBookmarklist: bookmarklistStore.getCurrentUserBookmarklist(loggedInUser),
      userBookmarks: bookmarklistStore.getCurrentUserBookmarks(loggedInUser),
    };
    response.render('start', viewData);
  },
};

module.exports = start;
