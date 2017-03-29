from twilio.rest import TwilioRestClient
from flask import Flask, request

app = Flask(__name__)

ACCOUNT_SID = "AC9edd68eff12cd59f007b719007effc31"
AUTH_TOKEN = "eea3ef3bf4d3cd9da5e00dcb7a9ca1f2"

client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN)


@app.route("/sms", methods=['POST'])
def sms():
    client.messages.create(
        to=request.form["recipient"],
        from_="+14845440113",
        body=request.form["message"],
        # media_url="https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    )
    return "Text Sent"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
