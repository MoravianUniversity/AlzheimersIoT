# tests/gps.py

import requests
import datetime
import random

def print_response(r):
  print "Request Url: ", r.url
  print "Response Status: ", r.status_code
  print "Response JSON: ", r.json()

def delete_all():
  entries = requests.get(gps_url)

  for res in entries.json():
    dr = requests.delete(gps_url + '/' + res['_id'])
    print_response(dr)

def random_double():
  return str(random.uniform(-100, 100))

base_url = 'http://localhost:8080/api'
gps_url = base_url + '/gps'


r = requests.get(base_url)
print_response(r)

payload = {'time': str(datetime.datetime.utcnow().isoformat()),
              'lat': random_double(), 'lon': random_double(),
              'address': 'Test Address', 'deviceID': '8037hja62gj'}
r = requests.post(gps_url, data=payload)
print_response(r)


r = requests.get(gps_url)
for res in r.json():
  print res

# Uncomment the following function call to delete all entries
#delete_all()