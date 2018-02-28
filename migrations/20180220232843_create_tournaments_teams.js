exports.up = function(knex, Promise) {
    return knex.schema.createTable("tournamnets_teams",(table)=>{
        table.increments();
        table.integer("tournament_id").unsigned();
        table.foreign("tournament_id").references("tournaments.id");
        table.integer("team_id").unsigned();
        table.foreign("team_id").references("teams.id");
        table.timestamps(false,true);
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable("tournamnets_teams");
  };
  