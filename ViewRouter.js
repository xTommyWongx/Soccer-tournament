const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/', isLoggedIn, (req,res) => res.render("home"));
        router.get('/profile', isLoggedIn, (req,res)=>res.render("profile"));
        router.get('/dashboard', isLoggedIn, (req,res)=>res.render("dashboard"));
        router.get('/teams', isLoggedIn, (req,res)=>res.render("teams"));
       
        router.get('/login', (req,res)=>res.render("login"));
        router.get('/logout',(req,res)=> res.send());

        router.get("/auth/facebook/callback", passport.authenticate('facebook', {
            scope: ['user_friends', 'manage_pages']
        }));
        
        router.get("/auth/facebook/callback", (req, res) => {
            res.redirect('/');
        });
        


        return router;
    }
}