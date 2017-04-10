import requests

url = "http://pegasus.cs.moravian.edu:5000/googleSend"
r = requests.post(url, data={'message': "This is the message"})
r.close()
