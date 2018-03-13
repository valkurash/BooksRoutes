process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : books', function () {
  this.timeout(15000);

  beforeEach(function (done) {
    knex
      .migrate
      .rollback()
      .then(function () {
        knex
          .migrate
          .latest()
          .then(function () {
            return knex
              .seed
              .run()
              .then(function () {
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    knex
      .migrate
      .rollback()
      .then(function () {
        done();
      });
  });

  describe('GET /api/v1/books', () => {
    it('should return all books', (done) => {
      chai
        .request(server)
        .get('/api/v1/books')
        .end((err, res) => {
          // there should be no errors
          should
            .not
            .exist(err);
          // there should be a 200 status code
          res
            .status
            .should
            .equal(200);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "success"}
          res
            .body
            .status
            .should
            .eql('success');
          // the JSON response body should have a key-value pair of {"data": [3 books
          // objects]}
          res
            .body
            .data
            .length
            .should
            .eql(3);
          // the first object in the data array should have the right keys
          res
            .body
            .data[0]
            .should
            .include
            .keys('id', 'title', 'isbn', 'cover', 'description', 'authors');
          done();
        });
    });
  });

  describe('GET /api/v1/books/:id', () => {
    it('should respond with a single book', (done) => {
      chai
        .request(server)
        .get('/api/v1/books/1')
        .end((err, res) => {
          // there should be no errors
          should
            .not
            .exist(err);
          // there should be a 200 status code
          res
            .status
            .should
            .equal(200);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "success"}
          res.body.status.should.eql("success");
          // the JSON response body should have a key-value pair of {"data": 1 book object}
          res.body.data.should.include.keys(
            "id",
            "title",
            "isbn",
            "cover",
            "description",
            "authors",
            "routes"
          );
          res.body.data["authors"].length.should.eql(2);
          res.body.data["authors"][0].should.include.keys(
            "id",
            "name",
            "avatar"
          );
          res.body.data["routes"].length.should.eql(1);
          res.body.data["routes"][0].should.include.keys(
            "id",
            "name",
            "book_id"
          );
          res.body.data["routes"][0]["points"].length.should.eql(2);
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

    it('should throw an error if the book does not exist', (done) => {
      chai
        .request(server)
        .get('/api/v1/books/9999999')
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res
            .status
            .should
            .equal(404);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "error"}
          res
            .body
            .status
            .should
            .eql('error');
          // the JSON response body should have a key-value pair of {"message": "That book
          // does not exist."}
          res
            .body
            .message
            .should
            .eql('That book does not exist.');
          done();
        });
    });
  });

  describe('POST /api/v1/book', () => {
    it('should return the book that was added', (done) => {
      chai
        .request(server)
        .post('/api/v1/books')
        .send({
          title: 'labore aute',
          isbn: '2a425443-3b22-4340-8560-38d304b7b39b',
          cover: 'http://placehold.it/100x140',
          description: 'Consectetur nostrud ad eu culpa non labore eu sint anim exercitation in est moll' +
              'it. Magna Lorem ullamco consectetur enim incididunt ea sint nulla cupidatat ipsu' +
              'm dolore nulla. Veniam voluptate exercitation ipsum nulla ex minim exercitation.' +
              ' Commodo fugiat sunt dolor irure dolor magna non elit commodo.'
        })
        .end((err, res) => {
          // there should be no errors
          should
            .not
            .exist(err);
          // there should be a 201 status code (indicating that something was "created")
          res
            .status
            .should
            .equal(201);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "success"}
          res
            .body
            .status
            .should
            .eql('success');
          // the JSON response body should have a key-value pair of {"data": 1 book
          // object}
          res
            .body
            .data[0]
            .should
            .include
            .keys('id', 'title', 'isbn', 'cover', 'description');
          done();
        });
    });

    it('should throw an error if the payload is malformed', (done) => {
      chai
        .request(server)
        .post('/api/v1/books')
        .send({description: 'labore aute description'})
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 400 status code
          res
            .status
            .should
            .equal(400);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "error"}
          res
            .body
            .status
            .should
            .eql('error');
          // the JSON response body should have a message key
          should.exist(res.body.message);
          done();
        });
    });
  });

  describe('PUT /api/v1/books', () => {
    it('should return the book that was updated', (done) => {
      knex('books')
        .select('*')
        .then((book) => {
          const bookObject = book[0];
          chai
            .request(server)
            .put(`/api/v1/books/${bookObject.id}`)
            .send({isbn: '0000-0000-0000'})
            .end((err, res) => {
              // there should be no errors
              should
                .not
                .exist(err);
              // there should be a 200 status code
              res
                .status
                .should
                .equal(200);
              // the response should be JSON
              res
                .type
                .should
                .equal('application/json');
              // the JSON response body should have a key-value pair of {"status": "success"}
              res
                .body
                .status
                .should
                .eql('success');
              // the JSON response body should have a key-value pair of {"data": 1 book
              // object}
              res
                .body
                .data[0]
                .should
                .include
                .keys('id', 'title', 'isbn', 'cover', 'description');
              // ensure the book was in fact updated
              const newBookObject = res.body.data[0];
              newBookObject
                .isbn
                .should
                .not
                .eql(bookObject.isbn);
              done();
            });
        });
    });
    it('should throw an error if the book does not exist', (done) => {
      chai
        .request(server)
        .put('/api/v1/books/9999999')
        .send({isbn: '0000-0000-0000'})
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res
            .status
            .should
            .equal(404);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "error"}
          res
            .body
            .status
            .should
            .eql('error');
          // the JSON response body should have a key-value pair of {"message": "That book
          // does not exist."}
          res
            .body
            .message
            .should
            .eql('That book does not exist.');
          done();
        });
    });
  });

  describe('DELETE /api/v1/books/:id', () => {
    it('should return the book that was deleted', (done) => {
      knex('books')
        .select('*')
        .then((books) => {
          const bookObject = books[0];
          const lengthBeforeDelete = books.length;
          chai
            .request(server)
            .delete(`/api/v1/books/${bookObject.id}`)
            .end((err, res) => {
              // there should be no errors
              should
                .not
                .exist(err);
              // there should be a 200 status code
              res
                .status
                .should
                .equal(200);
              // the response should be JSON
              res
                .type
                .should
                .equal('application/json');
              // the JSON response body should have a key-value pair of {"status": "success"}
              res
                .body
                .status
                .should
                .eql('success');
              // the JSON response body should have a key-value pair of {"data": 1 book
              // object}
              res
                .body
                .data[0]
                .should
                .include
                .keys('id', 'title', 'isbn', 'cover', 'description');
              // ensure the book was in fact deleted
              knex('books')
                .select('*')
                .then((updatedBooks) => {
                  updatedBooks
                    .length
                    .should
                    .eql(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });
    it('should throw an error if the book does not exist', (done) => {
      chai
        .request(server)
        .delete('/api/v1/books/9999999')
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res
            .status
            .should
            .equal(404);
          // the response should be JSON
          res
            .type
            .should
            .equal('application/json');
          // the JSON response body should have a key-value pair of {"status": "error"}
          res
            .body
            .status
            .should
            .eql('error');
          // the JSON response body should have a key-value pair of {"message": "That book
          // does not exist."}
          res
            .body
            .message
            .should
            .eql('That book does not exist.');
          done();
        });
    });
  });
});
