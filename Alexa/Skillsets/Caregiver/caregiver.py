import logging

from flask import Flask, render_template

from flask_ask import Ask, statement, question, session


app = Flask(__name__)

ask = Ask(app, "/")

logging.getLogger("flask_ask").setLevel(logging.DEBUG)


@ask.launch

def start_caregiver():

    start_msg = 'welcome to caregiver'

    return statement(start_msg)


@ask.intent("GetMedicineIntent")

def medicine(patient):

	speech_text = patient + 'took medicine at 7 15 AM'

	return statement(speech_text)

	
@ask.intent("GetWakeTimeIntent")

def wakeTime(patient):

	speech_text2 = patient + 'woke up at 7 AM'
	
	return statement(speech_text2)


if __name__ == '__main__':

    app.run(debug=True)
