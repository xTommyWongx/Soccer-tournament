
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const isNotLoggedIn = require('./utils/guard').isNotLoggedIn;

module.exports = class ViewRouter {
    constructor(knex) {
        this.knex = knex;
    }
    router() {

        const router = express.Router();
        router.get('/', isLoggedIn, (req, res) => res.render("home"));
        router.get('/profile', isLoggedIn, (req, res) => {
            let defaultImg = "/img/kakashi.jpg";
            res.render("profile", { defaultImg: defaultImg });
        });
        router.get('/dashboard', isLoggedIn, this.joinRequest.bind(this));
        router.get('/createTeam', isLoggedIn, (req, res) => res.render("createTeam"));
        router.get('/teams', isLoggedIn, this.teamlist.bind(this)); //get teams list for team page
        router.get('/tournaments', (req, res) => res.render("tournaments"));
        router.get('/register', isNotLoggedIn, (req, res) => res.render("register"));

        return router;
    }
    // get list of teams
    teamlist(req, res) {
        this.knex('teams').select()
            .then((teams) => {
                console.log("teams ", teams);
                res.render('teams', { teams: teams })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // show join request
    joinRequest(req, res) {
        console.log(req.user.user.manager);
        if (!req.user.user.manager) //&& !req.user.user.organizer)
        {
            this.knex('requests').select().where('playerEmail', req.user.user.email)
                .then((result) => {
                    return this.knex('players').select().where('team_id',req.user.user.team_id)
                        .then((players)=>{
                            console.log('request ..', result);
                            res.render('dashboard',{ requests: result,players: players});
                        })
                })
                .then((data)=>{

                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            // get list of players from your team
            this.knex('players').select().where('team_id',req.user.user.team_id)
                .then((players)=>{
                    res.render('dashboard',{ players: players})
                })
            
        }
    }


}