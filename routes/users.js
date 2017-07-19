const express = require('express'),
  isAuth = require('../config/auth').isLogin,
  userController = require('../controllers/userController'),
  journeyController = require('../controllers/journeyController'),
  router = express.Router();

/* GET users listing. */
router.get('/', isAuth, userController.home);

router.get('/create-journey', isAuth, journeyController.createJourney);
router.post('/create-journey', isAuth, journeyController.createJourneyPost);
router.get('/create-marker', isAuth, journeyController.createMarker);
router.get('/create-marker-done', isAuth, journeyController.createMarkerDone);

router.get('/history', isAuth, journeyController.history);
router.get('/history-details/:id', isAuth, journeyController.historyDetails);
router.get('/history-edit/:id', isAuth, journeyController.historyDetails);
router.get('/history-delete/:id', isAuth, journeyController.historyDeleteOne);

router.get('/maps', isAuth, userController.maps);

router.get('/setting', isAuth, userController.setting);
router.post('/setting', isAuth, userController.settingPost);

router.get('/logout', isAuth, userController.logout);

module.exports = router;
