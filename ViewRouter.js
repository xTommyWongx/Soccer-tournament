
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const isNotLoggedIn = require('./utils/guard').isNotLoggedIn;

module.exports = class ViewRouter {
    constructor(knex){
        this.knex = knex;
    }
    router() {
        
        const router = express.Router();
        router.get('/', isLoggedIn,(req, res) => res.render("home"));
        router.get('/profile', isLoggedIn, (req, res) => {
            res.render("profile");
        });
        router.get('/dashboard', isLoggedIn, (req, res) => res.render("dashboard"));
        router.get('/createTeam', isLoggedIn, (req,res) => res.render("createTeam"));
        router.get('/teams', isLoggedIn, this.teamlist.bind(this)); //get teams list for team page
        router.get('/tournaments', (req, res) => res.render("tournaments")); 
        router.get('/register', isNotLoggedIn, (req, res) => res.render("register"));
        
        return router;
    }
    // get list of teams
    teamlist(req,res){
        this.knex('teams').select()
             .then((teams)=>{
                 console.log("teams ",teams);
                 res.render('teams',{teams : teams})
             })
             .catch((err)=>{
                 console.log(err);
             })
    }


}