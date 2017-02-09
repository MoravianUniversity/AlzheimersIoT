# tests/memoryGame.py

import requests
import datetime
import random

def print_response(r):
  print "Request Url: ", r.url
  print "Response Status: ", r.status_code
  print "Response JSON: ", r.json()

def delete_all():
  entries = requests.get(memoryGame_url)

  for res in entries.json():
    dr = requests.delete(memoryGame_url + '/' + res['_id'])
    print_response(dr)


base_url = 'http://localhost:8080/api'
memoryGame_url = base_url + '/memoryGame'

r = requests.get(base_url)
print_response(r)

payload = {'time': str(datetime.datetime.utcnow().isoformat()),
              'user' : 'tests/memoryGame.py', 'score' : str(random.randint(0,10))}
r = requests.post(memoryGame_url, data=payload)
print_response(r)


r = requests.get(memoryGame_url)
for res in r.json():
  print res

# Uncomment the following function call to delete all entries
delete_all()