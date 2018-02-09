
exports.up = function(knex, Promise) {
    return knex.schema.createTable('players',(table)=>{
        table.increments();
        table.string("name");
        table.string("password");
        table.string("email");
        table.integer("age");
        table.string("image");
        table.integer("phone");
        table.timestamps(false,true);
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('players');
};
