import logging
import datetime
from UploadAPI import *
from sendAlert import *
from answersQuestion import *
from flask import Flask, render_template
from flask_ask import Ask, statement, question, session

app = Flask(__name__)
ask = Ask(app, "/")
logging.getLogger("flask_ask").setLevel(logging.DEBUG)
currentQuestionList = questionList
currentAnswerList = answerList
counterDictionary = {'roundCounter': 0, 'winCounter': 0}
answerTag = ""


def processState(userAnswer):
    global answerTag
    round = counterDictionary.get("roundCounter")
    if round > len(questionList):
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


def yesResponse():
    global answerTag
    answerTag = 'continue'
    message = nextQuestion()
    return message


def passResponse():
    global answerTag
    answerTag = ''
    message = passQuestion()
    return message


def answerResponse(userAnswer):
    global answerTag
    answerTag = ''
    message = checkAnswer(userAnswer)
    return message


def quitQuiz():
    user = "test_User_1"
    win = counterDictionary.get('winCounter')
    date = datetime.datetime.utcnow().isoformat()
    UploadAPI(user, win, date)
    message = "The game is over. You answered "\
           + str(counterDictionary.get('roundCounter')) \
           + "out of "+ str(counterDictionary.get('winCounter'))\
           + "questions correct. "
    return message


def nextQuestion():
        round = counterDictionary.get("roundCounter")
        next_question = currentQuestionList[round]
        return next_question


def passQuestion():
    session.attributes["previous_question"]=""
    counterDictionary['roundCounter'] += 1

    output_message = render_template('passMessage')
    return output_message


def lose():
    counterDictionary['roundCounter'] += 1
    continue_message = render_template('lose')
    return continue_message


def win():
    counterDictionary['winCounter'] += 1
    counterDictionary['roundCounter'] += 1
    continue_message = render_template('win')
    return continue_message


def checkAnswerContent(userAnswer, correctAnswer):
    if(userAnswer == correctAnswer):
        statusCode = 200
    else:
        statusCode = 400
    return statusCode


def checkAnswer(userAnswer):
    roundCount = counterDictionary.get("roundCounter")
    correctAnswer = currentAnswerList[roundCount]
    if len(userAnswer) < len(correctAnswer) or len(userAnswer) > len(correctAnswer):
        message = lose()
        return message
    else:
        answerStatus = checkAnswerContent(userAnswer, correctAnswer)
        if answerStatus == 200:
            message = win()
            return message
        if answerStatus == 400:
            message = lose()
            return message


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
    app.run(debug=True)