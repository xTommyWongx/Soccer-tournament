require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const NODE_ENV = process.env.NODE_ENV || 'staging';
const knexFile = require('../knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // facebook strategy
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        knex('players').select().where('facebook_id', profile.id)
            .then((user) => {
                // facebook user exists in db
                if (user.length) {
                    return done(null, { user: user[0], accessToken: accessToken });
                }
                // new fb user
                return knex('players')
                    .returning('id')
                    .insert({
                        facebook_id: profile.id,
                        username: profile.displayName,
                        // img : get facebook profile image url
                    }).then((id) => {
                        console.log(id[0]);
                        return knex('players').select().where('id', id[0])
                            .then((user) => {
                                return done(null, { user: user[0], accessToken: accessToken });
                            })

                    }).catch((err) => {
                        console.log(err);
                    });
            })
    }
    ));

    // local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        // Find user by email and return with their team info if player has team
        knex('players').select().innerJoin('teams', 'players.team_id', 'teams.id').where('email', email)
            .then((user) => {
                // if player doesn't have team
                if (user.length <= 0) {
                    return knex('players').select().from('players').where('email', email)
                        .then((data) => {
                            if (data.length <= 0) {
                                // err  ,user , msg
                                return done(null, false, { message: 'No user found' });
                            } else {
                                return data;
                            }
                        })
                } else {
                    return user;
                }

            }).then((user) => {
                // Match password
                bcrypt.compare(password, user[0].password, (err, match) => {
                    if (err) throw err;
                    if (match) {
                        return done(null, { user: user[0] });
                    }
                    if (!match)
                        return done(null, false, { message: "Incorrect password" });
                })
            })
    }));



    passport.serializeUser((user, done) => {
        // console.log(user);
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

}