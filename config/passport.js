const LocalStrategy = require('passport-local').Strategy,
    User = require('../models/userModel');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    //========SIGN UP
    passport.use('signUp', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) return err;

            if (user) {
                return done(null, false, req.flash('signUpMessage', 'Username is already taken'));
            } else {
                let newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.email = req.body.email;
                newUser.save((err) => {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
    }));

    //========SIGN IN
    passport.use('signIn', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) return done(err);

            if (!user) return done(null, false, req.flash('signInMessage', 'Username is not found!'));
            
            if(!user.validPassword(password)) return done(null, false, req.flash('signInMessage', 'Password is wrong!'));

            return done(null, user);
        });
    }));
};