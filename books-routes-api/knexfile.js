const path = require("path");

const BASE_PATH = path.join(__dirname, "src", "server", "db");

module.exports = {
  test: {
    client: "pg",
    connection:
      "postgres://valkurash@booksroutes:Val21postgres@booksroutes.postgres.database.azure.com:5432/books_routes_test?ssl=true&tcp_keepalives_idle=600",
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: true
  },
  development: {
    client: "pg",
    connection:
      "postgres://valkurash@booksroutes:Val21postgres@booksroutes.postgres.database.azure.com:5432/books_routes?ssl=true&tcp_keepalives_idle=600",
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
