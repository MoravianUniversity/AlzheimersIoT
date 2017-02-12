// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); // call express
var stormpath  = require('express-stormpath');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up the mongodb connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:password@db:27017/node');

// Set the port for the app
var port = process.env.PORT || 8080;   // set our port


//Set path to stormpath config
app.use(stormpath.init(app, {
  expand: {
    customData: true,
  },
  web: {
    produces: ['application/json']
  }
}))

// TEST ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for requests defined in server.js
middlewareCtrl = require('./app/routes/middleware.js')
router.use(middlewareCtrl.customMiddleware)

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes should be prefixed with /api
app.use('/api', router);
app.use('/api/bears', require('./app/routes/bears.js'));
app.use('/api/wemo', require('./app/routes/wemo.js'))
app.use('/api/gps', require('./app/routes/gps.js'))
app.use('/api/memoryGame', require('./app/routes/memoryGame.js'))


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);