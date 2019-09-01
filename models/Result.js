const mongoose = require('mongoose');


const coordinateSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    }
});

const resultSchema = mongoose.Schema({
    coordinates: coordinateSchema,
    place_id: {
        type: String,
    },
    formatted_address: {
        type: String,
    },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = { Result }