const express = require('express'),
  isNotAuth = require('../config/auth').notLogin,
  router = express.Router(),
  passport = require('passport');

/* GET home page. */
router.get('/', isNotAuth, (req, res, next) => {
  res.render('main/index');
});

router.get('/signup', isNotAuth, (req, res, next) => {
  res.render('main/signup', { errors: req.flash('signUpMessage') });
});

router.post('/signup', isNotAuth, passport.authenticate('signUp', {
  successRedirect: '/user',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/entry', isNotAuth, (req, res, next) => {
  res.render('main/entry', { errors: req.flash('signInMessage') });
});

router.post('/entry', isNotAuth, passport.authenticate('signIn', {
  successRedirect: '/user',
  failureRedirect: '/entry',
  failureFlash: true
}));

module.exports = router;
