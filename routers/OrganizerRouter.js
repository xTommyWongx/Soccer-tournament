const express = require('express');

module.exports = class OrganizerRouter {
    constructor(organizerService) {
        this.organizerService = organizerService;
    }
    router(){
        let router = express.Router();
        router.get('/',this.get.bind(this));
        router.post('/',this.post.bind(this));
        router.put('/:id',this.put.bind(this));
        router.delete('/:id',this.delete.bind(this));
        router.patch('/:id',this.patch.bind(this));
        return router;
    }
    get(req,res){

    }
    post(req,res){
        console.log(req.body);
        this.organizerService.create(req.body, req.user.user.id)
            .then(() => res.render('createTournament') );
    }
    put(req,res){

    }
    delete(req,res){

    }
    patch(req,res){
        
    }
}