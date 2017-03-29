API Documentation:
================
## Setting Up and Running the API
### Installing Docker
The API leverages Docker to be easily portable and run (essentially) anywhere. Follow the documentation on Docker's website to install Docker on the desired machine: [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/).

### Initial Container Build and Database Setup
To build the base containers and get the API running the first time around, first clone the AlzheimersIoT repository onto the destination machine:

```
git clone https://github.com/MoravianCollege/AlzheimersIoT.git
```

You will also need to download the `stomrpath.env` file from the [OAUTH Trello Board Ticket](https://trello.com/c/KOVVyVgw/27-oauth-authentication-for-rest-api) and place it in the `API` directory.

Now, you can start building the initial containers and ultimately start the API by navigating into the `API` directory and running the command:

```
docker-compose up --build
```

This process will likely take a few minutes because this initial run has to pull a lot of container images from the internet, however, subsequent execution times will be a lot quicker. Please note that the end of this initial execution of the API will report authentication errors in the MongoDB log, this is expected as we need to initialize the MongoDB for the Node.js app to access it first.

Once the logs for MongoDB are appearing, open up a new terminal window and execute this script to initialize the MongoDB for the Node API:

```
bash initialize_database.sh
```

Go back to the terminal window that's running the `docker-compose` command and halt the process by pressing `Crtl` + `C`.

Now, you can restart the API as a background process by running:

```
docker-compose up -d
```


Finally, make a `curl` request to check that the api is working. Your terminal output should look something like this:

```
[user:API]$curl localhost:8080/api
{"message":"hooray! welcome to our api!"}
```

### Starting and Stopping the API
Note: All of these commands *must* be run from the `API` directory!

##### To Check the state of the API:

```
docker-compose ps
```

##### To Start the API as a background process:

```
docker-compose up -d
```

##### To Stop the API:

```
docker-compose stop
```

## Creating a new API endpoint
### Create the Model and Schema:
To create a new API endpoint, we first want to define a new schema for the model that we are going to use. To do so, copy one of the existing models like so:

```
# Assuming you're in the API directory
cp app/models/gps.js app/models/sample.js
```

Now, open your favorite text editor and edit the model to reflect the data you would like each entry to contain. To see a full list of supported data types as per mongoose's specification, follow this [link](http://mongoosejs.com/docs/schematypes.html). For example, our sample model could look like this:

```
...
var SampleSchema   = new Schema({
    datetime: Date,
    count: Number,
    name: String
});

module.exports = mongoose.model('Sample', SampleSchema);
```

### Create the Route:
Now we will need to create a new route file to actually allow us to POST and GET our model through the api. Like creating our model, it's best to copy an existing route and modify it to suit the new model.

```
# Assuming you're in the API directory
cp app/routes/gps.js app/routes/sample.js
```

The first thing you will need to modify is the model used in the new route module, referencing the new model we made previously.

```
...
var Sample = require('../models/sample.js')
...
```

Now, we can dive into the individual POST and GET methods; make sure to correctly reference our new model throughout. For example, we would edit the POST section to reflect our Sample model like so:

```
...
router.route('*')

    // create a sample entry (accessed at POST http://localhost:8080/api/sample)
    .post(function(req, res) {

        var sample = new Sample();      // create a new instance of the Sample model
        sample.datetime = Date.parse(req.body.time);
        sample.count = req.body.count;
        sample. = req.body.name;

        // save the sample entry and check for errors
        gps.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Sample entry created!' });
        });
    })
...

```

Make sure to do this for all of the methods and to update the inline documentation accordingly.


### Add the Route to `server.js`:
The only thing left to do in terms of coding is to have the app use our newly created route. Open up `server.js` and navigate to this portion of the code:

```
...
// REGISTER OUR ROUTES -------------------------------
// all of our routes should be prefixed with /api
app.use('/api', router);
app.use('/api/bears', require('./app/routes/bears.js'))
...
```
Add a new line underneath the last `app.use(...` statement that references the route you made, like so:

```
...
// REGISTER OUR ROUTES -------------------------------
// all of our routes should be prefixed with /api
app.use('/api', router);
app.use('/api/bears', require('./app/routes/bears.js'))
app.use('/api/wemo', require('./app/routes/wemo.js'))
app.use('/api/gps', require('./app/routes/gps.js'))
app.use('/api/sample', require('./app/routes/sample.js'))

...
```

### Final Steps:
After you've done all of the previous steps, simply rebuild the docker containers relaunch the app like so:

```
# Assuming you're in the API directory
# If the API is running in the background
docker-compose down

# Rebuild and launch the docker containers
docker-compose up --build
```

