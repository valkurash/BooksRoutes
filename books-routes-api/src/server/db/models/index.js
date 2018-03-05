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
    return this.hasMany(Point);
  }
});
const Point = bookshelf.Model.extend({
  tableName: "points",
  route: function() {
    return this.belongsTo(Route);
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
  Point,
  Author
};
