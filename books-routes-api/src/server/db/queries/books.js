const knex = require("../connection");
const Models = require("../models");
const bookshelf = require("../bookshelf");

function getAllBooks() {
  return Models.Book.where("moderated", "true").fetchAll({
    withRelated: ["authors"]
  });
}

function getSingleBook(id) {
  return Models.Book.where({ id: parseInt(id) }).fetch({
    withRelated: ["authors", "routes", "routes.points"]
  });
}

function addBookWithRelations(bookData) {
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  return bookshelf.transaction(async function(t) {
    //добавление книги
    let book = await Models.Book.where("title", bookData.book.title).fetch({
      transacting: t
    });
    if (book) {
      bookData.book.title = `${bookData.book.title}_${Math.random()}`;
    }

    book = await Models.Book.forge(bookData.book).save(null, {
      transacting: t
    });

    //добавление авторов
    await asyncForEach(bookData.authors, async authorData => {
      let author = await Models.Author.where("name", authorData.name).fetch({
        transacting: t
      });
      if (!author) {
        author = await Models.Author.forge(authorData).save(null, {
          transacting: t
        });
      }
      //добавление в таблицу связей книг и авторов
      await Models.Book.forge({ id: book.id })
        .authors()
        .attach(author.id, { transacting: t });
    });

    //добавление маршрутов
    await asyncForEach(bookData.routes, async routeData => {
      const route = await Models.Route.forge({
        name: routeData.name,
        book_id: book.id
      }).save(null, { transacting: t });

      //добавление точек
      await asyncForEach(routeData.path, async point => {
        await route.related("points").create(
          {
            name: point.name,
            route_id: route.id,
            order: parseInt(point.order),
            point: knex.raw(`Point(${point.lat}, ${point.lon})`),
            description: point.description
          },
          { transacting: t }
        );
      });
    });
    return book;
  });
}

function addBook(book) {
  return knex("books")
    .insert(book)
    .returning("*");
}

function updateBook(id, book) {
  return knex("books")
    .update(book)
    .where({ id: parseInt(id) })
    .returning("*");
}

function deleteBook(id) {
  return knex("books")
    .del()
    .where({ id: parseInt(id) })
    .returning("*");
}

module.exports = {
  getAllBooks,
  getSingleBook,
  addBookWithRelations,
  addBook,
  updateBook,
  deleteBook
};
