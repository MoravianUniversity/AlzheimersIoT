import logging
from flask import Flask, render_template
from flask_ask import Ask, statement, question, session
import requests
import time

app = Flask(__name__)
ask = Ask(app, "/")
noEndpointMsg = 'no endpoint exists'
logging.getLogger("flask_ask").setLevel(logging.DEBUG)
local_url = 'http://localhost:8080/api'
pegasus_ngrok_url = 'http://20d0fc48.ngrok.io/api'
pegasus_url = 'pegasus.cs.moravian.edu/api'
unified_docker = 'http://api:8080/api'
url_to_use = unified_docker
questionMsg = 'Any other questions?'

def print_response(webPage):
    print("Request Url: ", webPage.url)
    print("Response Status: ", webPage.status_code)
    print("Response JSON: ", webPage.json())

@ask.launch
def start_caregiver():
  startMsg = 'Welcome to Caregiver.'
  return question(startMsg)

@ask.intent("GetMedicineIntent")
def medicineTime(patient):
  medicineMsg = patient
  medicineJournDictArray = getData('journal')
  if "medication" in medicineJournDictArray[0] and "date" in medicineJournDictArray[0]:
    if medicineJournDictArray[0].get("medication") == True:
      medicineMsg = "On " + medicineJournDictArray[0].get("datetime") + " " + medicineMsg + " recorded in their journal that they took their medicine today."
    else:
      medicineMsg = "On " + medicineJournDictArray[0].get("datetime") + " " + medicineMsg + " recorded in their journal that they did not take their medicine today."
  else:
    medicineMsg = "There is no record of the patient taking their medication today."
  return question(medicineMsg).reprompt(questionMsg)

# apostrophe s used in question -- "patient's" rather than "patient"
@ask.intent("GetJournalIntent")
def journal(patient):
  journalMsg = patient
  journalDictArray = getData('journal')
  # data available: medication(boolean), message(string), datetime(timestamp), activities(String[])
  if "medication" in journalDictArray[0] and "message" in journalDictArray[0] \
      and "datetime" in journalDictArray[0] and "activities" in journalDictArray[0]:
    activities = ""
    for x in journalDictArray[0].get("activities"):
        activities = activities + x + ", and "
        
    journalMsgLatterHalf = " Their message was: " + journalDictArray[0].get("message") + " and their listed activities were: " + activities.strip(", and ") + "."
    if journalDictArray[0].get("medication") == True:
      journalMsg = journalMsg + "'s most recent journal entry stated that they took their medicine today. " + journalMsgLatterHalf
    else:
      journalMsg = journalMsg + "'s most recent journal entry stated that they did not take their medicine today. " + journalMsgLatterHalf
  else:
    journalMsg = "There is insufficient data available in " + journalMsg + " most recent journal entry."
  return question(journalMsg).reprompt(questionMsg)
  

@ask.intent("GetWakeTimeIntent")
def wakeTime(patient):
  wakeTimeStatement = patient + 'woke up at 7 AM.'
  return question(wakeTimeStatement).reprompt(questionMsg)

@ask.intent("GetMemoryGameIntent")
def memGame(patient):
  memGameDictArray = getData('memoryGame')
  newMemGameData = memGameDictArray[0]
  # data available: user(string), score(number), time(timestamp(ISO 8601 date))
  if "time" in newMemGameData and "score" in newMemGameData:
    time = convertTimeStamp(newMemGameData.get("time"))
    score = newMemGameData.get("score")
  memGameMsg = patient + " played memory game on " + str(time) + " and received a score of " + str(score)
  return question(memGameMsg).reprompt(questionMsg)

@ask.intent("GetMemoryGameTimeIntent")
def memGameTime(patient):
  memGameTimeMsg = patient
  memGameTimeDictArray = getData('memoryGame')
  # data available: user(string), score(number), time(timestamp(ISO 8601 date))
  if "time" in memGameTimeDictArray[0]:
    time = convertTimeStamp(str(memGameTimeDictArray[0].get("time")))
    memGameTimeMsg = memGameTimeMsg + ' last took memory Quiz at: ' + time
  else:
    memGameTimeMsg = 'There is no recorded time for the last memory quiz taken by ' + patient
  return question(memGameTimeMsg).reprompt(questionMsg)

