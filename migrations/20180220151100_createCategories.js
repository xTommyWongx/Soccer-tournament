exports.up = function(knex, Promise) {
    return knex.schema.createTable("categories",(categoriesTable)=>{
        categoriesTable.increments();
        categoriesTable.string("name");
        categoriesTable.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("categories");
  };
  