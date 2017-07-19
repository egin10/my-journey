const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const journeySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    tittle: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Journey', journeySchema);