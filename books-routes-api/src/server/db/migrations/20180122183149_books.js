exports.up = function(knex) {
  return knex.schema
    .createTable("languages", function(table) {
      table.increments("id").primary();
      table.string("ru_name").notNullable();
      table.string("en_name").notNullable();
      table.string("iso639").notNullable();
    })
    .createTable("countries", function(table) {
      table.increments("id").primary();
      table.string("iso").notNullable();
      table.string("ru_name").notNullable();
      table.string("en_name").notNullable();
      table.string("iso3").nullable();
      table.integer("numcode").nullable();
      table.integer("phonecode").notNullable();
    })
    .createTable("books", function(table) {
      table.increments("id").primary();
      table
        .string("title")
        .notNullable()
        .unique();
      table.string("isbn").nullable();
      table.string("cover").nullable();
      table.text("description").nullable();
      table.bool("moderated");
      table.text("litres").nullable();
      table.text("ozon").nullable();
    })
    .createTable("routes", function(table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("googlemymap").nullable();
      table
        .integer("book_id")
        .references("books.id")
        .onDelete("CASCADE");
    })
    .createTable("points", function(table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.specificType("point", "Point").nullable();
      table.text("polyline").nullable();
      table.text("polygon").nullable();
      table.integer("order").notNullable();
      table.text("description").nullable();
      table
        .integer("route_id")
        .references("routes.id")
        .onDelete("CASCADE");
    })
    .createTable("languages_routes", function(table) {
      table
        .integer("language_id")
        .references("languages.id")
        .onDelete("CASCADE");
      table
        .integer("route_id")
        .references("routes.id")
        .onDelete("CASCADE");
    })
    .createTable("countries_routes", function(table) {
      table
        .integer("country_id")
        .references("countries.id")
        .onDelete("CASCADE");
      table
        .integer("route_id")
        .references("routes.id")
        .onDelete("CASCADE");
    })
    .createTable("authors", function(table) {
      table.increments("id").primary();
      table
        .string("name")
        .notNullable()
        .unique();

      table.string("avatar").nullable();
    })
    .createTable("authors_books", function(table) {
      table
        .integer("author_id")
        .references("authors.id")
        .onDelete("CASCADE");
      table
        .integer("book_id")
        .references("books.id")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("languages_routes")
    .dropTableIfExists("countries_routes")
    .dropTableIfExists("languages")
    .dropTableIfExists("countries")
    .dropTableIfExists("authors_books")
    .dropTableIfExists("points")
    .dropTableIfExists("routes")
    .dropTableIfExists("books")
    .dropTableIfExists("authors");
};
