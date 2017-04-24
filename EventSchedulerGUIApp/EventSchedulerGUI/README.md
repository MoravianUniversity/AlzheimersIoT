# EventSchedulerGUI Documentation

## Installing Meteor Framework onto your Machine
First simply got to meteor's website, https://www.meteor.com, and follow the install instructions

## Intialize Meteor
To setup and launch the GUI first run:
```
git clone https://github.com/MoravianCollege/AlzheimersIoT.git
```

On the device you wish to host the GUI on then run:
```
cd ~/AlzheimersIoT/EventSchedulerGUIApp/EventSchedulerGUI/
```

Once you are inside this folder simply run:
```
meteor npm install
```
This command is necessary because this App was built with an older version of meteor.
After that simply run the command:
```
meteor run
```
If everything was successful that the GUI should be up and running on
```
http://localhost:3000
```

## Why Meteor
Why was this framework chosen for the GUI? There are 2 main reasons which are hot reloading and easy setup.
First hot reloading means basically that the production version of the GUI never has to be shutdown even when your 
preforming a git pull instead the GUI will finish all active transaction and then it will reload itself. Therefore,
you never have a time where the GUI is down. Secondly, the Meteor framework for the most part is well documented, has 
a large amount of community support including packages and libraries, and is pretty beginner friendly.

## File Organization

### Client Side Folder
#### Templates
These are where your html code goes. Each html file be wrapped in
```
<template></template>
```
Treat each template as a separate web page and have each one in a separate file for best organization.
Where the Router run ts render command it will look into the Template folder to see if there exists a matching template
if one is not found it will throw a error.

#### Router
This folder contains the code that handles the routing logic for the GUI interface. When you create a new route
it will assign a template to what ever url endpoint you give it see the code for examples. It is important that
when you run meteor all the routes in the Routes folder have templates if not then the App will crash because it
cannot generate the correct routing table

#### Controllers
These files handle any logic that the html page might have. Currently the logic the controllers logic for is when the
see that the submit button is clicked on a specific form on a specific template it will take the form data wrap it 
into a object and pass it off to the server side code to handle. it does this by calling a specific method on the server 
side. Now you may be curious why the data is first going to the server side instead of just right to the API. Well this
method prevents someone from running inspect element and seeing the Javascript code. Effectively on a production version
of this product it would prevent someone from being able to get any information about the API or how the data is 
sanitized before being sent thus extra security for the whole system.

### Server Folder
This folder contains the different methods the controllers call. Right now all of the methods are simply API request
that take the data bundled by the controllers and ship them out to the different API endpoints. 

### Current Issues:
Currently the biggest issue that has been run into is getting this system to successfully build and run within a
docker environment.