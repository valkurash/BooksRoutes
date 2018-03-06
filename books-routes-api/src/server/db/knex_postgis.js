const knex = require("./connection");
module.exports = require("knex-postgis")(knex);
