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