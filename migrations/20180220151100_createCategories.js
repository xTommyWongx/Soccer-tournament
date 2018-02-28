exports.up = function(knex, Promise) {
    return knex.schema.createTable("categories",(table)=>{
        table.increments();
        table.string("name");
        table.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("categories");
  };
  