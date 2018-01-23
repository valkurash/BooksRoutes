const Router = require('koa-router');
const queries = require('../db/queries/books');

const router = new Router();
const BASE_URL = `/api/v1/books`;

router.get(BASE_URL, async (ctx) => {
  try {
    const books = await queries.getAllBooks();
    ctx.body = {
      status: 'success',
      data: books
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const book = await queries.getSingleBook(ctx.params.id);
    if (book.length) {
      ctx.body = {
        status: 'success',
        data: book
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That book does not exist.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const book = await queries.addBook(ctx.request.body);
    if (book.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: book
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const book = await queries.updateBook(ctx.params.id, ctx.request.body);
    if (book.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: book
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That book does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const book = await queries.deleteBook(ctx.params.id);
    if (book.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: book
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That book does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

module.exports = router;