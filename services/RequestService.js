
module.exports = class RequestService {
    constructor(knex){
        this.knex = knex;
    }
    sendRequest(player, team_id, manager,teamName ){
         return this.knex('requests').insert({
                                managerName: manager,
                                playerEmail: player,
                                team_id: team_id,
                                teamName: teamName
                            });                    
    }
    acceptRequest(playerEmail, teamId){
        return this.knex('players')
                    .where('email',playerEmail)
                    .update({
                        team_id: teamId
                    });
    }
    clearRequest(playerEmail){
        return this.knex('requests')
                    .where('playerEmail', playerEmail)
                    .del();
    }
}