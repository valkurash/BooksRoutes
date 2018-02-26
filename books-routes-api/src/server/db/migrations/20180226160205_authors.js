exports.up = function (knex, Promise) {
    return knex
        .schema
        .createTable('authors', function (t) {
            t
                .increments('id')
                .unsigned()
                .primary();
            t
                .string('name')
                .notNullable()
                .unique();
            t
                .string('avatar')
                .nullable();
        });
};

exports.down = function (knex, Promise) {
    return knex
        .schema
        .dropTable('authors');
};
