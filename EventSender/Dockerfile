FROM python:3

# Copy sourcefiles
COPY . /app
WORKDIR /app

# Install dependencies
RUN pip install -r requirements.txt

# Run the app
CMD [ "python", "./EventSender.py" ]