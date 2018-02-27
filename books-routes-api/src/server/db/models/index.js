const bookshelf = require('../bookshelf');

const Book = bookshelf
    .Model
    .extend({
        tableName: 'books',
        authors: function() {
            return this.belongsToMany(Author);
        },
    });

const Author = bookshelf
    .Model
    .extend({
        tableName: 'authors',
        books: function() {
            return this.belongsToMany(Book);
        },
    });
module.exports = {
    Book,
    Author,
};
