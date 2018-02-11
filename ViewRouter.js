
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const isNotLoggedIn = require('./utils/guard').isNotLoggedIn;

module.exports = class ViewRouter {

    router() {
        
        const router = express.Router();
        router.get('/', isLoggedIn,(req, res) => res.render("home"));
        router.get('/profile', isLoggedIn, (req, res) => {
            res.render("profile", { user: req.user.user.username });
        });
        router.get('/dashboard', isLoggedIn, (req, res) => res.render("dashboard"));
        router.get('/teams', isLoggedIn, (req, res) => res.render("teams"));
        router.get('/tournaments', (req, res) => res.render("tournaments"));

        
        router.get('/register', isNotLoggedIn, (req, res) => {
            res.render("register");
        });
        



        return router;
    }
}