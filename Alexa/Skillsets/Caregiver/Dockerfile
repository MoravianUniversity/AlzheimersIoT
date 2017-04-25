FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python build-essential libssl-dev libffi-dev python-dev
RUN apt-get install -y python-pip python-distribute

RUN pip install --upgrade pip
RUN pip install flask-ask
RUN pip install requests

COPY . /usr/src/Caregiver

EXPOSE 80

CMD ["python", "/usr/src/Caregiver/caregiver.py"]
