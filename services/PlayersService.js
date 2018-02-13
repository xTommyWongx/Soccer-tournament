const bcrypt = require('bcryptjs');

module.exports = class PlayerService {
    constructor(knex) {
        this.knex = knex;
    }
    create(user) {
        let self = this;
        return this.knex.select('id').from('players').where('email', user.email)
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
                                firstname: user.firstName,
                                lastname: user.lastName,
                                username: user.username,
                                email: user.email,
                                password: user.password,
                                location: user.location
                            }).then((id)=>{
                                console.log("result",id);
                            }).catch((err)=>console.log(err));
                        })
                    });
                    
                }
            })

    }
    delete(userId) {

    }
    update(user, image) {
         console.log("user,,",user);
            return this.knex('players')
                        .where('email',user.user.email)
                        .update({
                            img : image
                        })
                        .then(()=>{
                            return this.knex.select().from('players')
                                    .where('email', user.user.email)
                                    // .then((user)=>{
                                    //     console.log("users ",user[0]);
                                    //     return user;
                                    // })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
    }
    list() {

    }
}