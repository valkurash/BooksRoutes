const path = require("path");
let db_test, db_dev, db_prod;
try {
  const db_strings = require("./db_strings.js");
  db_test = db_strings.db_test;
  db_dev = db_strings.db_dev;
  db_prod = db_strings.db_prod;
} catch (e) {
  db_test = process.env.DB_TEST;
  db_dev = process.env.DB_DEV;
  db_prod = process.env.DB_PROD;
}

const BASE_PATH = path.join(__dirname, "src", "server", "db");

module.exports = {
  test: {
    client: "pg",
    connection: db_test,
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
  },
  development: {
    client: "pg",
    connection: db_dev,
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
  },
  production: {
    client: "pg",
    connection: db_prod,
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
