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

module.exports = {
  getAllBooks,
  getSingleBook,
};