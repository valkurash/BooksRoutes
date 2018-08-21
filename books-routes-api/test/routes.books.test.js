process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../src/server/index");
const knex = require("../src/server/db/connection");

describe("routes : books", function() {
  this.timeout(150000);

  beforeEach(function(done) {
    knex.migrate.rollback().then(function() {
      knex.migrate.latest().then(function() {
        return knex.seed.run().then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback().then(function() {
      done();
    });
  });

  describe("GET /api/books", () => {
    it("should return all books", done => {
      chai
        .request(server)
        .get("/api/books")
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "success"}
          res.body.status.should.eql("success");

          // the JSON response body should have a key-value pair of {"data": [num books
          // objects]}
          //res.body.data.length.should.eql(num);

          // the first object in the data array should have the right keys
          res.body.data[0].should.include.keys(
            "id",
            "title",
            "isbn",
            "cover",
            "description",
            "authors",
            "moderated",
            "litres",
            "ozon",
            "routes"
          );
          res.body.data[0]["authors"].length.should.eql(1);
          res.body.data[0]["authors"][0].should.include.keys(
            "id",
            "name",
            "avatar"
          );
          res.body.data[0]["routes"].length.should.eql(1);
          res.body.data[0]["routes"][0].should.include.keys(
            "id",
            "name",
            "book_id",
            "googlemymap",
            "countries",
            "languages"
          );
          res.body.data[0]["routes"][0]["countries"].length.should.eql(1);
          res.body.data[0]["routes"][0]["languages"].length.should.eql(1);
          done();
        });
    });
  });

  describe("GET /api/books/book/:id", () => {
    it("should respond with a single book", done => {
      chai
        .request(server)
        .get("/api/books/book/1")
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "success"}
          res.body.status.should.eql("success");
          // the JSON response body should have a key-value pair of {"data": 1 book
          // object}
          res.body.data.should.include.keys(
            "id",
            "title",
            "isbn",
            "cover",
            "description",
            "moderated",
            "litres",
            "ozon",
            "authors",
            "routes"
          );
          res.body.data["authors"].length.should.eql(1);
          res.body.data["authors"][0].should.include.keys(
            "id",
            "name",
            "avatar"
          );
          res.body.data["routes"].length.should.eql(1);
          res.body.data["routes"][0].should.include.keys(
            "id",
            "name",
            "book_id",
            "googlemymap",
            "points"
          );
          res.body.data["routes"][0]["points"].length.should.eql(9);
          res.body.data["routes"][0]["points"][0].should.include.keys(
            "id",
            "name",
            "route_id",
            "point",
            "order",
            "description"
          );
          done();
        });
    });

    it("should throw an error if the book does not exist", done => {
      chai
        .request(server)
        .get("/api/books/book/9999999")
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "error"}
          res.body.status.should.eql("error");
          // the JSON response body should have a key-value pair of {"message": "That book
          // does not exist."}
          res.body.message.should.eql("Такой книги не существует.");
          done();
        });
    });
  });

  describe("POST /api/book", () => {
    it("should return the book that was added", done => {
      chai
        .request(server)
        .post("/api/books")
        .send({
          title: "labore aute",
          authors: "Goble, Frank",
          route: "Secret path",
          googlemymap: "link",
          points: [
            {
              position: { lat: 45.55622355539127, lng: 41.59034374999999 },
              lat: 45.55622355539127,
              lng: 41.59034374999999,
              defaultAnimation: 0,
              key: 1530180716690,
              description: "point1 description"
            },
            {
              position: { lat: 49.92633568218444, lng: 72.00049999999999 },
              lat: 49.92633568218444,
              lng: 72.00049999999999,
              defaultAnimation: 0,
              key: 1530180732604,
              description: "point2 description"
            }
          ]
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 201 status code (indicating that something was "created")
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "success"}
          res.body.status.should.eql("success");
          // the JSON response body should have a key-value pair of {"data": 1 book
          // object}
          res.body.data.should.include.keys("id");
          done();
        });
    });

    it("should throw an error if the payload is malformed", done => {
      chai
        .request(server)
        .post("/api/books")
        .send({ description: "labore aute description" })
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 400 status code
          res.status.should.equal(400);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "error"}
          res.body.status.should.eql("error");
          // the JSON response body should have a message key
          should.exist(res.body.message);
          done();
        });
    });
  });

  describe("PUT /api/books", () => {
    it("should return the book that was updated", done => {
      knex("books")
        .select("*")
        .then(book => {
          const bookObject = book[0];
          chai
            .request(server)
            .put(`/api/books/${bookObject.id}`)
            .send({ isbn: "0000-0000-0000" })
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal("application/json");
              // the JSON response body should have a key-value pair of {"status": "success"}
              res.body.status.should.eql("success");
              // the JSON response body should have a key-value pair of {"data": 1 book
              // object}
              res.body.data[0].should.include.keys(
                "id",
                "title",
                "isbn",
                "cover",
                "description"
              );
              // ensure the book was in fact updated
              const newBookObject = res.body.data[0];
              newBookObject.isbn.should.not.eql(bookObject.isbn);
              done();
            });
        });
    });
    it("should throw an error if the book does not exist", done => {
      chai
        .request(server)
        .put("/api/books/book/9999999")
        .send({ isbn: "0000-0000-0000" })
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "error"}
          res.body.status.should.eql("error");
          // the JSON response body should have a key-value pair of {"message": "That book
          // does not exist."}
          res.body.message.should.eql("Такой книги не существует.");
          done();
        });
    });
  });

  describe("DELETE /api/books/book/:id", () => {
    it("should return the book that was deleted", done => {
      knex("books")
        .select("*")
        .then(books => {
          const bookObject = books[0];
          const lengthBeforeDelete = books.length;
          chai
            .request(server)
            .delete(`/api/books/book/${bookObject.id}`)
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal("application/json");
              // the JSON response body should have a key-value pair of {"status": "success"}
              res.body.status.should.eql("success");
              // the JSON response body should have a key-value pair of {"data": 1 book
              // object}
              res.body.data[0].should.include.keys(
                "id",
                "title",
                "isbn",
                "cover",
                "description"
              );
              // ensure the book was in fact deleted
              knex("books")
                .select("*")
                .then(updatedBooks => {
                  updatedBooks.length.should.eql(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });
    it("should throw an error if the book does not exist", done => {
      chai
        .request(server)
        .delete("/api/books/book/9999999")
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal("application/json");
          // the JSON response body should have a key-value pair of {"status": "error"}
          res.body.status.should.eql("error");
          // the JSON response body should have a key-value pair of {"message": "That book
          // does not exist."}
          res.body.message.should.eql("Такой книги не существует.");
          done();
        });
    });
  });
});
