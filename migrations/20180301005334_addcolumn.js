
exports.up = function(knex, Promise) {
  return knex.schema.table('matches',(table)=>{
    table.string('teamA');
    table.string('teamB');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('matches',(table)=>{
      table.dropColumn('teamA');
      table.dropColumn('teamB');
  })
};
