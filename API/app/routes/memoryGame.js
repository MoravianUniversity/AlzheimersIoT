// app/routes/memoryGame.js

var express = require('express');
var router = express.Router();
// var stormpath = require('express-stormpath');

// chai.js for linting
var expect = require('chai').expect;

// Get an instance of our model
var MemoryGame = require('../models/memoryGame.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /memoryGame
// ----------------------------------------------------
router.route('/')

    // create a memoryGame entry (accessed at POST http://localhost:8080/api/memoryGame)
    .post(function(req, res) {
        if (postParametersAreMissingOrInvalid(req))
            res.status(400).json({error: 'There are missing or invalid parameters in the request.'});

        var memoryGame = new MemoryGame();      // create a new instance of the MemoryGame model
        memoryGame.user = req.body.user;
        memoryGame.score = req.body.score;
        memoryGame.time = Date.parse(req.body.time);


        // save the memoryGame entry and check for errors
        memoryGame.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'MemoryGame entry created!' });
        });
    })

    // get all the memoryGame (accessed at GET http://localhost:8080/api/memoryGame)
    .get(function(req, res) {
        MemoryGame.find().sort({'_id': -1}).exec(function(err, memoryGames) {
            if (err)
                res.send(err);

            res.json(memoryGames);
        });
    });

// on routes that end in /memoryGame/:memoryGame_id
// ----------------------------------------------------
router.route('/:memoryGame_id')

    // get the memoryGame with that id (accessed at GET http://localhost:8080/api/memoryGame/:memoryGame_id)
    .get(function(req, res) {
        MemoryGame.findById(req.params.memoryGame_id, function(err, memoryGame) {
            if (err)
                res.send(err);
            res.json(memoryGame);
        });
    })

    // delete the memoryGame with this id (accessed at DELETE http://localhost:8080/api/memoryGame/:memoryGame_id)
    .delete(function(req, res) {
        MemoryGame.remove({
            _id: req.params.memoryGame_id
        }, function(err, memoryGame) {
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

        expect(req.body).to.have.property('score');
        // Check that the score param can parse into a number correctly
        expect(isNaN(req.body.score)).to.be.false;

        expect(req.body).to.have.property('time').that.is.a('string');
        // Check that the time param can be parsed into a Date object correctly
        expect(Date.parse(req.body.time)).to.not.be.NaN;

    } catch (AssertionError) {
        return true;
    }

    return false;
}


