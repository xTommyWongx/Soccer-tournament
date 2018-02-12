const express = require('express');
const bodyParse = require('body-parser');

module.exports = class PlayersRouter {
    constructor(playersService) {
        this.playersService = playersService;
    }
    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this)); // register new user
        router.put("/:id", this.put.bind(this));
        router.patch("/:id", this.patch.bind(this));
        router.delete("/:id", this.delete.bind(this));

        return router;
    }
    get(req, res) {

    }

    // register new user
    post(req, res) {
        console.log("req body ", req.body);
        let errors = [];

        if (req.body.password !== req.body.confirmPassword) {
            errors.push({ text: 'Passwords do not match!' })
        }
        if (req.body.password.length < 6) {
            errors.push({ text: 'Password must be at least 6 characters' })
        }
        if (errors.length) {
            res.render('register', {
                errors: errors,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
            });
        } else {
            return this.playersService.create(req.body)
                .then((data) => {
                    req.flash('success_msg', 'You are now registered and can login');
                    res.redirect('/auth/login');
                })
                .catch((err) => {
                    console.log(err);
                    if (err == "emailExists") {
                        req.flash('error_msg', 'Email already in use');
                    }
                    res.redirect('/register')
                });
        }
    }

    put(req, res) {

    }
    delete(req, res) {

    }
    patch(req, res) {

    }
}