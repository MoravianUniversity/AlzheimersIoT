import json
import os

from flask import Flask
from flask import request
from flask import make_response
import requests
import datetime

# Flask app should start in global layout
app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():

    req = request.get_json(silent=True, force=True)

    print("Request:")
    print(json.dumps(req, indent=4))

    res = processRequest(req)

    res = json.dumps(res, indent=4)
    r = make_response(res)
    r.headers['Content-Type'] = 'application/json'
    return r

def processRequest(req):
    write_to_activities_file(req)
    postToAPI()
    res = makeWebhookResult("test")
    return res

def postToAPI():
    file = open('entries.txt', 'r')
    file_text = file.read()
    activities = file_text.split(',')

    #activities_string = "\"" + str(activities) + "\""

    url = "http://localhost:8080/api/journal"
    r = requests.post(url, data = {'datetime':str(datetime.datetime.utcnow().isoformat()), 'message':'This is a test journal entry', 'activities':activities, 'medication':'False'})



def write_to_activities_file(req):
    physical_exercise = req["result"]["parameters"]["physical-exercise"]
    public_activites = req["result"]["parameters"]["public-activities"]
    home_activities = req["result"]["parameters"]["home-activities"]
    medical_activities = req["result"]["parameters"]["medical-activities"]

    activities = []

    for physical in physical_exercise:
        activities.append(physical)
    for public in public_activites:
        activities.append(public)
    for home in home_activities:
        activities.append(home)
    if medical_activities != "":
        activities.append(medical_activities)

    file = open('entries.txt', 'w')
    file.write(','.join(activities))
    file.close()

def makeWebhookResult(speech):
    return {
        "speech": speech,
        "displayText": speech,
        "data": {},
        # "contextOut": [],
        "source": "apiai-journal"
    }

if __name__ == '__main__':

    port = int(os.getenv('PORT', 80))

    print("Starting app on port %d" % port)

    app.run(debug=False, port=port, host='0.0.0.0')