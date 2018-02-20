exports.up = function(knex, Promise) {
    return knex.schema.createTable("tournaments",(tournamentsTable)=>{
        tournamentsTable.increments();
        tournamentsTable.integer("category_id").unsigned();
        tournamentsTable.foreign("category_id").references("categories.id");
        tournamentsTable.integer("number_of_team");
        tournamentsTable.integer("number_of_player").unsigned();
        tournamentsTable.foreign("number_of_player").references("numberOfPlayer.id");
        tournamentsTable.integer("organizer_id").unsigned();
        tournamentsTable.foreign("organizer_id").references("players.id");
        tournamentsTable.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("tournaments");
    
  };
  