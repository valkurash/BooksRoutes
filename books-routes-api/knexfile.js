const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://valkurash@booksroutes:Val21postgres@booksroutes.postgres.database.azure.com:5432/books_routes_test?ssl=true',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },pool: {
      min: 2,
      max: 10
    }
  },
 development: {
    client: 'pg',
    connection: 'postgres://valkurash@booksroutes:Val21postgres@booksroutes.postgres.database.azure.com:5432/books_routes?ssl=true',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },pool: {
      min: 2,
      max: 10
    }
  }
};