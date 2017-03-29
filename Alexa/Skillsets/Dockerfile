# Base image
FROM ubuntu:latest

# dependencies need to run
RUN apt-get update -y
RUN apt-get install -y build-essential libssl-dev libffi-dev python-dev
RUN apt-get install -y python3-pip python3.5

# update the pip3 
RUN pip3 install --upgrade pip

# add flask-ask
RUN pip3 install flask-ask

# add any additional dependencies use (pip3 install)

#copy source code into your image the "." indicates copy all files
# the file path tells it where to store it in the image
COPY . /usr/src/Name_of_Skill

#the port the image needs to expose
EXPOSE  5000

#the command to execute your flask-ask skill
CMD ["python3", "/path_to_main.py_in_image"]