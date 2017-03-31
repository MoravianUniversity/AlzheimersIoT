from UploadAPI import *
from getOauthInfo import *
from answersQuestion import *
from flask import Flask, render_template
from flask_ask import session

currentQuestionList = questionList
currentAnswerList = answerList
answerTag = ""

counterDictionary = {'roundCounter': 0, 'winCounter': 0}

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
    authToken = "fake token"
    UploadAPI(user, win, authToken)
    message = "The game is over. You answered "\
           + str(counterDictionary.get('roundCounter')) \
           + "out of "+ str(counterDictionary.get('winCounter'))\
           + "questions correct. "
    return message


def nextQuestion():
        round = counterDictionary.get("roundCounter")
        if round >= len(questionList):
            return "no further questions"
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