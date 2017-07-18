const express = require('express'),
  router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('user/index');
});

router.get('/create-journey', (req, res, next) => {
  res.render('user/journey');
});

// router.post('/create-journey', (req, res, next) => {
//   res.render('user/journey');
// });

router.get('/history', (req, res, next) => {
  res.render('user/history'); //list of journey
});

router.get('/maps', (req, res, next) => {
  res.render('user/maps'); //maps where am i now
});

router.get('/setting', (req, res, next) => {
  res.render('user/setting'); //setting profile user
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err) throw err;

    res.redirect('/');
  });
});

module.exports = router;
