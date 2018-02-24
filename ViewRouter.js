
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const isNotLoggedIn = require('./utils/guard').isNotLoggedIn;
let sess = {}; // Custom session holder


module.exports = class ViewRouter {
    constructor(knex) {
        this.knex = knex;
    }
    router() {
        
        const router = express.Router();
        router.get('/', isLoggedIn, (req, res) => res.render("home"));
        router.get('/profile', isLoggedIn, (req, res) => {
            sess.data = req.session;
            sess.data.teamname = req.user.user.teamname;
            sess.data.managername = req.user.user.username;
            sess.data.team_id = req.user.user.team_id;
            console.log("sess",sess.data.username);
            res.render("profile");
        });
        router.get('/dashboard', isLoggedIn, this.loadDashboard.bind(this));
        router.get('/createTeam', isLoggedIn, (req, res) => res.render("createTeam"));
        router.get('/teams', isLoggedIn, this.teamlist.bind(this)); //get teams list for team page
        router.get('/tournaments', isLoggedIn, this.tournamentList.bind(this));  //list all tournaments based on loggin as a manager or organizer
        router.get('/createTournament', isLoggedIn, (req, res) => res.render("createTournament")); 
        router.get('/register', isNotLoggedIn, (req, res) => res.render("register"));
        router.post('/sendRequest',this.sendrequest.bind(this));
        router.post('/cancelRequest',this.cancelrequest.bind(this));

        return router;
    }
    cancelrequest(req,res){
        console.log("cancel");
        console.log(req.body);
        return this.knex('requests')
                    .where({
                        managerName: sess.data.managername,
                        playerEmail: req.body.player
                    })
                    .del()
                    .then(()=>{
                        res.send();
                    })
                    .catch(err=>console.log(err));
    }
    sendrequest(req, res){
        console.log("new,",req.body);
        return this.knex('requests')
            .returning('id')
            .insert({
                managerName: sess.data.managername,
                playerEmail: req.body.player,
                team_id: sess.data.team_id,
                teamName: sess.data.teamname
            }).then((id)=>{
                console.log('id',id);
                res.send(id);
            }).catch((err)=>console.log(err));                
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
    loadDashboard(req, res) {
        console.log(req.user.user.manager);
        console.log("email ",req.user.user.email);
        if (req.user.user.player)//load player's dashboard
        {
            this.knex('requests').select().where('playerEmail', req.user.user.email)// get all the requests to join
                .then((result) => {
                    if(req.user.user.team_id){
                        return this.knex('players').select().where('team_id', req.user.user.team_id)//get all the teammates
                            .then((players) => {
                                console.log("players",players);
                                console.log('request ..', result);
                                res.render('dashboard', { requests: result, players: players });
                            })
                    }else{
                        console.log('requests',result);
                        res.render('dashboard',{ requests: result});
                    }
                })
                .then((data) => {

                })
                .catch((err) => {
                    console.log(err);
                })
        } 
            else if (req.user.user.manager)//load manager's dashboard
        {
            // get list of players from manager's team
            this.knex('players').select().where('team_id', req.user.user.team_id)
                .then((players) => {
                    res.render('dashboard', { players: players});
                })
        }
    }

    // List all tournaments based on loggin as a manager or organizer
    tournamentList(req, res) {
        //load organizer's tournament
        if (req.user.user.organizer) {
            return this.knex('players').select().where('email', req.user.user.email)
                    .then((organizer) => {
                        return this.knex('tournaments').select()
                            .where('organizer_id', organizer[0].id)
                            .innerJoin('categories', 'tournaments.category_id', 'categories.id')
                            .innerJoin('numberOfPlayers', 'tournaments.number_of_player_id', 'numberOfPlayers.id')
                            .innerJoin('tournamnets_dates_locations', function() {
                                    this.on('tournaments.id', '=', 'tournamnets_dates_locations.tournament_id')
                            })
                            .orderBy('date', 'desc')
                    })
                    .then((organizerTournament) => {
                        // console.log(organizerTournament)
                        organizerTournament.forEach((elem) => {
                            return elem.date = new Date(elem.date).toISOString().substring(0,10);
                        })

                        res.render('tournaments', {organizerTournament: organizerTournament})
                        })
        }
    }
}
module.exports.sess = sess;



