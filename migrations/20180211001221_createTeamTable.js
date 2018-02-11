
exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams",(teamsTable) => {
      teamsTable.increments();
      teamsTable.string("teamname");
      teamsTable.integer("numberOfPlayers");
      teamsTable.string("logo");
      teamsTable.timestamps(false,true);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("Teams");
};
