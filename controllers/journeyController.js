const Journey = require('../models/journeyModel');

module.exports = {
    createJourney: (req, res, next) => {
        Journey.findOne({ username: req.user.username, 'status': 'progress' }, (err, journey) => {
            if (err) return err;

            if (!journey) {
                res.render('user/journey', { messages: req.flash('journeyMessage') });
            } else {
                res.writeHead(302, { 'Location': '/user/create-marker' });
                res.end();
            }
        });
    },
    createJourneyPost: (req, res, next) => {
        Journey.findOne({ username: req.user.username, 'tittle': req.body.tittle }, (err, journey) => {
            if (err) return err;

            //if any journey with username and tittle are match
            if (journey) {
                req.flash('journeyMessage', 'The tittle of journey is already exists');
                res.writeHead(302, { 'Location': '/user/create-journey' });
                res.end();
            } else {
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
            }
        });
    },
    history: (req, res, next) => {
        Journey.find({ username: req.user.username }, (err, journey) => {
            if (err) throw err;
            res.render('user/history', { messages: req.flash('journeyMessage'), data: journey }); //list of journey
        });
    },
    historyDetails: (req, res, next) => {
        Journey.findOne({ _id: req.params.id }, (err, journey) => {
            if (err) throw err;

            res.json(journey);
        });
    },
    historyDeleteOne: (req, res, next) => {
        Journey.remove({ _id: req.params.id }, (err) => {
            if (err) throw err;
            req.flash('journeyMessage', `Your Journey with id : ${req.params.id} has deleted!`);
            res.writeHead(302, { 'Location': '/user/history' });
            res.end();
        });
    },
}