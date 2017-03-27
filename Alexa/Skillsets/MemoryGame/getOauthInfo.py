import requests
def getAuthentication():
    base_url = 'http://pegasus.cs.moravian.edu:8080/oauth/token'
    body_payload = {
            'grant_type': 'password',
            'username': 'memory_game@AlzheimersIoT.com',
            'password': 'JleJsn3FWHeTulCHPYbtBaF8zIdHVQRc'
            }
    response = requests.post(base_url, data=body_payload)
    access_token = response.json()['access_token']
    return access_token