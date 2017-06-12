// app/routes/Email.js

var express = require('express');
var router = express.Router();
// var stormpath = require('express-stormpath');

// chai.js for linting
var expect = require('chai').expect;

// Get an instance of our model
var Email = require('../models/Email.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /Email
// ----------------------------------------------------
router.route('/')

    // create a Email entry (accessed at POST http://localhost:8080/api/Email)
    .post(function(req, res) {
        if (postParametersAreMissingOrInvalid(req))
            res.status(400).json({error: 'There are missing or invalid parameters in the request.'});

        var email = new Email();      // create a new instance of the Email model
        email.emailAddress = req.body.CurrentEmail;
        email.services = req.body.services.split(",");
        


        // save the Email entry and check for errors
        email.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Email entry created!' });
        });
    })

    // get all the Emails (accessed at GET http://localhost:8080/api/Email)
    .get(function(req, res) {
       Email.find().exec(function(err, Emails) {
            if (err)
                res.send(err);

            res.json(Emails);
        });
    });

// on routes that end in /Email/:services
// ----------------------------------------------------
router.route('/:services')

    // get the Email with the services tag (accessed at GET http://localhost:8080/api/Email/:services)
    .get(function(req, res) {
     Email.find({services: req.params.services},{emailAddress:1,_id:0}).exec(function(err, Emails) {
            if (err)
                res.send(err);
            res.json(Emails);
        });
    })


    // delete the Email with this id (accessed at DELETE http://localhost:8080/api/Email/:Email)
    .delete(function(req, res) {
        Email.remove({
            emailAddress: req.body.Email
        }, function(err, Email) {
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
        expect(req.body).to.have.property('CurrentEmail').that.is.a('string');
        // Check for if a array of strings is present that contains the endpoints it should be notified about
        //expect(req.body).to.have.property('services');
        
    } catch (AssertionError) {
        return true;
    }

    return false;
}
