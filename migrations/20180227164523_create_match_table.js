exports.up = function(knex, Promise) {
    return knex.schema.createTable("matches",(table)=>{
        table.increments();
        table.integer('matchID');
        table.integer('teamA');
        table.integer('teamB');
        table.integer("tournament_id").unsigned();
        table.foreign("tournament_id").references("tournaments.id");
        table.integer("tournamnets_dates_locations_id").unsigned();
        table.foreign("tournamnets_dates_locations_id").references("tournamnets_dates_locations.id");
        table.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("matches");
  };
  