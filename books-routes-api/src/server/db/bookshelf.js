const knex = require("./connection");
module.exports = require("bookshelf")(knex);
