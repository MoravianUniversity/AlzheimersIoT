# tests/bears.py

import requests
import time

def print_response(r):
  print "Request Url: ", r.url
  print "Response Status: ", r.status_code
  print "Response JSON: ", r.json()

def delete_all_bears(token_header):
  bears = requests.get(base_url + '/bears', headers=token_header)

  for res in bears.json():
    dr = requests.delete(base_url + '/bears/' + res['_id'], headers=token_header)
    print_response(dr)

host_portion = 'http://localhost:8080'
base_url = host_portion + '/api'


r = requests.get(base_url)
print_response(r)


# Getting an oauth token
payload = {'grant_type' : 'password', 'username' : 'test@example.com', 'password' : 'TestTest1'}
r = requests.post(host_portion + '/oauth/token', data=payload)
#print_response(r)
res_json = r.json();
access_token = res_json['access_token']
token_header = {'Authorization' : 'Bearer ' + access_token}

#
payload = {'name': str(time.time())}
r = requests.post(base_url + '/bears', headers=token_header, data=payload)
print_response(r)

r = requests.get(base_url + '/bears', headers=token_header)
print_response(r)

# Uncomment the following function call to delete all bears
delete_all_bears(token_header)