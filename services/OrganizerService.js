module.exports = class OrganizerService {
    constructor(knex){
        this.knex = knex;
    }
    create(tournament, organizerID){
        return this.knex('tournaments').insert({
            category_id: tournament.category,
            number_of_teams: tournament.numberOfTeam,
            number_of_player_id: tournament.numberOfPlayer,
            organizer_id: organizerID
            }, 'id')
                // insert tournaments id to tournaments_teams join table
                .then((id) => { 
                    return this.knex('tournamnets_teams').insert({ tournament_id: id[0] }, 'tournament_id');
                })
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
    delete(tournamentID){

    }
    update(tournamentID,newTournament){

    }
    list(){
        
    }
}