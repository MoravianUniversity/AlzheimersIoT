// app/routes/medicineLogger.js

var express = require('express');
var router = express.Router();

// chai.js for linting
var expect = require('chai').expect;

// Get an instance of our model
var MedicineLogger = require('../models/medicineLogger.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /medicineLogger
// ----------------------------------------------------
router.route('/')

    // create a medicineLogger entry (accessed at POST http://localhost:8080/api/medicineLogger)
    .post(function(req, res) {
        if (postParametersAreMissingOrInvalid(req)) {
            res.status(400).json({error: 'There are missing or invalid parameters in the request.'});
            return;
        }

        var medicineLogger = new MedicineLogger();      // create a new instance of the MedicineLogger model
        medicineLogger.user = req.body.user;
        medicineLogger.record = req.body.record;
        medicineLogger.date = Date.parse(req.body.date);


        // save the medicineLogger entry and check for errors
        medicineLogger.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'MedicineLogger entry created!' });
        });
    })

    // get the latest medicineLogger (accessed at GET http://localhost:8080/api/medicineLogger)
    .get(function(req, res) {
        MedicineLogger.find().sort({'_id': -1}).limit(1).exec(function(err, medicineLoggers) {
            if (err)
                res.send(err);

            res.json(medicineLoggers);
        });
    });

// on routes that end in /medicineLogger/:medicineLogger_id
// ----------------------------------------------------
router.route('/:medicineLogger_id')

    // get the medicineLogger with that id (accessed at GET http://localhost:8080/api/medicineLogger/:medicineLogger_id)
    .get(function(req, res) {
        MedicineLogger.findById(req.params.medicineLogger_id, function(err, medicineLogger) {
            if (err)
                res.send(err);
            res.json(medicineLogger);
        });
    })

    // delete the medicineLogger with this id (accessed at DELETE http://localhost:8080/api/medicineLogger/:medicineLogger_id)
    .delete(function(req, res) {
        MedicineLogger.remove({
            _id: req.params.medicineLogger_id
        }, function(err, medicineLogger) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;

// helper methods for paramter linting
function postParametersAreMissingOrInvalid(req) {
    try {
        // Check for missing and invalid parameters
        expect(req.body).to.have.property('user').that.is.a('string');
        expect(req.body).to.have.property('record').that.is.a('string');

        expect(req.body).to.have.property('date').that.is.a('string');
        // Check that the date param can be parsed into a Date object correctly
        expect(Date.parse(req.body.date)).to.not.be.NaN;
    } catch (AssertionError) {
        return true;
    }

    return false;
}


