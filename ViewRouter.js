
const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn, isOrganizer} = require('./utils/guard');

module.exports = class ViewRouter {
    constructor(knex) {
        this.knex = knex;
    }
    router() {

        const router = express.Router();
        router.get('/', isLoggedIn, (req, res) => res.render("home"));
        router.get('/profile', isLoggedIn, (req, res) => res.render("profile"));
        router.get('/dashboard', isLoggedIn, this.loadDashboard.bind(this));
        router.get('/createTeam', isLoggedIn, (req, res) => res.render("createTeam"));
        router.get('/teams', isLoggedIn, this.teamlist.bind(this)); //get teams list for team page
        router.get('/tournaments', isLoggedIn, this.tournamentList.bind(this));  //list all tournaments based on loggin as a manager or organizer
        router.get('/createTournament', isOrganizer, (req, res) => res.render("createTournament"));
        router.get('/register', isNotLoggedIn, (req, res) => res.render("register"));


        return router;
    }


    // get list of teams
    teamlist(req, res) {
        console.log("teamslist, ", req.user);
        this.knex('teams').select()
            .innerJoin('players','players.id','manager_id')
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

        console.log("email ", req.user.user.email);
        if (req.user.user.player)//load player's dashboard
        {
            this.knex('requests').select().where('playerEmail', req.user.user.email)// get all the requests to join
                .then((result) => {
                    if (req.user.user.team_id) {
                        return this.knex('players').select().where('team_id', req.user.user.team_id)//get all the teammates
                            .then((players) => {
                                return this.knex('matches').select()
                                    .innerJoin('tournaments','tournaments.id','tournament_id')
                                    .then((matches)=>{
                                        console.log("players", players);
                                console.log('request ..', result);
                                console.log('matches',matches);
                                res.render('dashboard', { requests: result, players: players,matches:matches });

                                    })
                                
                            })
                    } else {
                        console.log('requests', result);
                        res.render('dashboard', { requests: result });
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
            // get list of players from manager's team//
            this.knex('players').select().where('team_id', req.user.user.team_id)
                .then((players) => {
                    return this.knex('matches').select()
                        .innerJoin('tournaments','tournaments.id','tournament_id')
                        .then((matches)=>{
                            res.render('dashboard', { players: players ,matches:matches});
                        })
                    
                })
        }
        else if (req.user.user.organizer) { // load organizer's dashboard
            return this.knex('requestTournament').select()
                .where('organizer_id', req.user.user.id)
                .then((requests) => {
                    // console.log("requests to join tournaments",requests);
                    // res.render('dashboard',{ requests : requests});
                    return requests;
                }).then((requests) => {
                    return this.knex('tournaments').select('id','tournamentName')
                        .where('organizer_id', req.user.user.id)
                        .then((tournament_ids) => {
                            console.log('tournament ids', tournament_ids);
                            let self = this;
                            let data = [];
                            let len = tournament_ids.length;
                            return call();
                            function call(){
                                if(len > 0){
                                    len--;
                                   return self.knex('tournamnets_teams').select()
                                              .where('tournament_id',tournament_ids[len].id)
                                              .innerJoin('tournaments','tournaments.id','tournament_id')
                                              .innerJoin('teams','teams.id','team_id')
                                    
                                    .then((list) => {
                                        // console.log("inside", list);
                                          data.push(list);
                                    }).then(()=>{
                                       return call();
                                    })
                                }else{
                                    console.log("data...",data);
                                        console.log("requests..",requests);
                                        res.render('dashboard', {
                                            requests: requests,
                                            tournaments: data,
                                            id: tournament_ids
                                        })
                                }                                
                            }
                            
                        })  
                }).catch(err => {
                    console.log(err);
                    res.send(err);
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
                        .innerJoin('players', 'tournaments.organizer_id', 'players.id')
                        .innerJoin('categories', 'tournaments.category_id', 'categories.id')
                        .innerJoin('numberOfPlayers', 'tournaments.number_of_player_id', 'numberOfPlayers.id')
                        .innerJoin('tournamnets_dates_locations', function () {
                            this.on('tournaments.id', '=', 'tournamnets_dates_locations.tournament_id')
                        })
                       .orderBy('date', 'asc')
                })
                .then((organizerTournament) => {
                    // console.log(organizerTournament)
                    res.render('tournaments', { organizerTournament: organizerTournament })
                })
        } else {
            // load all the tournaments

            return this.knex('tournaments').select()
                .innerJoin('players', 'tournaments.organizer_id', 'players.id')
                .innerJoin('categories', 'tournaments.category_id', 'categories.id')
                .innerJoin('numberOfPlayers', 'tournaments.number_of_player_id', 'numberOfPlayers.id')
                .innerJoin('tournamnets_dates_locations', function () {
                    this.on('tournaments.id', '=', 'tournamnets_dates_locations.tournament_id')

                })
                .orderBy('date', 'asc')
                .then((organizerTournament) => {
                    // console.log(organizerTournament)
                    return this.knex('requestTournament').select('tournament_id as tournament').where({
                        team_id: req.user.user.team_id
                    }).then((requests) => {
                        console.log('requests', requests);
                        res.render('tournaments', {
                            organizerTournament: organizerTournament,
                            requests: requests
                        });
                    })

                })
        }
    }
}




