exports.up = function(knex, Promise) {
    return knex.schema.createTable("tournaments",(table)=>{
        table.increments();
        table.integer("category_id").unsigned();
        table.foreign("category_id").references("categories.id");
        table.integer("number_of_teams");
        table.integer("number_of_player_id").unsigned();
        table.foreign("number_of_player_id").references("numberOfPlayers.id");
        table.integer("organizer_id").unsigned();
        table.foreign("organizer_id").references("players.id");
        table.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("tournaments");
    
  };
  
