
exports.up = function(knex, Promise) {
  return knex.schema.table('requests',(table)=>{
      table.string("teamName");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('request',(table)=>{
      table.dropColumn("teamName");
  })
};
