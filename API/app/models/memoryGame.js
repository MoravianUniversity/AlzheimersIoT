// app/models/memoryGame.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MemoryGameSchema   = new Schema({
    user: String,
    score: Number,
    time: Date, // This is a ISO 8601 UTC date, e.g. "1994-11-05T13:15:30Z"
});

module.exports = mongoose.model('MemoryGame', MemoryGameSchema);