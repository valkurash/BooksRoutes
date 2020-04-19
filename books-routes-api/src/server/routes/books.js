const Router = require("koa-router");
const queries = require("../db/queries/books");
const parser = require("../utils/geoJsonParser");
const url = require("url");

const router = new Router();
const BASE_URL = `/api/books`;

router.get(`${BASE_URL}`, async ctx => {
  try {
    const books = await queries.getAllBooks(ctx.request.query);
    const paginationData = books.pagination;
    ctx.body = {
      status: "success",
      data: { books, paginationData }
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Извините, возникла ошибка."
    };
  }
});

router.get(`${BASE_URL}/book/:id`, async ctx => {
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
router.get(`/api/countries-languages`, async ctx => {
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
    const googlemymap = body.googleMyMaps || "";
    const urlObject = url.parse(googlemymap, true);
    const mid = urlObject.query && urlObject.query.mid;
    const moderated = /^checked-/gi.test(body.title) ? "true" : "false";
    const bookData = {
      book: {
        title: body.title.replace("checked-", ""),
        description: body.route,
        moderated: moderated
      },
      authors: (body.authors.replace(/\s\s+/g, " ") || "unknown")
        .split(",")
        .map(name => ({ name: name.trim() })),
      routes: mid
        ? await parser.getRoutesFromGmap(mid)
        : parser.getCustomRoutes(body.points),
      googleMyMaps: body.googleMyMaps
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

module.exports = router;
