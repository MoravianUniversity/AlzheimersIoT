from twilio.rest import TwilioRestClient
from flask import Flask, request

app = Flask(__name__)

# Twilio Credentials
ACCOUNT_SID = "FIXME"  # These two lines were changed to this value after Twilio
AUTH_TOKEN = "FIXME"   # notified us the token was compromised.  A new one was generated
# But this should be changed to load the values securely.

# Create REST Client
client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN)


# Do not change "from_" field. This is the Twilio account number (484) 895-1386
@app.route("/sms", methods=['POST'])
def sms():
    client.messages.create(
        to=request.form["recipient"],
        from_="+14848951386",
        body=request.form["message"],
        # media_url="https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    )
    return "Message Sent"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
