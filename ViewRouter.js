
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const isNotLoggedIn = require('./utils/guard').isNotLoggedIn;

module.exports = class ViewRouter {

    router() {
        
        const router = express.Router();
        router.get('/', isLoggedIn,(req, res) => res.render("home",{ user: req.user.profile.displayName }));
        router.get('/profile', isLoggedIn, (req, res) => {
            res.render("profile", { user: req.user.profile.displayName });
        });
        router.get('/dashboard', isLoggedIn, (req, res) => res.render("dashboard", { user: req.user.profile.displayName }));
        router.get('/teams', isLoggedIn, (req, res) => res.render("teams", { user: req.user.profile.displayName }));
        router.get('/tournaments', (req, res) => res.render("tournaments", { user: req.user.profile.displayName }));

        
        router.get('/register', isNotLoggedIn, (req, res) => {
            res.render("register");
        });
        



        return router;
    }
}