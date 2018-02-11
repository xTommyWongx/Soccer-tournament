const express = require('express');
const bodyParse = require('body-parser');

module.exports = class PlayersRouter {
    constructor(playersService){
        this.playersService = playersService;
    }
    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.put("/:id",this.put.bind(this));
        router.patch("/:id",this.patch.bind(this));
        router.delete("/:id",this.delete.bind(this));
        
        return router;
    }
    get(req,res){

    }
    post(req,res){
        console.log("post active ", req.body);
        return this.playersService.create(req.body)
            .then((data) => {
                req.flash('success_msg', 'You are now registered and can login');
                res.redirect('/auth/login');
            })
            .catch((err) => {
                console.log(err);
                if(err == "emailExists"){
                    req.flash('error_msg', 'Email already in use'); 
                }
                res.redirect('/register')
            });  
    }
    put(req,res){

    }
    delete(req,res){

    }
    patch(req,res){

    }
}