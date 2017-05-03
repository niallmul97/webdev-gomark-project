'use strict';
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

    index(request, response) {
        logger.info('start rendering');
        const bookmarklistStore = require('../models/bookmarklist-store');

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
        response.render('index', viewData);
    },

    login(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('login', viewData);
    },

    logout(request, response) {
        response.cookie('bookmarklist', '');
        response.redirect('/');
    },

    signup(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('signup', viewData);
    },

    register(request, response) {
        const user = request.body;
        user.id = uuid();
        userstore.addUser(user);
        logger.info(`registering ${user.email}`);
        response.redirect('/');
    },

    authenticate(request, response) {
        const user = userstore.getUserByEmail(request.body.email);
            if (user && user.password == request.body.password) {
            response.cookie('bookmarklist', user.email);
            logger.info(`logging in ${user.email}`);
            response.redirect('/dashboard');
        } else {
            response.redirect('/login');
        }
    },

    getCurrentUser (request) {
        const userEmail = request.cookies.bookmarklist;
        const userPassword =  request.cookies.bookmarklist;
        return userstore.getUserByEmail(userEmail);
    }
}

module.exports = accounts;