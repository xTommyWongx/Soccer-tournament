const express = require('express');
const multer = require('multer');
const expressSession = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const flash = require('connect-flash');
const path = require('path');

// Handlebars Helpers
const {formatDate, check, checkiftrue} = require('./helpersHbs');

module.exports = () => {
    // let client = redis.createClient();

   
    let app = express();
    app.engine('handlebars', hb({ 
        helpers : {
            formatDate : formatDate,
            check : check,
            checkiftrue: checkiftrue
        },
        defaultLayout: 'main'
     }));
    app.set('view engine', 'handlebars');
    app.use(express.static(path.join(__dirname,'../public')));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressSession({
        secret: 'superSecret',
        
    //     store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    // saveUninitialized: false,
    // resave: false

    }));
    app.use(cors());

    let sess;

    require('./init-passport')(app);

    

    app.use(flash());

    // Global variables
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    return {
        app: app,
    }
}