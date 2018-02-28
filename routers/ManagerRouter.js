const express = require('express');

module.exports = class ManagerRouter {
    constructor(managerService){
        this.managerService = managerService;
    }
    router(){
        let router = express.Router();
        router.post('/createTeam',this.createTeamPost.bind(this));
        router.post('/joinTournament',this.join_tournament.bind(this));
        router.post('/cancelTournament',this.cancel_tournament.bind(this));
        return router; 
    }
    createTeamPost(req, res){
        return this.managerService.createTeam(req.body, req.user.user.id)
                    .then((response)=>{
                        if(response === "Name in use"){
                            req.flash('error_msg','Name already in use');
                            res.redirect('/createTeam');
                        }else {
                        console.log("i am here");
                        return this.getManagerInfo(req, res);
                        }
                    })
                    .then(()=>{
                        req.flash('success_msg','Team created successfully');
                        
                        res.redirect('/dashboard');
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
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
    join_tournament(req, res){
        console.log("team id",req.user.user.team_id);
        console.log("tournament_id",req.body);
        return this.managerService.req_to_join_tournament(req.user.user.teamname,req.user.user.team_id,
                                                        req.body.tournament_id,req.body.organizer_id,
                                                        req.body.tournament_name)
                    .then((data)=>{
                        res.send();
                  }).catch(err=>{
                      console.log(err);
                      res.send(err);
                  });
    }
    cancel_tournament(req, res){
        return this.managerService.cancel_join_tournament(req.user.user.team_id,req.body.tournament_id)
                    .then((data)=>res.send())
                    .catch(err=>{
                        console.log(err);
                        res.send(err);
                    })
    }
}