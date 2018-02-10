const express = require('express');
const passport = require('passport');
const isNotLoggedIn = require('../utils/guard').isNotLoggedIn;


module.exports = class AuthRouter {
    
    router(){
        let router = express.Router();
        router.get('/login', isNotLoggedIn, (req, res) => res.render("login"));
        router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/auth/login');
        });
        
        router.get("/facebook", passport.authenticate('facebook', {
            authType: 'reauthenticate',
            scope: ['user_friends', 'manage_pages']
        }));

        router.get("/facebook/callback", passport.authenticate('facebook'), (req, res) => {
            // res.send(req.user);
            res.redirect('/profile');
        });
        return router;
    }
}