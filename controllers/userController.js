const User = require('../models/userModel');

module.exports = {
    home: (req, res, next) => {
        res.render('user/home');
    },
    createJourney: (req, res, next) => {
        res.render('user/journey');
    },
    history: (req, res, next) => {
        res.render('user/history'); //list of journey
    },
    maps: (req, res, next) => {
        res.render('user/maps'); //maps where am i now
    },
    setting: (req, res, next) => {
        res.render('user/setting', { user: req.user });
    },
    settingPost: (req, res, next) => {
        User.findOne({ 'username': req.user.username }, (err, user) => {
            if(err) throw err;


        });
    },
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
}