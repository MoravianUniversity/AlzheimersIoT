// app/routes/PhoneNumber.js

var express = require('express');
var router = express.Router();
// var stormpath = require('express-stormpath');

// chai.js for linting
var expect = require('chai').expect;

// Get an instance of our model
var PhoneNumber = require('../models/PhoneNumber.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /PhoneNumber
// ----------------------------------------------------
router.route('/')

    // create a PhoneNumber entry (accessed at POST http://localhost:8080/api/PhoneNumber)
    .post(function(req, res) {
        if (postParametersAreMissingOrInvalid(req))
            res.status(400).json({error: 'There are missing or invalid parameters in the request.'});

        var phoneNumber = new PhoneNumber();      // create a new instance of the PhoneNumber model
        phoneNumber.CurrentPhoneNumber = req.body.PhoneNumber;
        phoneNumber.services = req.body.services.split(",");
        


        // save the PhoneNumber entry and check for errors
        phoneNumber.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'PhoneNumber entry created!' });
        });
    })

    // get all the PhoneNumbers (accessed at GET http://localhost:8080/api/PhoneNumber)
    .get(function(req, res) {
       PhoneNumber.find({},{CurrentPhoneNumber:1,_id:0}).exec(function(err, PhoneNumbers) {
            if (err)
                res.send(err);

            res.json(PhoneNumbers);
        });
    });

// on routes that end in /PhoneNumber/:services
// ----------------------------------------------------
router.route('/:services')

    // get the PhoneNumber with the services tag (accessed at GET http://localhost:8080/api/PhoneNumber/:services)
    .get(function(req, res) {
     PhoneNumber.find({services: req.params.services},{CurrentPhoneNumber:1,_id:0}).exec(function(err, PhoneNumbers) {
            if (err)
                res.send(err);
            res.json(PhoneNumbers);
        });
    })

    // delete the PhoneNumber with this id (accessed at DELETE http://localhost:8080/api/PhoneNumber/:PhoneNumber)
    .delete(function(req, res) {
        PhoneNumber.remove({
            CurrentPhoneNumber: req.body.PhoneNumber
        }, function(err, PhoneNumber) {
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
        expect(req.body).to.have.property('PhoneNumber').that.is.a('string');
        // Check for if a array of strings is present that contains the endpoints it should be notified about
        //expect(req.body).to.have.property('services');
        
    } catch (AssertionError) {
        return true;
    }

    return false;
}
