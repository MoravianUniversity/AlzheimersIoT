import requests

url = "http://localhost:5000/googleSend"
r = requests.post(url, data={'message': "This is the message"})
r.close()
