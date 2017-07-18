module.exports = {
    isLogin: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/entry');
    },
    notLogin: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/user');
    },
}