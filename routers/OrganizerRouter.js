const express = require('express');
// const isOrangizer = require('../utils/')

module.exports = class OrganizerRouter {
    constructor(organizerService) {
        this.organizerService = organizerService;
    }
    router(){
        let router = express.Router();
        router.get('/tournament/:id/edit',this.get.bind(this));
        router.post('/tournament',this.post.bind(this));
        router.put('/tournament/:id',this.put.bind(this));

        router.delete('/:id',this.delete.bind(this));
        router.patch('/:id',this.patch.bind(this));
        return router;
    }
    get(req,res){
        return this.organizerService.list(req, res)
            .then((cb) => {
                res.render('editTournament', { organizerService: cb[0] });
            })
            .catch((err) => console.log(err));
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
            .catch((err) => console.log(err))
    }
    delete(req,res){

    }
    patch(req,res){
        
    }
}

// value="{{organizerTournament.tournamentName}}