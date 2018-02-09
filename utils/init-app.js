const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');


module.exports = ()=>{
    let app = express();
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(expressSession({
        secret: 'superSecret'
    }))

    require('./init-passport')(app);

    return {
        app : app,
    }
}