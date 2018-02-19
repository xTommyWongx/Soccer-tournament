
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests',(table) => {
      table.increments();
      table.string('managerName');
      table.string('playerEmail');
      table.integer('team_id');
      table.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('requests');
};
