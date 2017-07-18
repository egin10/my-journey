const express = require('express'),
  isAuth = require('../config/auth').isLogin,
  userController = require('../controllers/userController'),
  router = express.Router();

/* GET users listing. */
router.get('/', isAuth, userController.home);

router.get('/create-journey', isAuth, userController.createJourney);

// router.post('/create-journey', (req, res, next) => {
//   res.render('user/journey');
// });

router.get('/history', isAuth, userController.history);

router.get('/maps', isAuth, userController.maps);

router.get('/setting', isAuth, userController.setting);

router.post('/setting', isAuth, userController.settingPost);

router.get('/logout', isAuth, userController.logout);

module.exports = router;
