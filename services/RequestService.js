
module.exports = class RequestService {
    constructor(knex){
        this.knex = knex;
    }
    sendRequest(player, team_id, manager ){
         return this.knex('requests').insert({
                                managerName: manager,
                                playerEmail: player,
                                team_id: team_id
                            });
                        
    }
}