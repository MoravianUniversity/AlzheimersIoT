// app/routes/journal.js

var express = require('express');
var router = express.Router();
// chai.js for linting
var expect = require('chai').expect;
var assert = require('chai').assert;
// Get an instance of our model
var Journal = require('../models/journal.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /journal
// ----------------------------------------------------
router.route('/')

    // create a journal entry (accessed at POST http://localhost:8080/api/journal)
    .post(function(req, res) {
	//if (postParametersAreMissingOrInvalid(req)) {
    //        res.status(400).json({error: 'There are missing or invalid parameters in the request.'});
    //        return;
    //    }

        var journal = new Journal();      // create a new instance of the Journal model
        journal.datetime = Date.parse(req.body.datetime);
        journal.message = req.body.message;
        journal.activities = req.body.activities;
        journal.medication = req.body.medication;

        // save the journal entry and check for errors
        journal.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Journal entry created!' });
        });
    })

    // get all the journals (accessed at GET http://localhost:8080/api/journal)
    .get(function(req, res) {
        Journal.find().sort({'_id': -1}).exec(function(err, journals) {
            if (err)
                res.send(err);

            res.json(journals);
        });
    });

// on routes that end in /journal/:journal_id
// ----------------------------------------------------
router.route('/:journal_id')

    // get the journal with that id (accessed at GET http://localhost:8080/api/journal/:journal_id)
    .get(function(req, res) {
        Journal.findById(req.params.journal_id, function(err, journal) {
            if (err)
                res.send(err);
            res.json(journal);
        });
    })

    // delete the journal with this id (accessed at DELETE http://localhost:8080/api/journal/:journal_id)
    .delete(function(req, res) {
        Journal.remove({
            _id: req.params.journal_id
        }, function(err, journal) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;

function postParametersAreMissingOrInvalid(req) {
    try {
        // Check for missing and invalid parameters
        expect(req.body).to.have.property('datetime').that.is.a('string');
        // Check that the date param can be parsed into a Date object correctly
        expect(Date.parse(req.body.datetime)).to.not.be.NaN;

        expect(req.body).to.have.property('message').that.is.a('string');

        expect(req.body).to.have.property('Activities');
        expect(req.body.Activities).to.be.an('array');
        // Check that every element in activities array is a String
        var activitiesLength = req.body.Activities.length;
        for(var i = 0; i < activitiesLength; i++){
            expect(req.body.Activities[i]).to.be.a('string');
        }

        expect(req.body).to.have.property('medication');
        assert.isBoolean(req.body.medication);
    } catch (AssertionError) {
        return true;
    }

    return false;
}

