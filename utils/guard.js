module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login');
}

module.exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports.isOrganizer = (req, res, next) => {
    if ( req.isAuthenticated()  && req.user.user.organizer ){
        return next();
    }
    res.redirect('/');
}