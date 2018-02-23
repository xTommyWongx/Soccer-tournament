
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('numberOfPlayers').del()
    .then(function () {
      // Inserts seed entries
      return knex('numberOfPlayers').insert([
        {id: 1, number: '6'},
        {id: 2, number: '7'},
        {id: 3, number: '9'},
        {id: 4, number: '11'},
      ]);
    });
};
