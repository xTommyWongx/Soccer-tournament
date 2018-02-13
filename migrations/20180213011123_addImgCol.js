
exports.up = function(knex, Promise) {
    return knex.schema.table('players', (table) => {
        table.string('img');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('players', (table) => {
        table.dropColumn('img');
    })
};
