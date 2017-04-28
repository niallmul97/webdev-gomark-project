'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');

const start = {
  index(request, response) {
    logger.info('start rendering');

    const bookmarkCollections = bookmarklistStore.getBookmarklistCollection();
    let totalBookmarks = 0;
    for (let i = 0; i < bookmarkCollections.length; i++) {
      totalBookmarks = totalBookmarks + bookmarkCollections[i].bookmarks.length;
    }

    const viewData = {
      title: 'Welcome to Gomark 1',
      description: 'This app enable you to manage your bookmarks. You can organise them into categories and share them with your friends and colleagues.',
      totalNumberOfCollections: bookmarkCollections.length,
      totalBookmarks: totalBookmarks,
    };
    response.render('start', viewData);
  },
};

module.exports = start;
