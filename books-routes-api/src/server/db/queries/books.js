const knex = require('../connection');
const Models = require('../models');

function getAllBooks() {
  return Models
    .Book
    .fetchAll({withRelated: ['authors']});

}

function getSingleBook(id) {
  return Models
    .Book
    .where({id: parseInt(id)})
    .fetch({withRelated: ['authors']});

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
