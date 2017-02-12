// app/routes/memoryGame.js

var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

// Get an instance of our model
var MemoryGame = require('../models/memoryGame.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /memoryGame
// ----------------------------------------------------
router.route('/')

    // create a memoryGame entry (accessed at POST http://localhost:8080/api/memoryGame)
    .post(stormpath.apiAuthenticationRequired, function(req, res) {

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
    .get(stormpath.apiAuthenticationRequired, function(req, res) {
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
    .get(stormpath.apiAuthenticationRequired, function(req, res) {
        MemoryGame.findById(req.params.memoryGame_id, function(err, memoryGame) {
            if (err)
                res.send(err);
            res.json(memoryGame);
        });
    })

    // delete the memoryGame with this id (accessed at DELETE http://localhost:8080/api/memoryGame/:memoryGame_id)
    .delete(stormpath.apiAuthenticationRequired, function(req, res) {
        MemoryGame.remove({
            _id: req.params.memoryGame_id
        }, function(err, memoryGame) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;