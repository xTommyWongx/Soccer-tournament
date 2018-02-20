  exports.up = function(knex, Promise) {
    return knex.schema.createTable("tournamnets_dates_locations",(table)=>{
        table.increments();
        table.date("date");
        table.string("location");
        table.integer("tournament_id").unsigned();
        table.foreign("tournament_id").references("tournaments.id");
        table.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("tournamnets_dates_locations");
  };
  