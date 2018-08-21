const knex = require("../connection");
const Models = require("../models");
const bookshelf = require("../bookshelf");
bookshelf.plugin("pagination");

async function getAllBooks(query) {
  const term = query.searchTerm || "";
  const countries = query.selectedCountries
    ? query.selectedCountries.split(",")
    : [];
  const languages = query.selectedLanguages
    ? query.selectedLanguages.split(",")
    : [];

  return Models.Book.query(function(qb) {
    qb.where("books.moderated", "true");

    if (term) {
      qb.join("authors_books", "books.id", "=", "authors_books.book_id");
      qb.join("authors", "authors_books.author_id", "=", "authors.id");
      qb.andWhere(
        knex.raw("(LOWER(books.title) LIKE ? OR LOWER(authors.name) LIKE ?)", [
          "%" + term.toLowerCase() + "%",
          "%" + term.toLowerCase() + "%"
        ])
      );
    }

    if (countries.length || languages.length) {
      qb.leftJoin("routes", "books.id", "routes.book_id");
      if (countries.length) {
        qb.join(
          "countries_routes",
          "routes.id",
          "=",
          "countries_routes.route_id"
        );
        qb.join(
          "countries",
          "countries_routes.country_id",
          "=",
          "countries.id"
        );

        qb.andWhere("countries.ru_name", "in", countries);
      }

      if (languages.length) {
        qb.join(
          "languages_routes",
          "routes.id",
          "=",
          "languages_routes.route_id"
        );
        qb.join(
          "languages",
          "languages_routes.language_id",
          "=",
          "languages.id"
        );
        qb.andWhere("languages.ru_name", "in", languages);
      }
    }

    qb
      .groupBy("books.id")
      .distinct("books.id")
      .select("books.*");
  })
    .orderBy("title", "ASC")
    .fetchPage({
      pageSize: query.pageSize, // Defaults to 10 if not specified
      page: query.page, // Defaults to 1 if not specified
      withRelated: [
        "authors",
        {
          routes: function(query) {
            query.orderBy("name");
          }
        },
        "routes.languages",
        "routes.countries"
      ]
    });
}

function getSingleBook(id) {
  return Models.Book.where({ id: parseInt(id) }).fetch({
    withRelated: [
      "authors",
      {
        routes: function(query) {
          query.orderBy("name");
        }
      },
      "routes.points"
    ]
  });
}
function getCountriesAndLanguages() {
  const countries = knex("countries_routes")
    .distinct("ru_name")
    .join("countries", "countries_routes.country_id", "countries.id")
    .select("ru_name")
    .orderBy("ru_name", "asc");
  const languages = knex("languages_routes")
    .distinct("ru_name")
    .join("languages", "languages_routes.language_id", "languages.id")
    .select("ru_name")
    .orderBy("ru_name", "asc");
  return Promise.all([countries, languages]);
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
        googlemymap: routeData.googlemymap,
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
  deleteBook,
  getCountriesAndLanguages
};
