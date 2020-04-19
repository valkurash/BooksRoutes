const bookshelf = require("../bookshelf");

const Book = bookshelf.Model.extend({
  tableName: "books",
  authors: function() {
    return this.belongsToMany(Author);
  },
  routes: function() {
    return this.hasMany(Route);
  }
});
const Route = bookshelf.Model.extend({
  tableName: "routes",
  book: function() {
    return this.belongsTo(Book);
  },
  points: function() {
    return this.hasMany(Point).query(qb => qb.select('*'));
  },
  languages: function() {
    return this.belongsToMany(Language);
  },
  countries: function() {
    return this.belongsToMany(Country);
  }
});
const Language = bookshelf.Model.extend({
  tableName: "languages",
  books: function() {
    return this.belongsToMany(Route);
  }
});
const Country = bookshelf.Model.extend({
  tableName: "countries",
  books: function() {
    return this.belongsToMany(Route);
  }
});
const Point = bookshelf.Model.extend({
  tableName: "points",
  route: function() {
    return this.belongsTo(Route).query(qb => qb.select('*'));
  }
});
const Author = bookshelf.Model.extend({
  tableName: "authors",
  books: function() {
    return this.belongsToMany(Book);
  }
});
module.exports = {
  Book,
  Route,
  Country,
  Language,
  Point,
  Author
};
