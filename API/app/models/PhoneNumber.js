// app/models/PhoneNumber.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhoneNumberSchema   = new Schema({
    CurrentPhoneNumber: String,
    services: [String] // this is the tags of the endpoints they wish to be notified of
    					// the possible values in the array are currently [GPS,Journal,MemoryGame,All]
});

module.exports = mongoose.model('PhoneNumber', PhoneNumberSchema);