let booksData = [
  {
    book: {
      description:
        "Сборник представляет разные грани творчества знаменитого «черного юмориста». Американец ирландского происхождения, Данливи прославился в равной степени откровенностью интимного содержания и проникновенностью, психологической достоверностью даже самых экзотических ситуаций и персоналий. Это вакханалия юмора, подчас черного, эроса, подчас шокирующего, остроумия, подчас феерического, и лирики, подчас самой пронзительной. ",
      cover:
        "https://i.livelib.ru/boocover/1000089210/o/3ecb/Dzhejms_Patrik_Danlivi__Samyj_sumrachnyj_sezon_Semyuelya_S_sbornik.jpeg",
      title: "Самый сумрачный сезон Сэмюэля С.",
      isbn: "5-352-00963-7"
    },
    authors: [
      {
        avatar:
          "https://j.livelib.ru/auface/103113/140x140/bff9/Dzhejms_Patrik_Danlivi.jpg",
        name: "Джеймс Патрик Данливи"
      }
    ],
    routes: [
      {
        name: "Route1",
        path: [
          {
            name: "Point1",
            description: "Description text 123",
            lat: "10.876",
            lon: "-27.56",
            order: "1"
          },
          {
            name: "Point2",
            description: "Description text 321",
            lat: "-10.786",
            lon: "20.56",
            order: "2"
          }
        ]
      },
      {
        name: "Route500",
        path: [
          {
            name: "Point001",
            description: "Description text 00123",
            lat: "80.876",
            lon: "-24.560",
            order: "1"
          },
          {
            name: "Point002",
            description: "Description text 00321",
            lat: "-19.789",
            lon: "30.56",
            order: "2"
          }
        ]
      }
    ]
  },
  {
    book: {
      description:
        "Псевдоавтобиографическая постмодернистская поэма написана в 1969—1970 году и распространялась в самиздате. Впервые была опубликована летом 1973 года в Израиле в журнале «АМИ», вышедшем тиражом в 300 экземпляров; затем — в 1977 году в Париже. Поэма «Москва — Петушки» переведена на многие языки, по ней поставлены многочисленные спектакли.",
      cover:
        "https://upload.wikimedia.org/wikipedia/ru/thumb/7/73/Moscow_Petushki.jpg/200px-Moscow_Petushki.jpg",
      title: "Москва — Петушки",
      isbn: "978-5-389-03119-7"
    },
    authors: [
      {
        avatar:
          "https://upload.wikimedia.org/wikipedia/ru/thumb/f/f2/ErofeevV.jpg/200px-ErofeevV.jpg",
        name: "Венедикт Васильевич Ерофеев"
      }
    ],
    routes: [
      {
        name: "Route10",
        path: [
          {
            name: "Point1",
            description: "Description text 456",
            lat: "11.98",
            lon: "-21.543",
            order: "1"
          },
          {
            name: "Point2",
            description: "Description text 654",
            lat: "110.5",
            lon: "-210.23",
            order: "2"
          }
        ]
      }
    ]
  },
  {
    book: {
      description:
        "Tempor duis ut esse non culpa sunt excepteur. Consequat ipsum ipsum cillum culpa" +
        " officia incididunt nostrud incididunt anim duis et. Consequat ad magna nulla id" +
        " pariatur excepteur velit dolore ex labore ex non nostrud. Velit do ad fugiat ul" +
        "lamco adipisicing eiusmod non cupidatat proident enim. Nisi non elit cillum do e" +
        "lit sunt tempor irure anim non duis. Ea magna ipsum adipisicing consequat velit " +
        "non labore in aliqua quis. Labore occaecat incididunt quis sit nostrud ut et sun" +
        "t et ullamco consequat eiusmod aliquip aute.",
      cover: "http://placehold.it/200x320",
      title: "dolor Lorem",
      isbn: "3a804ac5-e1d1-4a07-923e-682043a9baca"
    },
    authors: [
      {
        avatar: "http://placehold.it/100x140",
        name: "perwasty ohlet"
      },
      {
        avatar: "http://placehold.it/100x140",
        name: "gatru fontate"
      }
    ],
    routes: [
      {
        name: "Route23",
        path: [
          {
            name: "Point15",
            description: "Description text 678",
            lat: "15",
            lon: "62",
            order: "1"
          },
          {
            name: "Point26",
            description: "Description text 453",
            lat: "15",
            lon: "70",
            order: "2"
          }
        ]
      }
    ]
  }
];

const createBook = (knex, book) => {
  return knex("books").insert(book, "id");
};
const selectAuthor = (knex, author) => {
  return knex("authors")
    .where({ name: author.name })
    .select("id");
};
const createAuthor = (knex, author) => {
  return knex("authors")
    .insert(author, "id")
    .catch(function() {
      return selectAuthor(knex, author);
    });
};
const createBookAuthor = (knex, bookId, authorId) => {
  return knex("authors_books").insert({
    book_id: bookId,
    author_id: authorId
  });
};
const createAuthors = (knex, Promise, authors) => {
  let promises = [];

  authors.forEach(author => {
    promises.push(createAuthor(knex, author));
  });
  return Promise.all(promises);
};

const createRoute = (knex, Promise, bookId, route) => {
  return knex("routes")
    .insert({ name: route.name, book_id: bookId }, "id")
    .then(routeId => {
      let promises = [];
      route.path.forEach(point => {
        promises.push(createPoint(knex, routeId[0], point));
      });
      return Promise.all(promises);
    });
};

const createPoint = (knex, routeId, point) => {
  return knex("points").insert(
    {
      name: point.name,
      route_id: routeId,
      order: parseInt(point.order),
      point: knex.raw(`Point(${point.lon}, ${point.lat})`),
      description: point.description
    },
    "id"
  );
};

const createBooks = (knex, Promise, bookData) => {
  return Promise.all([
    createBook(knex, bookData.book),
    createAuthors(knex, Promise, bookData.authors)
  ])
    .then(ids => {
      let promises = [];
      ids[1].forEach(authorId => {
        let authorIdVal =
          typeof authorId[0] === "object" && authorId[0].hasOwnProperty("id")
            ? authorId[0].id
            : authorId[0];
        promises.push(createBookAuthor(knex, ids[0][0], authorIdVal));
      });
      return [ids[0][0], Promise.all(promises)];
    })
    .then(data => {
      let promises = [];
      bookData.routes.forEach(route => {
        promises.push(createRoute(knex, Promise, data[0], route));
      });
      return Promise.all(promises);
    });
};

exports.seed = (knex, Promise) => {
  return knex("authors_books")
    .del()
    .then(() => knex("books").del())
    .then(() => knex("authors").del())
    .then(() => {
      let promises = [];

      booksData.forEach(bookData => {
        promises.push(createBooks(knex, Promise, bookData));
      });

      return Promise.all(promises);
    });
};
