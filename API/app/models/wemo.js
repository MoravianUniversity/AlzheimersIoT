// app/models/wemo.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WemoSchema   = new Schema({
    date: String,
    time: String,
    status: Boolean
});

module.exports = mongoose.model('Wemo', WemoSchema);