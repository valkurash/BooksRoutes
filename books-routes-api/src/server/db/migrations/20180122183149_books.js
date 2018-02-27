exports.up = function (knex) {
    return knex
        .schema
        .createTable('books', function (table) {
            table
                .increments('id')
                .primary();
            table
                .string('title')
                .notNullable()
                .unique();
            table
                .string('isbn')
                .nullable();
            table
                .string('cover')
                .nullable();
            table
                .text('description')
                .nullable();
        })
        .createTable('authors', function (table) {
            table
                .increments('id')
                .primary();
            table
                .string('name')
                .notNullable()
                .unique();

            table
                .string('avatar')
                .nullable();
        })
        .createTable('authors_books', function (table) {
            table
                .integer('author_id')
                .references('authors.id');
            table
                .integer('book_id')
                .references('books.id');
        });
};

exports.down = function (knex) {
    return knex
        .schema
        .dropTable('books')
        .dropTable('authors')
        .dropTable('authors_books');
};
