const express = require('express');
let sess = require('../ViewRouter').sess; //custom session


module.exports = class RequesRouter {
    constructor(requestService){
        this.requestService = requestService;
    }
    router(){
        let router = express.Router();
        router.post('/sendRequest',this.sendrequest.bind(this));
        router.post('/cancelRequest',this.cancelrequest.bind(this));
        router.post('/accept',this.accept.bind(this));//accept request
        router.post('/reject',this.reject.bind(this));//reject request
        
        return router;
    }
    cancelrequest(req,res){
        console.log("cancel,,,",req.user.user.username);
                                                // manager name        , player email
        return this.requestService.cancelRequest(req.user.user.username,req.body.player)
                    .then(()=>{
                        res.send();
                    }).catch(err=>console.log(err));
    }
    sendrequest(req, res){
        console.log("send request ",req.user.user.username);
        return this.requestService.sendRequest(req.body.player,req.user.user.team_id,                                                   req.user.user.username,req.user.user.teamname)
                .then(()=>{         
                    res.send();
                })
                .catch((err)=>{
                    console.log(err);
                })           
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