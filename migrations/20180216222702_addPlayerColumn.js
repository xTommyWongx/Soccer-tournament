
exports.up = function(knex, Promise) {
  return knex.schema.table('players',(table)=>{
      table.boolean('player');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('players',(table)=>{
      table.dropColumn('player');
  })
};
