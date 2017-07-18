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
        res.render('user/setting', { messageError: req.flash('settingMessageError'), messageSuccess: req.flash('settingMessageSuccess') });
    },
    settingPost: (req, res, next) => {
        User.findOne({ 'username': req.user.username }, (err, user) => {
            if (err) throw err;

            if (!user) return req.flash('settingMessageError', `Who are you?`);

            if (!user.validPassword(req.body.oldPassword)) {
                return req.flash('settingMessageError', `Wrong password`);
            } else {
                let newData = {
                    email: req.body.email,
                    password: user.generateHash(req.body.newPassword)
                };

                User.update({ 'username': req.user.username }, //searching on badatase
                    newData, //newData
                    err => {
                        if (err) throw err;
                        req.flash('settingMessageSuccess', `Your profile has updated`);
                        res.redirect('/user/setting');
                    });
            }
        });
    },
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
}