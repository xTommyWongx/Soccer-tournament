
exports.up = function(knex, Promise) {
    return knex.schema.table('tournaments',(table)=>{
        table.string('tournamentName');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('tournamentName',(table)=>{
        table.dropColumn('name');
    })
  };
  