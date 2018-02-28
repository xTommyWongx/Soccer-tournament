
exports.up = function(knex, Promise) {
  return knex.schema.table('matches',(table)=>{
      table.dropColumn('teamA');
      table.dropColumn('teamB');
     
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('matches',(table)=>{
      table.integer('teamA');
      table.integer('teamB');
      
  })
};
