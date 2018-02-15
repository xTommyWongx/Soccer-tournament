const express = require('express');

module.exports = class RequesRouter {
    constructor(requestService){
        this.requestService = requestService;
    }
    router(){
        let router = express.Router();
        router.get('/',this.get.bind(this));
        router.post('/',this.post.bind(this));//send request
        
        return router;
    }
    get(req,res){
        console.log('get request');
    }
    // send request
    post(req,res){
        console.log("post request ....",req.body);
        console.log("manager ",req.user.user.email);
                                                // player         manager's team id       manager's username
        return this.requestService.sendRequest(req.body.player, req.user.user.team_id, req.user.user.username)
                    .then((result)=>{
                        res.redirect('/dashboard');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })

    }
}