
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(t) {
        t.increments('id').unsigned().primary();
        t.string('title').notNullable().unique();
        t.string('isbn').nullable();
        t.string('cover').nullable();
        t.text('description').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
