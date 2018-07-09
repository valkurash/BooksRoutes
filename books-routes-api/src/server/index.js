const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const prerender = require("koa-prerender");

// Options
const options = {
  //prerender: PRERENDER_SERVER_URL, // optional, default:'http://service.prerender.io/'
  protocol: "http", // optional, default: this.protocol
  host: "booksroutes.info", // optional, default: this.host,
  prerenderToken: "OG6U91hdKwZLIKicK00e" // optional or process.env.PRERENDER_TOKEN
};

const indexRoutes = require("./routes/index");
const booksRoutes = require("./routes/books");

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());

//app.use(prerender(options));

app.use(
  cors({
    origin: "*"
  })
);
app.use(indexRoutes.routes());
app.use(booksRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
