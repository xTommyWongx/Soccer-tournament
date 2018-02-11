
exports.up = function(knex, Promise) {
  return knex.schema.createTable("players",(playersTable)=>{
      playersTable.increments();
      playersTable.string("firstname");
      playersTable.string("lastname");
      playersTable.string("username");
      playersTable.string("password");
      playersTable.string("email");
      playersTable.string("location");
      playersTable.integer("team_id").unsigned();
      playersTable.foreign("team_id").references("teams.id");
      playersTable.timestamps(false,true);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("players");
  
};
