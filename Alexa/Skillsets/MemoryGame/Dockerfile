# Base python image
FROM python:3

# Get flask-ask
RUN pip3 install flask-ask requests

COPY . /usr/src/MemoryGame

CMD ["python3", "/usr/src/MemoryGame/main.py"]