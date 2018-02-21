
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'league'},
        {id: 2, name: 'knockout'},
        {id: 3, name: 'league and knockout'}
      ]);
    });
};
