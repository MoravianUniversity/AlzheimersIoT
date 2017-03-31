import logging
import datetime
from sendAlert import *
from gameProcessLogic import *
from flask import Flask, render_template
from flask_ask import Ask, statement, question, session

app = Flask(__name__)
ask = Ask(app, "/")
logging.getLogger("flask_ask").setLevel(logging.DEBUG)


def processState(userAnswer):
    global answerTag
    round = counterDictionary.get("roundCounter")
    if round >= len(questionList):
        message = quitQuiz()
        return message, 1
    if userAnswer == 'yes':
        print(userAnswer)
        message = yesResponse()
        return message, 0
    if userAnswer == 'no':
        message = quitQuiz()
        return message, 1
    if userAnswer == 'pass':
        message = passResponse()
        return message, 0
    else:
        message = answerResponse(userAnswer)
        return message, 0

@ask.launch
def new_game():
    counterDictionary['winCounter'] = 0
    counterDictionary['roundCounter'] = 0
    welcome_msg = render_template('welcome')
    return question(welcome_msg)


@ask.intent("AnswerIntent", convert={'Answer': str})
def mainIntent(Answer):
    userAnswer = Answer
    newMessage, end = processState(userAnswer)
    if end == 0:
        return question(newMessage)
    else:
        return statement(newMessage)

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)