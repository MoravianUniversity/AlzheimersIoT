import requests
import datetime
def UploadAPI(User, score,token):
    base_url = 'http://api:8080/api/memoryGame'
    authorization_string = "Bearer " + token
    header = {'Authorization' : authorization_string}
    date = datetime.datetime.utcnow().isoformat()
    payload = {'user': User,'score': score, 'time': date}
    sendUserResults = requests.post(base_url, data=payload,headers=header)
    print(sendUserResults)