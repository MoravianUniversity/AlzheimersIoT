// app/models/medicineLogger.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MedicineLoggerSchema   = new Schema({
    user: String,
    record: String,
    date: Date, // This is a ISO 8601 UTC date, e.g. "1994-11-05T13:15:30Z"
});

module.exports = mongoose.model('MedicineLogger', MedicineLoggerSchema);