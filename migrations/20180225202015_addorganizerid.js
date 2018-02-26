
exports.up = function(knex, Promise) {
  return knex.schema.table('requestTournament',(table)=>{
      table.integer('organizer_id').unsigned();
      table.foreign('organizer_id').references('players.id');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('requestTournament',(table)=>{
        table.dropForeign('organizer_id');
        table.dropColumn('organizer_id');
    })
  
};
