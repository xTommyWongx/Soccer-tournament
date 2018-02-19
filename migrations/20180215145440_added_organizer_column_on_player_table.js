
exports.up = function(knex, Promise) {
    return knex.schema.table('players', (table) => {
        table.boolean('organizer');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('organizer', (table) => {
        table.dropColumn('organizer');
    })
};
