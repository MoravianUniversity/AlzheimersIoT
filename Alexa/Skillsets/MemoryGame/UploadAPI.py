import requests
base_url = 'http://pegasus.cs.moravian.edu:8080/api/memoryGame'
def UploadAPI(User, score, date):
    payload = {'user': User,'score': score, 'time': date}
    sendUserResults = requests.post(base_url, data=payload)
    print(sendUserResults)