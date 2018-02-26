

module.exports = class ManagerService {
    constructor(knex){
        this.knex = knex;
    }
    createTeam(teamname, managerId){
        console.log("create team ", teamname);
        // check if the teanname is already in user
        return this.knex.select().from('teams').where('teamname',teamname.name)
                    .then((res)=>{
                        if(res.length > 0){
                            let err = "Name in use"
                            return err;
                        }
                        // create new team
                        return this.knex('teams')
                                    .returning('id')
                                    .insert({
                                        teamname: teamname.name
                                    }).then((id)=>{
                                    //  assign newly created team to manager
                                        return this.knex('players')
                                                    .where('id',managerId)
                                                    .update({
                                                        team_id: id[0]
                                                    });
                                    });
                                        
                        
                            
                    })
                    .catch(err=>console.log(err));   
    }

    getDetails(managerEmail){
        return this.knex.select().from('players')
                    .innerJoin('teams','players.team_id','teams.id')
                    .where('email',managerEmail)
                    .then((data)=>{
                        return data;
                    }).catch(err => console.log(err));
    }
    req_to_join_tournament(teamname,team_id,tournament_id,organizer_id,tournament_name){
        return this.knex('requestTournament').insert({
                                                        teamname: teamname,
                                                        team_id: team_id,
                                                        tournament_id: tournament_id,
                                                        organizer_id: organizer_id,
                                                        tournament_name: tournament_name
                                                    });
    }
    cancel_join_tournament(team_id,tournament_id){
        return this.knex('requestTournament').where({
                team_id: team_id,
                tournament_id: tournament_id
            }).del();
    }
}