require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const NODE_ENV = process.env.NODE_ENV || 'development' ;
const knexFile = require('../knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);



module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`
    }, (accessToken, refreshToken, profile, cb)=>{
            console.log(profile);
            return cb(null,{profile:profile,accessToken:accessToken});
        }
    )); 
    
    passport.serializeUser((user,done)=>{
        // console.log(user);
        done(null,user);
    });
    
    passport.deserializeUser((user,done)=>{
        done(null,user);
    });
    
}