

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
                        }else {
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
                                        
                        }
                            
                    })
                    .catch(err=>console.log(err));
        
    }
}