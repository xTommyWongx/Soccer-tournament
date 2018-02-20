exports.up = function(knex, Promise) {
    return knex.schema.createTable("numberOfPlayer",(numberOfPlayerTable)=>{
        numberOfPlayerTable.increments();
        numberOfPlayerTable.integer("number");
        numberOfPlayerTable.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("numberOfPlayer");
  };
  