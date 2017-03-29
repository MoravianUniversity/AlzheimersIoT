# Base image
FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y build-essential libssl-dev libffi-dev python-dev
RUN apt-get install -y python3-pip python3.5

# Get flask-ask
RUN pip3 install --upgrade pip
RUN pip3 install flask
RUN pip3 install flask_mail
RUN pip3 install requests
COPY . /usr/src/EmailSender
EXPOSE  6000
CMD ["python3", "/usr/src/EmailSender/main.py"]