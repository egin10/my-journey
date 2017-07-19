const Journey = require('../models/journeyModel'),
    Marker = require('../models/markerModel');

let idMarker = '';
let idHistory = '';

module.exports = {
    createMarker: (req, res, next) => {
        Journey.find({ username: req.user.username, status: 'progress' }, (err, journey) => {
            if (err) throw err;

            if (journey == '') {
                console.log(journey);
                res.writeHead(302, { 'Location': '/user/create-journey' });
                res.end();
            } else {
                res.render('user/marker', { messagesJourney: req.flash('journeyMessage'), messagesSucc: req.flash('markerMessageSucc'), messagesErr: req.flash('markerMessageErr') });
            }
        });
    },
    createMarkerPost: (req, res, next) => {
        Journey.findOne({ username: req.user.username, status: 'progress' }, (err, journey) => {
            if (err) throw err;

            Marker.findOne({ username: req.user.username, tittle: journey.tittle, nameplace: req.body.namePlace }, (err, marker) => {
                if (err) throw err;

                if (marker) {
                    req.flash('markerMessageErr', 'The name place of merker is already exists');
                    res.writeHead(302, { 'Location': '/user/create-marker' });
                    res.end();
                } else {
                    let newMarker = new Marker();
                    newMarker.username = req.user.username;
                    newMarker.tittle = journey.tittle;
                    newMarker.nameplace = req.body.namePlace;
                    newMarker.latitude = req.body.lat;
                    newMarker.longitude = req.body.lng;
                    newMarker.save((err) => {
                        if (err) throw err;

                        req.flash('markerMessageSucc', `${req.body.namePlace} has saved`);
                        res.redirect('/user/create-marker');
                    });
                }
            });
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
    historyDetailMarkers: (req, res, next) => {
        Journey.findOne({ _id: req.params.id }, (err, journey) => {
            if (err) throw err;

            if (journey) {
                idHistory = req.params.id;
                Marker.find({ username: journey.username, tittle: journey.tittle }, (err, marker) => {
                    if (err) throw err;
                    
                    res.render('user/historyMarker', { data: marker, tittle: journey.tittle, messages: req.flash('markerEditMessage') });
                });
            }
        });
    },
    updateMarker: (req, res, next) => {
        Marker.findOne({ username: req.user.username, _id: req.params.id }, (err, marker) => {
            if (err) throw err;
            
            idMarker = req.params.id;
            res.render('user/markerEdit', { data: marker });
        });
    },
    updateMarkerPost: (req, res, next) => {
        Marker.update({ _id: idMarker }, { nameplace: req.body.namePlace }, err => {
            if (err) throw err;
            req.flash('markerEditMessage', `Your marker ${req.body.namePlace} has updated`);
            res.redirect(`/user/history-details/${idHistory}`);
        });
    },
}