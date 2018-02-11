
exports.up = function(knex, Promise) {
  return knex.schema.table('players', (table) => {
      table.string('facebook_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('players', (table) => {
      table.dropColumn('facebook_id');
  })
};
