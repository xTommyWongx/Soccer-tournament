
exports.up = function(knex, Promise) {
  return knex.schema.table('players', (table) => {
      table.boolean('manager');
      table.decimal('weight');
      table.decimal('height');
      table.string('position');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('players', (table) => {
      table.dropColumn('manager');
      table.dropColumn('weight');
      table.dropColumn('height');
      table.dropColumn('position');
  })
};
