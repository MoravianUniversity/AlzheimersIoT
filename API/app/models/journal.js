// app/models/journal.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JournalSchema   = new Schema({
    datetime: Date,
    message: String,
    activities: [String],
    medication: Boolean
});

module.exports = mongoose.model('Journal', JournalSchema);
