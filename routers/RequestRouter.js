const express = require('express');

module.exports = class RequesRouter {
    constructor(requestService){
        this.requestService = requestService;
    }
    router(){
        let router = express.Router();
        router.get('/',this.get.bind(this));
        router.post('/',this.post.bind(this));//send request
        router.post('/accept',this.accept.bind(this));//accept request
        router.post('/reject',this.reject.bind(this));//reject request
        
        return router;
    }
    get(req,res){
        console.log('get request');
    }
    // send request
    post(req, res){
        console.log("post request ....",req.body);
        console.log("manager ",req.user.user.email);
                                                // player         manager's team id       manager's username
        return this.requestService.sendRequest(req.body.player, req.user.user.team_id, req.user.user.username, 
                    // manager's teamname
                    req.user.user.teamname)
                    .then((result)=>{
                        res.redirect('/dashboard');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
    }
    accept(req, res){
        console.log("req.body",req.body);       //player                join this team
        return this.requestService.acceptRequest(req.user.user.email, req.body.team_id)
                    .then((data)=>{
                        return this.requestService.clearRequest(req.user.user.email);
                    })
                    .then((data)=>{
                        res.redirect('/dashboard');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
    }
    reject(req, res){
        console.log("reject");
    }
}