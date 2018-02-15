exports.seed = (knex, Promise) => {
  return knex('authors')
    .del()
    .then(() => {
      return knex('authors').insert({avatar: "http://placehold.it/100x140", name: "gatru fontate"});
    })
    .then(() => {
      return knex('authors').insert({avatar: "http://placehold.it/100x140", name: "klomert pugnas"});
    })
    .then(() => {
      return knex('authors').insert({avatar: "http://placehold.it/100x140", name: "perwasty ohlet"});
    });
};
