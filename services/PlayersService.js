const bcrypt = require('bcryptjs');

module.exports = class PlayerService {
    constructor(knex) {
        this.knex = knex;
    }
    create(user) {
        let self = this;
        return this.knex.select('id').from('players').where('email', user.email)
            .then((result) => {
                
                console.log(result);
                console.log("result,",result.length);
                if ( result.length > 0 ) {
                         let err = "emailExists";
                         return err;
                } else {
                    console.log("create user");
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password , salt, (err, hash)=>{
                            if(err){
                                console.log('bcrypt err',err);
                                throw err;
                            }
                            user.password = hash;
                            console.log(user.password);
                            return self.knex('players').insert({
                                firstname: user.firstName,
                                lastname: user.lastName,
                                username: user.username,
                                email: user.email,
                                password: user.password,
                                location: user.location
                            }).then((result)=>{
                                console.log(result);
                            }).catch((err)=>console.log(err));
                        })
                    });
                    
                }
            })

    }
    delete(userId) {

    }
    update(userId, newUser) {

    }
    list() {

    }
}