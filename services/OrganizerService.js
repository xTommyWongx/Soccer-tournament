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
            .then((id) => {
                
            })
    }
    delete(tournamentID){

    }
    update(tournamentID,newTournament){

    }
    list(){
        
    }
}