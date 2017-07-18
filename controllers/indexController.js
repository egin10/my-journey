module.exports = {
    index: (req, res, next) => {
        res.render('main/index');
    },
    signUp: (req, res, next) => {
        res.render('main/signup', { errors: req.flash('signUpMessage') });
    },
    entry: (req, res, next) => {
        res.render('main/entry', { errors: req.flash('signInMessage') });
    }
}