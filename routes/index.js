const express = require('express'),
  router = express.Router(),
  passport = require('passport');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index');
});

router.get('/signup', (req, res, next) => {
  res.render('main/signup', { errors: req.flash('signUpMessage') });
});

router.post('/signup', passport.authenticate('signUp', {
  successRedirect: '/user',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/entry', (req, res, next) => {
  res.render('main/entry', { errors: req.flash('signInMessage') });
});

router.post('/entry', passport.authenticate('signIn', {
  successRedirect: '/user',
  failureRedirect: '/entry',
  failureFlash: true
}));

module.exports = router;
