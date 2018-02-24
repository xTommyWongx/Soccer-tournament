
exports.up = function(knex, Promise) {
  return knex.schema.table('tournaments',(table)=>{
      table.string("prize");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tournaments',(table)=>{
      table.dropColumn("prize");
  })
};
