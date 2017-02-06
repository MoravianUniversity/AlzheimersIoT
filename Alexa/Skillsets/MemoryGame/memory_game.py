import logging
from random import randint
from flask import Flask, render_template
from flask_ask import Ask, statement, question, session

app = Flask(__name__)
ask = Ask(app, "/")
logging.getLogger("flask_ask").setLevel(logging.DEBUG)
round_counter = 0
win_counter = 0


@ask.launch
def new_game():
    global round_counter
    global win_counter
    round_counter = 0
    win_counter = 0
    welcome_msg = render_template('welcome')
    return question(welcome_msg)


@ask.intent("NoIntent")
def quit_game():
    return statement("You answered " + str(win_counter) + "out of " + str(round_counter) + "questions correct. ")


@ask.intent("YesIntent")
def first_round():

    numbers = [randint(0, 9) for _ in range(3)]
    round_msg = render_template('round', numbers=numbers)
    session.attributes['numbers'] = numbers[::-1]  # reverse
    return question(round_msg)


@ask.intent("AnswerIntent", convert={'first': int, 'second': int, 'third': int})
def first_answer(first, second, third):

    global round_counter
    global win_counter

    winning_numbers = session.attributes['numbers']
    if [first, second, third] == winning_numbers:
        round_counter += 1
        win_counter += 1
        msg = render_template('win')
    else:
        round_counter += 1
        msg = render_template('lose')
    return question(msg)

# Loop until intent is "no".


@ask.intent("YesIntent")
def second_round():

    numbers1 = [randint(0, 9) for _ in range(3)]
    round_msg1 = render_template('round', numbers=numbers1)
    session.attributes['numbers'] = numbers1[::-1]  # reverse
    return question(round_msg1)


@ask.intent("AnswerIntentt", convert={'first': int, 'second': int, 'third': int})
def second_answer(first, second, third):

    winning_numbers = session.attributes['numbers']
    if [first, second, third] == winning_numbers:
        msg = render_template('win')
    else:
        msg = render_template('lose')
    return statement(msg)

if __name__ == '__main__':
    app.run(debug=True)
