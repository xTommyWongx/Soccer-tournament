const express = require('express');

module.exports = class OrganizerRouter {
    constructor(organizerService) {
        this.organizerService = organizerService;
    }
    router(){
        let router = express.Router();
        router.get('/tournament/:id/edit',this.get.bind(this));
        router.post('/tournament',this.post.bind(this));
        router.post('/accept',this.accept.bind(this));
        router.post('/reject',this.reject.bind(this));
        router.put('/tournament/:id',this.put.bind(this));
        router.delete('/tournament/:id',this.delete.bind(this));
        router.post('/fixtures/',this.fixtures.bind(this));
        return router;
    }
    fixtures(req, res){
        console.log("fixtures ,",req.body);
        return this.organizerService.createFixture(req.body)
            .then((data)=>{
                res.send();
            }).catch(err=>{
                console.log(err);
            })
    }

    get(req,res){
        return this.organizerService.list(req, res)
            .then((cb) => {
                res.render('editTournament', { organizerService: cb[0] });
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            }); 
    }
    post(req,res){
        this.organizerService.create(req.body, req.user.user.id)
            .then((msg) => {
               
                    req.flash('success_msg', 'You have created new tournament!');                
                    res.redirect('/tournaments')
                
            })
            .catch((err) => {
                if (err === 'Tournament name already in use!' ) {
                    req.flash('error_msg', 'Tournament name already in use');
                    res.redirect('/createTournament');
                }
            });
    }
    put(req,res){
        return this.organizerService.update(req)
            .then(() => res.redirect('/tournaments'))
            .catch((err) => {
                if (err === 'Tournament name already in use!' ) {
                    req.flash('error_msg', 'Tournament name already in use');
                    res.redirect(`/api/organizers/tournament/${req.params.id}/edit`);
                } else {
                    console.log(err);
                    res.send(err);
                }
            }); 
    }
    delete(req,res){
        return this.organizerService.delete(req)
            .then(() => console.log('deleted!!!'))
            .then(() => res.redirect('/tournaments'))  
            .catch((err) => {
                console.log(err);
                res.send(err);
            });   
    }
    accept(req, res){
        console.log("accept",req.body);
        this.organizerService.accept(req.body.team_id, req.body.tournament_id)
            .then((data)=>{
                return this.organizerService.deleteRequests(req.body.team_id, req.body.tournament_id)
            }).then(()=>{
                res.send();
            }).catch((err)=>{
                console.log(err);
                res.send(err);
            })

    }
    reject(req, res){
        this.organizerService.deleteRequests(req.body.team_id, req.body.tournament_id)
            .then(()=>{
                res.send();
            }).catch((err)=>{
                console.log(err);
                res.send(err);
            })
    }
}