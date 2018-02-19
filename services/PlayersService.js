const bcrypt = require('bcryptjs');

module.exports = class PlayerService {
    constructor(knex) {
        this.knex = knex;
    }
    create(user) {
        let self = this;
        let manager = false;
        let organizer = false;
        let player = false

        if (user.role === "manager") {
            manager = true;
        } else if (user.role === "organizer") {
            organizer = true;
        }else if (user.role === "player"){
            player = true;
        }

        return this.knex.select().from('players').where('email', user.email)
            .then((result) => {
                
                // email already in use
                if ( result.length > 0 ) {
                         let err = "emailExists";
                         return err;
                } else {
                
                    // encrypt the password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password , salt, (err, hash)=>{
                            if(err){
                                console.log('bcrypt err',err);
                                throw err;
                            }
                            user.password = hash;
                            
                            // save the new user in the db
                            return self.knex('players')
                            .returning('id')
                            .insert({
                                firstname: user.firstname,
                                lastname: user.lastname,
                                username: user.username,
                                email: user.email,
                                password: user.password,
                                location: user.location,
                                manager: manager,
                                organizer: organizer,
                                player: player
                            }).then((id)=>{
                                // console.log("result",id);
                            }).catch((err)=>console.log(err));
                        })
                    });
                    
                }
            })

    }
    delete(userId) {

    }
    // update Image
    update(user, image) {
         console.log("user,,",user);
            return this.knex('players')
                        .where('email',user.user.email)
                        .update({
                            img : image
                        })
                        .then(()=>{
                            if(user.user.team_id){
                                // if player has is in team join 'players' and 'teams' tables and return info
                                return this.knex('players').select().innerJoin('teams', 'players.team_id', 'teams.id')
                                       .where('email', user.user.email)
                            }else{
                                // if player is not in team return info from 'players' table
                                return this.knex('players').select().where('email',user.user.email);
                            }
                            
                        })
                        .catch((err) => {
                            console.log(err);
                        })
    }
    // list all players without team
    list() {
        return this.knex.select().from('players').where({
                                            player: true,
                                            team_id: null
                                        })
                                        .then((res)=>{
                                            // console.log("res",res[0]);
                                            return res;
                                        })
                                        .catch((err)=>console.log(err));
    }
    // list players which are in request table with same manager
    listrequestedplayers(team_id){
        return this.knex.select().from('requests').where('team_id',team_id)
                                .then((players)=>{
                                    return players;
                                })
                                .catch(err=>console.log(err));
    }

    exitTeam(email){
        console.log("leave team");
        // console.log(playerEmail);
        return this.knex('players').where('email',email)
                                    .update({
                                        team_id: null
                                    })
                                    .then((data)=>{
                                        return this.knex('players').select().where('email',email);
                                    })
                                    .catch(err=>console.log(err));
    }
    getSquad(team_id){
        return this.knex('players').where('team_id',team_id);
    }
    
}