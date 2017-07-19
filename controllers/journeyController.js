const Journey = require('../models/journeyModel');

module.exports = {
    createJourney: (req, res, next) => {
        Journey.findOne({ 'username': req.user.username, 'status': 'progress' }, (err, journey) => {
            if (err) return err;

            if (!journey) {
                res.render('user/journey');
            } else {
                res.writeHead(302, { 'Location': '/user/create-marker' });
                res.end();
            }
        });
    },
    createJourneyPost: (req, res, next) => {
        Journey.findOne({ 'username': req.user.username, 'tittle': req.body.tittle }, (err, journey) => {
            if (err) return err;

            //if any journey with username and tittle are match
            if (journey) {
                res.writeHead(302, { 'Location': '/user/create-journey' });
                res.end();
            }

            let newJourney = new Journey();
            newJourney.username = req.user.username;
            newJourney.tittle = req.body.tittle;
            newJourney.descriptions = req.body.descriptions;
            newJourney.status = 'progress';
            newJourney.save((err) => {
                if (err) return err;

                req.flash('journeyMessage', 'Success create new journey');
                res.redirect('/user/create-marker');
            });
        });
    },
    createMarker: (req, res, next) => {
        res.render('user/marker', { messages: req.flash('journeyMessage') });
    },
    createMarkerDone: (req, res, next) => {
        Journey.update({ 'username': req.user.username }, { 'status': 'done' }, err => {
            if(err) throw err;
            req.flash('journeyMessage', 'Your Journey has done');
            res.writeHead(302, {'Location': '/user/history'});
            res.end();
        });
    },
    history: (req, res, next) => {
        res.render('user/history', { messages : req.flash('journeyMessage') }); //list of journey
    },
}