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

module.exports = router;