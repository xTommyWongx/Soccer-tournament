
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const isNotLoggedIn = require('./utils/guard').isNotLoggedIn;

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/', isLoggedIn, (req,res) => res.render("home",{user:req.user.profile.displayName}));
        router.get('/profile', isLoggedIn, (req,res)=>{
            console.log("user :",req.user.profile);
            res.render("profile",{user:req.user.profile.displayName});
        });
        router.get('/dashboard', isLoggedIn, (req,res)=>res.render("dashboard",{user:req.user.profile.displayName}));
        router.get('/teams', isLoggedIn, (req,res)=>res.render("teams",{user:req.user.profile.displayName}));
       
        router.get('/login', isNotLoggedIn, (req,res)=>res.render("login"));
        router.get('/logout',(req,res)=>{
            req.logout();
            res.redirect('/login');
        });
        router.get('/tournaments',(req,res)=>res.render("tournaments",{user:req.user.profile.displayName}));

        router.get("/auth/facebook", passport.authenticate('facebook', { authType:'reauthenticate',
            scope: ['user_friends', 'manage_pages']
        }));
        
        router.get("/auth/facebook/callback", passport.authenticate('facebook'), (req, res) => {
            // res.send(req.user);
            res.redirect('/profile');
        });
        


        return router;
    }
}