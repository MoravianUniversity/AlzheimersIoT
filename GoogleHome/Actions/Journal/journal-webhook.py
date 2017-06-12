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

    request_json = request.get_json(silent=True, force=True)

    print("Request:")
    print(json.dumps(request_json, indent=4))

    response = processRequest(request_json)

    response = json.dumps(response, indent=4)
    r = make_response(response)
    r.headers['Content-Type'] = 'application/json'
    return r

def processRequest(request):
    intent = request["result"]["metadata"]["intentName"]
    print(intent)
    if intent == "Activity Intent":
        return activity_intent(request)
    if intent == "Medicine-no Intent":
        postToAPI(False)
        res = makeWebhookResult("Okay, thanks for sharing. Please remember to take them today. I'll talk to you tomorrow.")
        return res
    if intent == "Medicine-yes Intent":
        postToAPI(True)
        res = makeWebhookResult("Thanks for sharing! I'll talk to you tomorrow.")
        return res


def activity_intent(request):
    write_to_entries_file(request)
    data = getDataFromFile()
    activities = data[0]
    print(activities)
    taken_meds = takenMeds(activities)
    if not taken_meds:
        print("here")
        res = makeWebhookResult("Did you take your medicine today?")
        return res
    else:
        postToAPI(taken_meds)
        res = makeWebhookResult("Thanks for sharing! I'll talk to you tomorrow.")
        return res


def getDataFromFile():
    file = open('entries.txt', 'r')
    file_text = file.read()
    file_text = file_text.split('\n')
    activities_text = file_text[0]
    activities = activities_text.split(',')
    user_speech = file_text[1]
    return activities, user_speech

def takenMeds(activities):
    if "medicine" in activities:
        return True
    else:
        return False


def postToAPI(taken_meds):
    data = getDataFromFile()
    activities = data[0]
    user_speech = data[1]

    if taken_meds == True and "medicine" not in activities:
        activities.append("medicine")

    #url = "http://pegasus.cs.moravian.edu:8080/api/journal"
    #url = "http://localhost:8080/api/journal" #use for testing locally
    url = "http://api:8080/api/journal" #use for docker instances
    api_post = requests.post(url, data = {'datetime':str(datetime.datetime.utcnow().isoformat()), 'message':user_speech, 'activities':activities, 'medication':taken_meds})
    print(api_post.text)

def write_to_entries_file(request):
    user_speech = request["result"]["resolvedQuery"]

    physical_exercise = request["result"]["parameters"]["physical-exercise"]
    public_activites = request["result"]["parameters"]["public-activities"]
    home_activities = request["result"]["parameters"]["home-activities"]
    medical_activities = request["result"]["parameters"]["medical-activities"]

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
    file.write('\n')
    file.write(user_speech)
    file.close()

def makeWebhookResult(speech):
    return {
        "speech": speech,
        "displayText": speech,
        "data": {},
        "source": "apiai-journal"
    }

if __name__ == '__main__':

    port = int(os.getenv('PORT', 80))

    print("Starting app on port %d" % port)

    app.run(debug=False, port=port, host='0.0.0.0')