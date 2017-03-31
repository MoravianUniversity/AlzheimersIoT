// app/routes/wemo.js

var express = require('express');
var router = express.Router();
// var stormpath = require('express-stormpath');

// Get an instance of our model
var Wemo = require('../models/wemo.js')

// Middleware
middlewareCtrl = require('./middleware.js')
router.use(middlewareCtrl.customMiddleware)

// on routes that end in /wemo
// ----------------------------------------------------
router.route('/')

    // create a wemo (accessed at POST http://localhost:8080/api/wemo)
    .post(function(req, res) {

        var wemo = new Wemo();      // create a new instance of the Wemo model
        wemo.date = req.body.date;  // set the wemo's name (comes from the request)
        wemo.time = req.body.time;
        wemo.status = req.body.status;

        // save the wemo entry and check for errors
        wemo.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Wemo entry created!' });
        });
    })

    // get all the wemo (accessed at GET http://localhost:8080/api/wemo)
    .get(function(req, res) {
        Wemo.find().sort({'_id': -1}).exec(function(err, wemos) {
            if (err)
                res.send(err);

            res.json(wemos);
        });
    });

// on routes that end in /wemo/:wemo_id
// ----------------------------------------------------
router.route('/:wemo_id')

    // get the wemo with that id (accessed at GET http://localhost:8080/api/wemo/:wemo_id)
    .get(function(req, res) {
        Wemo.findById(req.params.wemo_id, function(err, wemo) {
            if (err)
                res.send(err);
            res.json(wemo);
        });
    })

    // delete the wemo with this id (accessed at DELETE http://localhost:8080/api/wemo/:wemo_id)
    .delete(function(req, res) {
        Wemo.remove({
            _id: req.params.wemo_id
        }, function(err, wemo) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;