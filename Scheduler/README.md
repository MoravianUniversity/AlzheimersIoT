Scheduler Documentation:
================
## Setting Up and Running the Scheduler
### Installing Docker
The Scheduler leverages Docker to be easily portable and run (essentially) anywhere. Follow the documentation on Docker's website to install Docker on the desired machine: [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/).

### Initial Container Build and Database Setup
To build the base containers and get the Scheduler running the first time around, first clone the AlzheimersIoT repository onto the destination machine:

```
git clone https://github.com/MoravianCollege/AlzheimersIoT.git
```

Now, you can start building the initial containers and ultimately start the Scheduler by navigating into the `Scheduler` directory and running the command:

```
docker-compose up -d --build
```

This process will likely take a few minutes because this initial run has to pull a lot of container images from the internet, however, subsequent execution times will be a lot quicker.


### Starting and Stopping the Scheduler
Note: All of these commands *must* be run from the `Scheduler` directory!

##### To Check the state of the Scheduler:

```
docker-compose ps
```

##### To Start the Scheduler as a background process:

```
docker-compose up -d
```

##### To Stop the Scheduler:

```
docker-compose stop
```


## Adding a Scheduled Message
To add a scheduled message, you simply need to send a post request to the bound address and port. In its current implementation, if you are running the Scheduler on its own, you should be able to send requests to:

```
http://localhost:5000/api/scheduler
```

Each post request should contain parameters for a medium (SMS, Google Talk, or Email), dest (email address or a phone number), msg, and time. For example:

```
payload = {
  'medium': 'SMS',
  'dest': '6104545567',
  'time': '2017-09-01 14:00:00 -0400',
  'msg': 'Example SMS Message'
}
```

### Parameters
Mediums must exactly match one of the following strings:

```
SMS
Email
Google Home
```

Destinations conform to the following format:

```
Email: example@domain.com
Phone Number: 1234567890
```

Times conform to the following format. Please note that the spaces, characters, and inclusion of the numberical offset from UTC time is required!

```
time: YYYY-MM-DD HH:MM:SS +0000

January 31st, 2017, at 15:35:30 EST: "2017-01-31 15:35:30 -0400"
```

Messages are simply just strings that will be sent to whatever medium is chosen.

### Example Usage
The following examples use the `Requests` library in Python to schedule various messages.

#### Scheduling an SMS message
This example sends a message, `Example SMS Message`, to the phone number `(610) 454-5567` on September 1st, 2017, at 2pm, EST.

```
import requests

scheduler_url = 'http://localhost:5000/api/scheduler'

payload = {
  'medium': 'SMS',
  'dest': '6104545567',
  'time': '2017-09-01 14:00:00 -0400',
  'msg': 'Example SMS Message'
}

r = requests.post(scheduler_url, data=payload)
```

#### Scheduling an Email
This example sends a message, `Example Email Message`, to the email `example@domain.com` on December 31st, 2020, at 11pm, EST.

```
import requests

scheduler_url = 'http://localhost:5000/api/scheduler'

payload = {
  'medium': 'Email',
  'dest': 'example@domain.com',
  'time': '2020-12-31 23:00:00 -0400',
  'msg': 'Example Email Message'
}

r = requests.post(scheduler_url, data=payload)
```

#### Scheduling a Google Home TTS
This example has the Google Home speak the message `Example Google Home Message` on November 22nd, 2017, at 4pm, EST. 

Notice, the destination is still required, but can be left as an empty string.

```
import requests

scheduler_url = 'http://localhost:5000/api/scheduler'

payload = {
  'medium': 'Google Talk',
  'dest': '',
  'time': '2017-11-22 16:00:00 -0400',
  'msg': 'Example Google Home Message'
}

r = requests.post(scheduler_url, data=payload)
```