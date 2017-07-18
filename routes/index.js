const express = require('express'),
  isNotAuth = require('../config/auth').notLogin,
  indexController = require('../controllers/indexController');
  router = express.Router(),
  passport = require('passport');

/* GET home page. */
router.get('/', isNotAuth, indexController.index);

router.get('/signup', isNotAuth, indexController.signUp);

router.post('/signup', isNotAuth, passport.authenticate('signUp', {
  successRedirect: '/user',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/entry', isNotAuth, indexController.entry);

router.post('/entry', isNotAuth, passport.authenticate('signIn', {
  successRedirect: '/user',
  failureRedirect: '/entry',
  failureFlash: true
}));

module.exports = router;
