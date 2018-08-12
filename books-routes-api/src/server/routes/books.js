const Router = require("koa-router");
const queries = require("../db/queries/books");

const router = new Router();
const BASE_URL = `/api/v1/books`;

router.get(BASE_URL, async ctx => {
  try {
    const books = await queries.getAllBooks();
    ctx.body = {
      status: "success",
      data: books
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});

router.get(`${BASE_URL}/:id`, async ctx => {
  try {
    const book = await queries.getSingleBook(ctx.params.id);
    if (book) {
      ctx.body = {
        status: "success",
        data: book
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Такой книги не существует."
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});
router.get(`/api/v1/countries-languages`, async ctx => {
  try {
    const cl = await queries.getCountriesAndLanguages();
    ctx.body = {
      status: "success",
      data: { countries: cl[0], languages: cl[1] }
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});

router.post(`${BASE_URL}`, async ctx => {
  try {
    const body = ctx.request.body;
    const bookData = {
      book: {
        title: body.title,
        moderated: "false"
      },
      authors: (body.authors.replace(/\s\s+/g, " ") || "unknown")
        .split(",")
        .map(name => ({ name: name.trim() })),
      routes: [
        {
          name: body.route,
          googlemymap: body.googleMyMaps,
          path: body.points.map((point, i) => {
            return {
              name: point.key,
              description: point.description || "unknown",
              lat: point.lat,
              lon: point.lng,
              order: i
            };
          })
        }
      ]
    };
    const book = await queries.addBookWithRelations(bookData);
    ctx.status = 201;
    ctx.body = {
      status: "success",
      data: book
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});

router.put(`${BASE_URL}/:id`, async ctx => {
  try {
    const book = await queries.updateBook(ctx.params.id, ctx.request.body);
    if (book.length) {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: book
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Такой книги не существует."
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});

router.delete(`${BASE_URL}/:id`, async ctx => {
  try {
    const book = await queries.deleteBook(ctx.params.id);
    if (book.length) {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: book
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "That book does not exist."
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});

module.exports = router;
