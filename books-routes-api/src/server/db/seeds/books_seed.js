let booksData = [
  {
    book: {
      description: "Occaecat nulla nostrud est aliqua eu culpa pariatur aliqua velit sint irure nost" +
          "rud. Esse fugiat cillum ut velit sit occaecat eu ut id pariatur nulla. Ipsum inc" +
          "ididunt qui veniam ut. Cillum commodo qui reprehenderit laborum aliquip minim ex" +
          "ercitation ea nostrud ut.",
      cover: "http://placehold.it/100x140",
      title: "labore aliqua",
      isbn: "2f55c88b-f0b9-47e7-9c54-905609d21260"
    },
    author: {
      avatar: "http://placehold.it/100x140",
      name: "gatru fontate"
    }
  }, {
    book: {
      description: "Eu dolore officia mollit do minim fugiat duis. Elit adipisicing eiusmod amet occ" +
          "aecat aute reprehenderit veniam do sit sint fugiat velit. Amet id magna officia " +
          "id labore aliqua ex mollit ad culpa. Non consectetur sint consequat aliquip culp" +
          "a Lorem enim consequat. Occaecat ad commodo qui ea ex. Nostrud dolore aliqua cul" +
          "pa ut nulla laboris laborum dolore in dolore voluptate.",
      cover: "http://placehold.it/100x140",
      title: "dolor Lorem",
      isbn: "d4695540-5228-4276-8eee-6c3c895a841b"
    },
    author: {
      avatar: "http://placehold.it/100x140",
      name: "klomert pugnas"
    }
  }, {
    book: {
      description: "Tempor duis ut esse non culpa sunt excepteur. Consequat ipsum ipsum cillum culpa" +
          " officia incididunt nostrud incididunt anim duis et. Consequat ad magna nulla id" +
          " pariatur excepteur velit dolore ex labore ex non nostrud. Velit do ad fugiat ul" +
          "lamco adipisicing eiusmod non cupidatat proident enim. Nisi non elit cillum do e" +
          "lit sunt tempor irure anim non duis. Ea magna ipsum adipisicing consequat velit " +
          "non labore in aliqua quis. Labore occaecat incididunt quis sit nostrud ut et sun" +
          "t et ullamco consequat eiusmod aliquip aute.",
      cover: "http://placehold.it/100x140",
      title: "enim nostrud",
      isbn: "3a804ac5-e1d1-4a07-923e-682043a9baca"
    },
    author: {
      avatar: "http://placehold.it/100x140",
      name: "perwasty ohlet"
    }
  }
];

const createBook = (knex, book) => {
  return knex('books').insert(book, 'id');
};
const createAuthor = (knex, author) => {
  return knex('authors').insert(author, 'id');
};
const createBookAuthor = (knex, bookData) => {
  return Promise.all([
    createBook(knex, bookData.book),
    createAuthor(knex, bookData.author)
  ]).then(ids => {
    return knex('books_authors').insert({book_id: ids[0][0], author_id: ids[1][0]
    })
  });
};
exports.seed = (knex, Promise) => {
  return knex('books_authors')
    .del()
    .then(() => knex('books').del())
    .then(() => knex('authors').del())
    .then(() => {
      let promises = [];

      booksData.forEach(bookData => {
        promises.push(createBookAuthor(knex, bookData));
      });

      return Promise.all(promises);
    })
};