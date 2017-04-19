// app/models/zWaveDoor.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var zWaveDoorSchema   = new Schema({
    date: String,
    time: String,
    status: Boolean
});

module.exports = mongoose.model('zWaveDoor', zWaveDoorSchema);