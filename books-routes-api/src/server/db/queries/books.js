const knex = require('../connection');
const bookshelf = require('../bookshelf');

function getAllBooks() {
  return knex
    .select('*')
    .from('books')
    .leftOuterJoin('books_authors', 'books.id', 'books_authors.book_id')
    .leftOuterJoin('authors', 'books_authors.author_id', 'authors.id');
}

function getSingleBook(id) {
  return knex('books')
    .select('*')
    .where({id: parseInt(id)});
}

function addBook(book) {
  return knex('books')
    .insert(book)
    .returning('*');
}

function updateBook(id, book) {
  return knex('books')
    .update(book)
    .where({id: parseInt(id)})
    .returning('*');
}

function deleteBook(id) {
  return knex('books')
    .del()
    .where({id: parseInt(id)})
    .returning('*');
}

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook
};