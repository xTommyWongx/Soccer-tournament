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
    createTeamPost(req, res){
        return this.managerService.createTeam(req.body, req.user.user.id)
                    .then((res)=>{
                        console.log("i am here");
                        return this.getManagerInfo(req, res);
                        
                    })
                    .then(()=>{
                        req.flash('success_msg','Team created successfully');
                        
                        res.redirect('/dashboard');
                    })
                    .catch((err)=>console.log(err));
    }
    getManagerInfo(req, res){
        console.log("details ",req.user.user.email);
        return this.managerService.getDetails(req.user.user.email)
                .then((manager)=>{
                    console.log("manager ",manager);
                    req.session.passport.user.user = manager[0];

                    req.session.save(function (err) {
                        req.session.reload(function (err) {
                            return;
                        });
                    });
                })
                .catch(err=>console.log(err));
    }
}