Alzheimer's IoT Unified Docker Setup Guide:
================
## Setting Up and Running the Docker Containers
### Installing Docker
The Alzheimer's IoT project leverages Docker to be easily portable and run (essentially) anywhere. Follow the documentation on Docker's website to install Docker on the desired machine: [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/)

### Initial Container Build and Database Setup
To build the base containers and get the project running you will first need to clone the AlzheimersIoT repository onto the destination machine:

```
git clone https://github.com/MoravianCollege/AlzheimersIoT.git
```

Now, you can start building the initial containers and ultimately start all of the containers by running:

```
docker-compose up --build
```

This process will likely take a few minutes because this initial run has to pull a lot of base container images from the internet. Subsequent execution times, however, will be a lot quicker.

In it's initial state, the central API does not have the correct database and users, and you will likely see numerous errors from the API container, and any other containers that rely on the API. Fret not, this is expected and easily resolved by running the initialization script. Open up a new terminal window and run:

```
# Note: Execute this in a new terminal window! 

cd API/
bash initialize_database_unified.sh
```

Go back to the terminal window that's running the `docker-compose` command and halt the process by pressing `Crtl` + `C`.

Now, you can restart the API as a background process by running:

```
docker-compose up
```

### Starting and Stopping the Containers
Note: All of these commands *must* be run from the `AlzheimersIoT` directory!

##### To Check the state of the containers:

```
docker-compose ps
```

##### To Start the containers as a background process:

```
docker-compose up -d
```

##### To Stop the containers:

```
docker-compose down
```

##### To Rebuild the containers (if source code has changed)

```
# Assuming that the containers are not running in the background

docker-compose up --build
```

## Starting the Private Ngrok Instances
### Installing Ngrok
The Alzheimer's IoT project leverages Ngrok to expose parts of the project to the internet; e.g., to allow the GPS app to push data to the API while out and about. Follow the documentation on Ngrok's website to install Ngrok on the desired machine: [https://ngrok.com/download](https://ngrok.com/download)

### Download the configuration file
A premade configuration file for all of the necessary ngrok tunnels exists on trello. Download the file here: [https://trello.com/c/112xuaDx/77-paid-ngrok-account](https://trello.com/c/112xuaDx/77-paid-ngrok-account)

### Running Ngrok
To run ngrok, simply run:

```
/path/to/ngrok start -config /path/to/ngrok.yml --all
```

To run ngrok in the background via `screen`, run:

```
screen -S ngrok -dm /path/to/ngrok start -config /path/to/ngrok.yml --all
```

And then, if you need to reattach to the screen session run:

```
screen -r
```


