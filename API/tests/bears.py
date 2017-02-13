# tests/bears.py

import requests
import time

def print_response(r):
  print "Request Url: ", r.url
  print "Response Status: ", r.status_code
  print "Response JSON: ", r.json()

def delete_all_bears():
  bears = requests.get(base_url + '/bears')

  for res in bears.json():
    dr = requests.delete(base_url + '/bears/' + res['_id'])
    print_response(dr)

base_url = 'http://localhost:8080/api'

r = requests.get(base_url)
print_response(r)

payload = {'name': str(time.time())}
r = requests.post(base_url + '/bears', data=payload)
print_response(r)


r = requests.get(base_url + '/bears')
print_response(r)

# Uncomment the following function call to delete all bears
#delete_all_bears()