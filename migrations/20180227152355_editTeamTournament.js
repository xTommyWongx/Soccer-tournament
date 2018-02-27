
exports.up = function(knex, Promise) {
  return knex.schema.table('teams',(table)=>{
      table.integer('manager_id').unsigned();
      table.foreign('manager_id').references('players.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('teams',(table)=>{
    table.dropForeign('manager_id');
    table.dropColumn('manager_id');
  })
};
