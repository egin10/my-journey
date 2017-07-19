const Journey = require('../models/journeyModel'),
    Marker = require('../models/markerModel');

module.exports = {
    createMarker: (req, res, next) => {
        Journey.find({ username: req.user.username, status: 'progress' }, (err, journey) => {
            if (err) throw err;

            if (journey == '') {
                console.log(journey);
                res.writeHead(302, { 'Location': '/user/create-journey' });
                res.end();
            } else {
                res.render('user/marker', { messages: req.flash('journeyMessage') });
            }
        });
    },
    createMarkerDone: (req, res, next) => {
        Journey.update({ username: req.user.username, status: 'progress' }, { 'status': 'done' }, err => {
            if (err) throw err;
            req.flash('journeyMessage', 'Your Journey has done');
            res.writeHead(302, { 'Location': '/user/history' });
            res.end();
        });
    },
}