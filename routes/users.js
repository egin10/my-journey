const express = require('express'),
  isAuth = require('../config/auth').isLogin,
  userController = require('../controllers/userController'),
  journeyController = require('../controllers/journeyController'),
  markerController = require('../controllers/markerController'),
  router = express.Router();

/* GET users listing. */
router.get('/', isAuth, userController.home);

router.get('/create-journey', isAuth, journeyController.createJourney);
router.post('/create-journey', isAuth, journeyController.createJourneyPost);

router.get('/create-marker', isAuth, markerController.createMarker);
router.post('/create-marker', isAuth, markerController.createMarkerPost);
router.get('/create-marker-done', isAuth, markerController.createMarkerDone);

router.get('/history', isAuth, journeyController.history);
router.get('/history-details/:id', isAuth, markerController.historyDetailMarkers);
router.get('/history-edit/:id', isAuth, journeyController.editJourney);
router.post('/history-edit/', isAuth, journeyController.editJourneyPost);
router.get('/history-delete/:id', isAuth, journeyController.historyDeleteOne);

router.get('/maps', isAuth, userController.maps);

router.get('/setting', isAuth, userController.setting);
router.post('/setting', isAuth, userController.settingPost);

router.get('/logout', isAuth, userController.logout);

module.exports = router;
