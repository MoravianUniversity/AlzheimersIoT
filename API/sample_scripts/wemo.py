# tests/wemo.py

import requests
import time

def print_response(r):
  print "Request Url: ", r.url
  print "Response Status: ", r.status_code
  print "Response JSON: ", r.json()

def delete_all():
  entries = requests.get(wemo_url)

  for res in entries.json():
    dr = requests.delete(wemo_url + '/' + res['_id'])
    print_response(dr)

base_url = 'http://localhost:8080/api'
wemo_url = base_url + '/wemo'


r = requests.get(base_url)
print_response(r)

payload = {'status': 'true', 'time': str(time.time()), 'date': 'test_date'}
r = requests.post(wemo_url, data=payload)
print_response(r)


r = requests.get(wemo_url)
for res in r.json():
  print res

# Uncomment the following function call to delete all entries
#delete_all()