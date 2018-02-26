
exports.up = function(knex, Promise) {
  return knex.schema.table('requestTournament',(table)=>{
      table.string('tournament_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('requestTournament',(table)=>{
      table.dropColumn('tournament_name');
  })
};
