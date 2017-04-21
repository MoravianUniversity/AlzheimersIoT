// app/models/Email.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmailSchema   = new Schema({
    emailAddress: String,
    services: [String], // this is the tags of the endpoints they wish to be notified of
    					// the possible values in the array are currently [GPS,Journal,MemoryGame,All]
});

module.exports = mongoose.model('Email', EmailSchema);