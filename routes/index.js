const express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/index');
});

router.get('/signup', (req, res, next) => {
  res.render('main/signup');
});

router.get('/entry', (req, res, next) => {
  res.render('main/entry');
});

module.exports = router;
