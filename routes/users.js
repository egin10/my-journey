const express = require('express'),
  isAuth = require('../config/auth').isLogin,
  router = express.Router();

/* GET users listing. */
router.get('/', isAuth, (req, res, next) => {
  res.render('user/index');
});

router.get('/create-journey', isAuth, (req, res, next) => {
  res.render('user/journey');
});

// router.post('/create-journey', (req, res, next) => {
//   res.render('user/journey');
// });

router.get('/history', isAuth, (req, res, next) => {
  res.render('user/history'); //list of journey
});

router.get('/maps', isAuth, (req, res, next) => {
  res.render('user/maps'); //maps where am i now
});

router.get('/setting', isAuth, (req, res, next) => {
  res.render('user/setting', { user: req.user }); //setting profile user
});

router.get('/logout', isAuth, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
