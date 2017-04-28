'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarklistStore = {

  store: new JsonStore('./models/bookmarklist-store.json', { bookmarklistCollection: [] }),
  collection: 'bookmarklistCollection',

  getBookmarklistCollection() {
    return this.store.findAll(this.collection);
  },

  getBookmarklist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBookmarklist(bookmark) {
    this.store.add(this.collection, bookmark);
  },

  removeBookmarklist(id) {
    const bookmark = this.getBookmarklist(id);
    this.store.remove(this.collection, bookmark);
  },

  removeAllBookmarklists() {
    this.store.removeAll(this.collection);
  },

  addBookmark(id, bookmark) {
    const bookmarklist = this.getBookmarklist(id);
    bookmarklist.bookmarks.push(bookmark);
  },

  removeBookmark(id, bookmarkId) {
    const bookmarklist = this.getBookmarklist(id);
    const bookmarks = bookmarklist.bookmarks;
    _.remove(bookmarks, { id: bookmarkId});
  },

  getTotalNumberOfBookmark() {
    const collection = this.getBookmarklistCollection();
    let total = 0;
    for (let i=0; i<collection.length; i++) {
      total = total + collection[i].bookmarks.length;
    }
    return total;
  },

  getUserBookmarklist(userid){
    return this.store.findBy(this.collection,{userid: userid});
  }
};

module.exports = bookmarklistStore;
