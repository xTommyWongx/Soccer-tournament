
module.exports = class OrganizerService {
    constructor(knex){
        this.knex = knex;
    }
    create(tournament, organizerID){
        return this.knex('tournaments').select().where('tournamentName', tournament.nameOfTournament)
            .then((result) => {
                // check if tournament name exists
                if ( result.length > 0 ) {
                    let err = "Tournament name already in use!";
                    throw err;
                } else {
                    return this.knex('tournaments').insert({
                        tournamentName: tournament.nameOfTournament,
                        category_id: tournament.category,
                        number_of_teams: tournament.numberOfTeam,
                        number_of_player_id: tournament.numberOfPlayer,
                        prize: tournament.prize,
                        organizer_id: organizerID
                        }, 'id')
                            // insert tournaments id to tournaments_teams join table
                            // .then((id) => { 
                            //     return this.knex('tournamnets_teams').insert({ tournament_id: id[0] }, 'tournament_id');
                            // })
                            // insert date, location and tournament_id to tournaments_dates_locations join table            
                            .then((id) => {
                                return this.knex('tournamnets_dates_locations').insert({
                                    date: tournament.date,
                                    location: tournament.location,
                                    tournament_id: id[0]
                                });   
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                }
            })
    }
    delete(req){
        return this.knex('tournamnets_teams').where('tournamnets_teams.tournament_id', req.params.id)
            // check if there is tournament_id on tournaments_teams table
            .then((result) => {
                if (result.length > 0) {
                    return this.knex('tournamnets_teams')
                        .where('tournamnets_teams.tournament_id', req.params.id)
                        .del();
                }

                return;
            })
            // delete tournament_id on tournaments_dates_locations table
            .then(() => {
                return this.knex('tournamnets_dates_locations')
                    .where('tournamnets_dates_locations.tournament_id', req.params.id)
                    .del();
            })
            // delete tournament on tournament table
            .then(() => {
                return this.knex('tournaments')
                    .where('tournaments.id', req.params.id)
                    .del();
            })
            .catch((err) => console.loog(err));
    }
    update(req){
        return this.knex('tournaments')
                .where('tournaments.tournamentName', req.body.nameOfTournament)
                .whereNot('tournaments.id', req.params.id)
                .then((result) => {
                    if (result.length > 0) {
                        let err = "Tournament name already in use!";
                        throw err;
                    } else {
                        return this.knex('tournaments').where('tournaments.id', req.params.id)
                            //update tournament table
                            .update({
                                tournamentName: req.body.nameOfTournament,
                                category_id: req.body.category,
                                number_of_teams: req.body.numberOfTeam,
                                number_of_player_id: req.body.numberOfPlayer,
                                prize: req.body.prize,
                            })
                            //update date, location to tournaments_dates_locations join table            
                            .then(() => {
                                return this.knex('tournamnets_dates_locations').where('tournament_id', req.params.id)
                                    .update({
                                        date: req.body.date,
                                        location: req.body.location
                                    })
                            })
                    }
        })
    }
    list(req, res){
        if (req.user.user.organizer) {
            return this.knex('players').select().where('email', req.user.user.email)
                .then((organizer) => {
                    return this.knex('tournaments').select()
                        .where('tournaments.id', req.params.id)
                        .innerJoin('categories', 'tournaments.category_id', 'categories.id')
                        .innerJoin('numberOfPlayers', 'tournaments.number_of_player_id', 'numberOfPlayers.id')
                        .innerJoin('tournamnets_dates_locations', 'tournaments.id', 'tournamnets_dates_locations.tournament_id')
                    })
                .catch((err) => console.log(err));
            }
        }
    accept(team_id,tournament_id){
        return this.knex('tournamnets_teams').insert({
            team_id: team_id,
            tournament_id: tournament_id
        });
    }
    deleteRequests(team_id, tournament_id){
        return this.knex('requestTournament')
                    .where({
                        team_id: team_id,
                        tournament_id: tournament_id
                    }).del();
    }
    createFixture(body){
        let rows = [{
            teamA: body.A,
            teamB: body.B,
            tournament_id: body.tournament_id
        },{
            teamA: body.C,
            teamB: body.D,
            tournament_id: body.tournament_id
        },{
            teamA: body.E,
            teamB: body.F,
            tournament_id: body.tournament_id
        },{
            teamA: body.G,
            teamB: body.H,
            tournament_id: body.tournament_id
        }];
        let chunksize = 10;
        return this.knex.batchInsert('matches',rows,chunksize);

    }
}