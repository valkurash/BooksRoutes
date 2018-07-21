const path = require("path");
let db_test, db_dev;
try {
  const db_strings = require("./db_strings.js");
  db_test = db_strings.db_test;
  db_dev = db_strings.db_dev;
} catch (e) {
  db_test = process.env.DB_TEST;
  db_dev = process.env.DB_DEV;
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
  }
};
