exports.up = function (knex, Promise) {
    return knex
        .schema
        .createTable('books_authors', function (t) {
            t
                .increments('id')
                .unsigned()
                .primary();
            t
                .integer('book_id')
                .unsigned();
            t
                .integer('author_id')
                .unsigned();

            t
                .foreign('book_id')
                .references('id')
                .inTable('books');
            t
                .foreign('author_id')
                .references('id')
                .inTable('authors');
        });
};

exports.down = function (knex, Promise) {
    return knex
        .schema
        .dropTable('books_authors');
};
