const express = require('express');
const passport = require('passport');
const isNotLoggedIn = require('../utils/guard').isNotLoggedIn;


module.exports = class AuthRouter {
    
    router(){
        let router = express.Router();
        // View login page
        router.get('/login', isNotLoggedIn, (req, res) => res.render("login"));
        
        // Sign in 
        router.post('/login',(req,res,next) => {
            passport.authenticate('local', {
                successRedirect: '/profile',
                failureRedirect: '/auth/login',
                failureFlash: true
            })(req, res, next);
        })

        router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/auth/login');
        });
        
        // facebook login
        router.get("/facebook", passport.authenticate('facebook', {
            authType: 'reauthenticate',
            scope: ['public_profile','user_friends', 'manage_pages']
        }));

        router.get("/facebook/callback", passport.authenticate('facebook'), (req, res) => {
            // res.send(req.user);
            res.redirect('/profile');
        });
        
        return router;
    }
}