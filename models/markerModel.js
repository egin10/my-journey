const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const markerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    tittle: {
        type: String,
        required: true
    },
    nameplace: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    point: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Marker', markerSchema);