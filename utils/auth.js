const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login'); // check on naming convention
    } else {
        next();
    }
};

module.exports = withAuth;