// app/models/gps.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GPSSchema   = new Schema({
    time: Date, // This is a ISO 8601 UTC date, e.g. "1994-11-05T13:15:30Z"
    lat: Number,
    lon: Number,
    address: String
});

module.exports = mongoose.model('GPS', GPSSchema);