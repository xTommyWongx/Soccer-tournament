const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("home"));
        router.get('/profile',(req,res)=>res.render("profile"));
        router.get('/dashboard',(req,res)=>res.render("dashboard"));
        router.get('/teams',(req,res)=>res.render("teams"));
        router.get('/login',(req,res)=>res.render("login"));
        router.get('/logout',(req,res)=> res.send());


        return router;
    }
}