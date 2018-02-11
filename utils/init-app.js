const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const flash = require('connect-flash');


module.exports = ()=>{
    let app = express();
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressSession({
        secret: 'superSecret'
    }));

    require('./init-passport')(app);

    app.use(flash());

    // Global variables
    app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
    });

    return {
        app : app,
    }
}