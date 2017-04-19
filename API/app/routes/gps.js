// app/routes/gps.js

var express = require('express');
var router = express.Router();
// var stormpath = require('express-stormpath');

// chai.js for linting
var expect = require('chai').expect;
// Get an instance of our model
var GPS = require('../models/gps.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /gps
// ----------------------------------------------------
router.route('/')

    // create a gps entry (accessed at POST http://localhost:8080/api/gps)
    .post(function(req, res) {

        if (postParametersAreMissingOrInvalid(req)) {
            res.status(400).json({error: 'There are missing or invalid parameters in the request.'});
            return;
        }
        var gps = new GPS();      // create a new instance of the GPS model
        gps.deviceID = req.body.deviceID;
        gps.time = Date.parse(req.body.time);
        gps.lat = req.body.lat;
        gps.lon = req.body.lon;
        gps.address = req.body.address;

        // save the gps entry and check for errors
        gps.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'GPS entry created!' });
        });
    })

    // get all the gps (accessed at GET http://localhost:8080/api/gps)
    .get(function(req, res) {
        GPS.find().sort({'_id': -1}).exec(function(err, gpss) {
            if (err)
                res.send(err);

            res.json(gpss);
        });
    });

// on routes that end in /gps/:gps_id
// ----------------------------------------------------
router.route('/:gps_id')

    // get the gps with that id (accessed at GET http://localhost:8080/api/gps/:gps_id)
    .get(function(req, res) {
        GPS.findById(req.params.gps_id, function(err, gps) {
            if (err)
                res.send(err);
            res.json(gps);
        });
    })

    // delete the gps with this id (accessed at DELETE http://localhost:8080/api/gps/:gps_id)
    .delete(function(req, res) {
        GPS.remove({
            _id: req.params.gps_id
        }, function(err, gps) {
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
        expect(req.body).to.have.property('deviceID').that.is.a('string');

        expect(req.body).to.have.property('time').that.is.a('string');
        // Check that the date param can be parsed into a Date object correctly
        expect(Date.parse(req.body.time)).to.not.be.NaN;

        expect(req.body).to.have.property('lat');
        // Check that the score param can parse into a number correctly
        expect(isNaN(req.body.lat)).to.be.false;

        expect(req.body).to.have.property('lon');
        // Check that the score param can parse into a number correctly
        expect(isNaN(req.body.lon)).to.be.false;

        expect(req.body).to.have.property('address').that.is.a('string');
    } catch (AssertionError) {
        return true;
    }

    return false;
}
