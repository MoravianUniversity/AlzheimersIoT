import requests
import datetime
import random

def print_response(r):
  print "Request Url: ", r.url
  print "Response Status: ", r.status_code
  print "Response JSON: ", r.json()

def random_double():
  return str(random.uniform(-100, 100))

# URLs to use
base_url = 'http://localhost:8080'
api_url = base_url + '/api'
token_url = base_url + '/oauth/token'
gps_url = api_url + '/gps'

# Get the generic message from the /api endpoint
# This request requires no authentication
r = requests.get(api_url)
print_response(r)


# Retrieve an OAUTH Token from http://localhost:8080/oauth/token
body_payload = {
            'grant_type': 'password',
            'username': '',
            'password': ''
          }
r = requests.post(token_url, data=body_payload)
access_token = r.json()['access_token']

# Make the header for subsequent requests
authorization_string = "Bearer " + access_token
header = {'Authorization' : authorization_string}


# Make a POST request (creating a new entry) on http://localhost:8080/api/gps
body_payload = {
            'time': str(datetime.datetime.utcnow().isoformat()),
            'lat': random_double(),
            'lon': random_double(),
            'address': 'Test Address'
          }

r = requests.post(gps_url, data=body_payload, headers=header)
print_response(r)

# Make a GET request on http://localhost:8080/api/gps
r = requests.get(gps_url, headers=header)
for res in r.json():
  print res