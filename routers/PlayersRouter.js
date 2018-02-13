const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileimg')
// const upload = multer({dest: './public/uploads/'})
// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

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
        router.post("/uploadPic", this.uploadPic.bind(this));// upload profile pic

        return router;
    }
    uploadPic(req, res) {
        console.log("req.file,", req.file);
        upload(req, res, (err) => {
            if (err) {
                res.render('profile', {
                    msg: err
                });
            } else {
                if (req.file == undefined) {
                    res.render('profile', {
                        msg: 'Error: No File Selected!'
                    });
                } else {
                    // res.render('profile', {
                    //     msg: 'File Uploaded!',
                    //     file: `/uploads/${req.file.filename}`
                    // });
                    let file = `/uploads/${req.file.filename}`;
                    return this.playersService.update(req.user, file)
                        .then((user) => {
                            console.log('data,,', user[0]);
                            req.flash('success_msg', 'Image upload successful');
                            req.session.passport.user.user = user[0];

                            req.session.save(function (err) {
                                req.session.reload(function (err) {
                                    res.render('profile');
                                });
                            });

                        })
                        .catch((err) => {
                            console.log(err);

                        });
                }
            }
        });
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