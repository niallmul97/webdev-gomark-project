'use strict';

const logger = require('../utils/logger');
const linkstore = require('../models/bookmarklist-store.js');

const view = {
    index(request, response) {
        const currentUser = request.cookies.bookmarklistCollection;
        logger.info('about rendering');
        const viewData = {
            title: 'Communtity Collections',
            publicLists : linkstore.getPublicCollections(),
        };
        response.render('dashboard', viewData);
    },
};

module.exports = publicCollections;