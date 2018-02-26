exports.seed = (knex, Promise) => {
  return knex('books_authors')
    .del()
    .then(() => {
      return knex('books_authors').insert({book_id: 4, author_id: 15});
    })
    .then(() => {
      return knex('books_authors').insert({book_id: 5, author_id: 14});
    })
    .then(() => {
      return knex('books_authors').insert({book_id: 6, author_id: 13});
    });
};