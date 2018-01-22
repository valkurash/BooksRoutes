
exports.seed = (knex, Promise) => {
  return knex('books').del()
  .then(() => {
    return knex('books').insert({
      description: "Occaecat nulla nostrud est aliqua eu culpa pariatur aliqua velit sint irure nostrud. Esse fugiat cillum ut velit sit occaecat eu ut id pariatur nulla. Ipsum incididunt qui veniam ut. Cillum commodo qui reprehenderit laborum aliquip minim exercitation ea nostrud ut.",
      cover: "http://placehold.it/100x140",
      title: "labore aliqua",
      isbn: "2f55c88b-f0b9-47e7-9c54-905609d21260"
    });
  })
  .then(() => {
    return knex('books').insert({
      description: "Eu dolore officia mollit do minim fugiat duis. Elit adipisicing eiusmod amet occaecat aute reprehenderit veniam do sit sint fugiat velit. Amet id magna officia id labore aliqua ex mollit ad culpa. Non consectetur sint consequat aliquip culpa Lorem enim consequat. Occaecat ad commodo qui ea ex. Nostrud dolore aliqua culpa ut nulla laboris laborum dolore in dolore voluptate.",
      cover: "http://placehold.it/100x140",
      title: "dolor Lorem",
      isbn: "d4695540-5228-4276-8eee-6c3c895a841b"
    });
  })
  .then(() => {
    return knex('books').insert({
      description: "Tempor duis ut esse non culpa sunt excepteur. Consequat ipsum ipsum cillum culpa officia incididunt nostrud incididunt anim duis et. Consequat ad magna nulla id pariatur excepteur velit dolore ex labore ex non nostrud. Velit do ad fugiat ullamco adipisicing eiusmod non cupidatat proident enim. Nisi non elit cillum do elit sunt tempor irure anim non duis. Ea magna ipsum adipisicing consequat velit non labore in aliqua quis. Labore occaecat incididunt quis sit nostrud ut et sunt et ullamco consequat eiusmod aliquip aute.",
      cover: "http://placehold.it/100x140",
      title: "enim nostrud",
      isbn: "3a804ac5-e1d1-4a07-923e-682043a9baca"
    });
  });
};
