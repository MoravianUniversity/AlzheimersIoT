// app/routes/zWaveDoor.js

var express = require('express');
var router = express.Router();
// var stormpath = require('express-stormpath');
// chai.js for linting
var expect = require('chai').expect;
var assert = require('chai').assert;
// Get an instance of our model
var zwaveDoor = require('../models/zWaveDoor.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /zWaveDoor
// ----------------------------------------------------
router.route('/')

    // create a zWaveDoor (accessed at POST http://localhost:8080/api/zWaveDoor)
    .post(function(req, res) {
        if (postParametersAreMissingOrInvalid(req)) {
            res.status(400).json({error: 'There are missing or invalid parameters in the request.'});
            return;
        }

        var zWaveDoor = new zwaveDoor();      // create a new instance of the zWaveDoor model
        zWaveDoor.date = req.body.date;  // set the zWaveDoor's name (comes from the request)
        zWaveDoor.time = req.body.time;
        zWaveDoor.status = req.body.status;

        // save the zWaveDoor entry and check for errors
        zWaveDoor.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'zWaveDoor entry created!' });
        });
    })

    // get all the zWaveDoor (accessed at GET http://localhost:8080/api/zWaveDoor)
    .get(function(req, res) {
        zwaveDoor.find().sort({'_id': -1}).exec(function(err, zWaveDoors) {
            if (err)
                res.send(err);

            res.json(zWaveDoors);
        });
    });

// on routes that end in /zWaveDoor/:zWaveDoor_id
// ----------------------------------------------------
router.route('/:zWaveDoor_id')

    // get the zWaveDoor with that id (accessed at GET http://localhost:8080/api/zWaveDoor/:zWaveDoor_id)
    .get(function(req, res) {
        zWaveDoor.findById(req.params.zWaveDoor_id, function(err, zWaveDoor) {
            if (err)
                res.send(err);
            res.json(zWaveDoor);
        });
    })

    // delete the zWaveDoor with this id (accessed at DELETE http://localhost:8080/api/zWaveDoor/:zWaveDoor_id)
    .delete(function(req, res) {
        zWaveDoor.remove({
            _id: req.params.zWaveDoor_id
        }, function(err, zWaveDoor) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;

function postParametersAreMissingOrInvalid(req) {
    try {
        // Check for missing and invalid parameters
        expect(req.body).to.have.property('date').that.is.a('string');
        // Check that the date param can be parsed into a Date object correctly
        // expect(Date.parse(req.body.date)).to.not.be.NaN;

        expect(req.body).to.have.property('time').that.is.a('string');
        // Check that the date param can be parsed into a Date object correctly

        expect(req.body).to.have.property('status');
        expect(req.body.status).to.be.oneOf(['true', 'false']);
        // assert.isBoolean(req.body.status);
    } catch (AssertionError) {
        return true;
    }

    return false;
}