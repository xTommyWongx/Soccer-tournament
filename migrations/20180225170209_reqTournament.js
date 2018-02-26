
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requestTournament',(table)=>{
      table.increments();
      table.integer('tournament_id');
      table.integer('team_id');
      table.string('teamname');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requestTournament');
};
