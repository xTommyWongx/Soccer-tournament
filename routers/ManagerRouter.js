const express = require('express');

module.exports = class ManagerRouter {
    constructor(managerService){
        this.managerService = managerService;
    }
    router(){
        let router = express.Router();
        router.post('/createTeam',this.createTeamPost.bind(this));
        return router; 
    }
    createTeamPost(req,res){
        return this.managerService.createTeam(req.body, req.user.user.id)
                    .then((res)=>{
                        
                    })
                    .catch((err)=>console.log(err));
    }
}