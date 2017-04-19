import os

from flask import Flask, request
from flask_mail import Mail, Message

app =Flask(__name__)
mail=Mail(app)

USERNAME = 'mocojanetjohnson@gmail.com'
PASSWORD = 'moraviancs2017'

app.config.update(
MAIL_SERVER = 'smtp.gmail.com',
MAIL_PORT = 465,
MAIL_USE_SSL = True,
# MAIL_USE_TSL = True,
MAIL_USERNAME = USERNAME,
MAIL_PASSWORD = PASSWORD,
MAIL_FAIL_SILENTLY=False,
DEBUG = True)


mail=Mail(app)

@app.route("/email",methods=['POST'])
def index():
    body = request.form["message"]
    reciever = request.form["recipient"]
    msg = Message("Alzheimer's IOT Update",
                  sender=USERNAME,
                  recipients=[reciever])
    msg.body = body
    mail.send(msg)
    return "Sent"

if __name__ == "__main__":
    app.run(host='0.0.0.0',port = 5000)