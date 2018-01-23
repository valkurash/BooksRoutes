const knex = require('../connection');

function getAllBooks() {
  return knex('books')
  .select('*');
}

function getSingleBook(id) {
  return knex('books')
  .select('*')
  .where({ id: parseInt(id) });
}

function addBook(book) {
  return knex('books')
  .insert(book)
  .returning('*');
}

function updateBook(id, book) {
  return knex('books')
  .update(book)
  .where({ id: parseInt(id) })
  .returning('*');
}

function deleteBook(id) {
  return knex('books')
  .del()
  .where({ id: parseInt(id) })
  .returning('*');
}

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook
};