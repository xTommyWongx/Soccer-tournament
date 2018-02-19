const express = require('express');
let sess = require('../ViewRouter').sess; //custom session


module.exports = class RequesRouter {
    constructor(requestService){
        this.requestService = requestService;
    }
    router(){
        let router = express.Router();

        router.post('/accept',this.accept.bind(this));//accept request
        router.post('/reject',this.reject.bind(this));//reject request
        
        return router;
    }
    
   
    accept(req, res){
        console.log("req.body",req.body);       //player                join this team
        return this.requestService.acceptRequest(req.user.user.email, req.body.team_id)
                    .then((data)=>{// clear requests
                        return this.requestService.clearRequest(req.user.user.email);
                    })
                    .then((response)=>{// get updated user info
                        return this.requestService.getPlayerInfo(req.user.user.email);
                    })
                    .then((data)=>{ // update user
                        req.session.passport.user.user = data[0];
                        res.redirect('/dashboard');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
    }
    reject(req, res){
        console.log("reject");
        console.log(req.body);
        return this.requestService.rejectRequest(req.body.team_id, req.body.playerEmail)
                    .then((data)=>{
                        res.render('dashboard');
                        
                    })
                    .catch(err=>console.log(err));
    }
}