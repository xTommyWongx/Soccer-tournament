exports.up = function(knex, Promise) {
    return knex.schema.createTable("numberOfPlayers",(table)=>{
        table.increments();
        table.integer("number");
        table.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("numberOfPlayers");
  };
  