@ask.intent("GetMemoryGameScoreIntent")
def memGameScore(patient):
  memGameScoreMsg = patient
  memGameScoreDictArray = getData('memoryGame')
  # data available: user(string), score(number), time(timestamp(ISO 8601 date))
  if "score" in memGameScoreDictArray[0]:
    memGameScoreMsg = memGameScoreMsg + ' last score for the memory Quiz was: ' + str(memGameScoreDictArray[0].get("score"))
  else:
    memGameScoreMsg = 'There is no score for the last time ' + patient + ' took their memory quiz.'
  return question(memGameScoreMsg).reprompt(questionMsg)

@ask.intent("GetMemoryGameTimeAndScoreIntent")
def memGameTimeAndScore(patient):
  memGameFullMsg = patient
  memGameFullDictArray = getData('memoryGame')
  # data available: user(string), score(number), time(timestamp(ISO 8601 date))
  if "time" in memGameFullDictArray[0] and "score" in memGameFullDictArray[0]:
    memGameFullMsg = memGameFullMsg + ' last took memory Quiz at: ' + str(memGameFullDictArray[0].get("time")) + " and their score was " + str(memGameFullDictArray[0].get("score"))
  else:
    memGameFullMsg = 'There is a missing time or score for the last memory quiz taken by ' + patient
  return question(memGameFullMsg).reprompt(questionMsg)

@ask.intent("GetGPSIntent")
def gps(patient):
  gpsMsg = patient
  gpsDictArray = getData('gps')
  # data available: deviceID(string), time(timestamp(ISO 8601 date)), lat(number), lon(number) address(string)
  if "lat" in gpsDictArray[0] and "lon" in gpsDictArray[0] and "time" in gpsDictArray[0]:
    lat = str(gpsDictArray[0].get("lat"))
    lon = str(gpsDictArray[0].get("lon"))
    time = convertTimeStamp(str(gpsDictArray[0].get("time")))
    gpsMsg = patient + 's last logged location was latitude: ' + str(lat) + ' and longitude: ' + str(lon) + " on " + str(time)
  else:
    gpsMsg = 'latitude and longitude not available for ' + patient
  return question(gpsMsg).reprompt(questionMsg)

# apostrophe s used in question -- "patient's" rather than "patient"
@ask.intent("GetWemoIntent")
def wemo(patient):
  wemoMsg = patient
  wemoDictArray = getData('wemo')
  # data available: date(string), time(string), status(boolean) off
  # status: true = on, false = off
  if "status" in wemoDictArray[0] and "time" in wemoDictArray[0] and "date" in wemoDictArray[0]:
    if wemoDictArray[0].get("status") == True:
      wemoMsg = wemoMsg + " lights have been on since " + str(wemoDictArray[0].get("time")) + " on " + str(wemoDictArray[0].get("date"))
    else:
      wemoMsg = wemoMsg + " lights have been off since " + str(wemoDictArray[0].get("time")) + " on " + str(wemoDictArray[0].get("date"))
  return question(wemoMsg).reprompt(questionMsg)

@ask.intent("EndCaregiver")
def endCaregiver():
  endMsg = "Shutting down Caregiver, goodbye!"
  return statement(endMsg)

# returns array of Dictionary objects
def getData(endpoint_url):
  full_url = url_to_use + '/' + endpoint_url
  requestedAPIPage = requests.get(full_url)
  return requestedAPIPage.json()

def convertTimeStamp(timeStamp):
    # FORMAT EXAMPLE: 2017-03-30T19:28:38.136Z
    dateTimeArray = timeStamp.split("T")

    date = convertDate(dateTimeArray[0])
    time = convert24HRTime(dateTimeArray[1].split(".")[0][:-3])

    return (date + " " + time)

def convert24HRTime(time):
    hours = int(time[0:2])
    if hours >= 12:
        if hours != 12:
            hours = hours - 12
        ampm = " PM"
    else:
        if hours == 0:
            hours = 12
        ampm = " AM"
    return (str(hours) + time[2:] + ampm)

def convertDate(date):
    dateArray = date.split("-")
    year = dateArray[0]
    month = dateArray[1]
    day = dateArray[2]

    months = ["January", "February", "March", "April",
              "May", "June", "July", "August", "September",
              "October", "November", "December"]

    return months[int(month)-1] + " " + day + ", " + year

if __name__ == '__main__':
  app.run(debug=True,host="0.0.0.0",port=5000)
