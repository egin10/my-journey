const Journey = require('../models/journeyModel'),
    Marker = require('../models/markerModel');

let idMarker = '';
let poitMarker = 0;
let idHistory = '';

module.exports = {
    createMarker: (req, res, next) => {
        Journey.find({ username: req.user.username, status: 'progress' }, (err, journey) => {
            if (err) return err;

            if (journey == '') {
                res.writeHead(302, { 'Location': '/user/create-journey' });
                res.end();
            } else {
                res.render('user/marker', { number: poitMarker, messagesJourney: req.flash('journeyMessage'), messagesSucc: req.flash('markerMessageSucc'), messagesErr: req.flash('markerMessageErr') });
            }
        });
    },
    createMarkerPost: (req, res, next) => {
        Journey.findOne({ username: req.user.username, status: 'progress' }, (err, journey) => {
            if (err) return err;

            Marker.findOne({ username: req.user.username, tittle: journey.tittle, nameplace: req.body.namePlace }, (err, marker) => {
                if (err) return err;

                if (marker) {
                    req.flash('markerMessageErr', 'The name place of merker is already exists');
                    res.writeHead(302, { 'Location': '/user/create-marker' });
                    res.end();
                } else {
                    //Validation Form
                    req.checkBody('namePlace', 'Name Place is required').notEmpty();
                    req.checkBody('lat', 'Latitude is required').notEmpty();
                    req.checkBody('lng', 'Longitude is required').notEmpty();

                    req.getValidationResult().then(function (result) {
                        if (result.array() != '') {
                            res.render('user/marker', { validations: result.array() });
                        } else {
                            let newMarker = new Marker();
                            newMarker.username = req.user.username;
                            newMarker.tittle = journey.tittle;
                            newMarker.nameplace = req.body.namePlace;
                            newMarker.latitude = req.body.lat;
                            newMarker.longitude = req.body.lng;
                            newMarker.point = poitMarker;
                            newMarker.save((err) => {
                                if (err) return err;

                                poitMarker += 1;
                                req.flash('markerMessageSucc', `${req.body.namePlace} has saved`);
                                res.redirect('/user/create-marker');
                            });
                        }
                    });
                }
            });
        });
    },
    createMarkerDone: (req, res, next) => {
        Journey.update({ username: req.user.username, status: 'progress' }, { 'status': 'done' }, err => {
            if (err) return err;

            poitMarker = 0;
            req.flash('journeyMessage', 'Your Journey has done');
            res.writeHead(302, { 'Location': '/user/history' });
            res.end();
        });
    },
    historyDetailMarkers: (req, res, next) => {
        Journey.findOne({ _id: req.params.id }, (err, journey) => {
            if (err) return err;

            if (journey) {
                idHistory = req.params.id;
                Marker.find({ username: journey.username, tittle: journey.tittle }, (err, marker) => {
                    if (err) return err;

                    res.render('user/historyMarker', { data: marker, tittle: journey.tittle, messages: req.flash('markerEditMessage') });
                });
            }
        });
    },
    updateMarker: (req, res, next) => {
        Marker.findOne({ username: req.user.username, _id: req.params.id }, (err, marker) => {
            if (err) return err;

            idMarker = req.params.id;
            res.render('user/markerEdit', { data: marker });
        });
    },
    updateMarkerPost: (req, res, next) => {
        Marker.update({ _id: idMarker }, { nameplace: req.body.namePlace }, err => {
            if (err) return err;
            req.flash('markerEditMessage', `Your marker ${req.body.namePlace} has updated`);
            res.redirect(`/user/history-details/${idHistory}`);
        });
    },
    deleteMarker: (req, res, next) => {
        Marker.remove({ _id: req.params.id }, err => {
            if (err) return err;

            req.flash('markerEditMessage', `Your marker has delete`);
            res.redirect(`/user/history-details/${idHistory}`);
        });
    },
    mapsDetails: (req, res, next) => {
        Journey.findOne({ _id: req.params.id }, (err, journey) => {
            if (err) return err;

            if (journey) {
                Marker.find({ username: journey.username, tittle: journey.tittle }, (err, marker) => {
                    if (err) return err;

                    res.render('user/mapsDetails', { data: JSON.stringify(marker), tittle: journey.tittle });
                });
            }
        });
    },
}